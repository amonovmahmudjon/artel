import { Select, Button, Form } from "antd";
import { UserAddOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import AddClientModal from "../components/AddClientModal";
import { useEffect, useMemo, useState } from "react";
import CalculateModal from "../components/CalculateModal";
import { useFormik } from "formik";
import FinishModalSale from "../components/FinishModalSale";
import { notifySuccess, notifyWarning, numberSpacing } from "@/utils/utils";
import type { SaleTableData } from "@/interface/interface";
import * as yup from "yup";
import { useAppSelector } from "@/store/hooks";
import { useNavigate, useSearchParams } from "react-router";

interface ClientSelectListType {
  isPossibleBorrow: boolean;
  id: number;
  name: string;
}

interface FormikInitialValues {
  clientId: number | null;
  employeeId: number | null;
  organizationId: number;
  description: string;
  clientName: string;
  isBorrow: boolean;
  payments: {
    paymentSystemTypeId: number;
    amount: number;
    currencyId: number | null;
    name: string;
    bankId: number | null;
  }[];
  tables: {
    productTableId: number | null;
    soldPrice: number | null;
  }[];
}
interface SalePaymentProps {
  tableData: SaleTableData[];
}

function SalePayment({ tableData }: SalePaymentProps) {
  const organizationId = useAppSelector(
    (state) => state.organization.selectedOrgId,
  );
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [openCalculate, setOpenCalculate] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [paymentType, setPaymentType] = useState<1 | 2 | 3 | null>(null);
  // const[searchParams] = useSearchParams()
  // const organizationId = searchParams.get("organizationId")

  const exchangeRate = 12000;

  const { data: ClientSelectList, isLoading } = useQuery({
    queryKey: ["ClientSelectList", organizationId],
    queryFn: async () => {
      const { data } = await api.get("manual/clientselectlist", {
        params: {
          organizationId: organizationId,
        },
      });
      return data;
    },
    enabled: !!organizationId,
  });
  const validationSchema = yup.object().shape({
    clientId: yup.number().nullable().required("Iltimos, mijozni tanlang!"),

    tables: yup
      .array()
      .min(1, "Savatga kamida bitta mahsulot qo'shishingiz kerak!"),

    payments: yup.array().of(
      yup.object().shape({
        paymentSystemTypeId: yup.number().required(),
        amount: yup.number().required("Summa"),
      }),
    ),
    employeeId: yup.number().nullable().required("Menejerni tanlash majburiy!"),
  });

  const getItinialValues = useMemo(() => {
    const savedData = localStorage.getItem(`sale-data${organizationId}`);
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return {
        clientId: null,
        clientName: "",
        isBorrow: false,
        employeeId: null,
        description: "",
        organizationId: Number(organizationId),
        payments: [],
        tables: [],
      };
    }
  }, [organizationId]);

  const formikSale = useFormik<FormikInitialValues>({
    initialValues: getItinialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: FormikInitialValues) => {
      try {
        if(values.organizationId === null) {
          return notifyWarning("Tashkilot tanlanmagan,sahifani yangilab ko'ring")
        }
        const response = await api.post("sale/create", {...values,organizationId});
        console.log(response);

        if (response.data || response.status === 200) {
          console.log("data", response.data);
          formikSale.resetForm();
          localStorage.removeItem(`sale-data${organizationId}`);
          setOpenFinish(false);
          notifySuccess("Sotuv muvaffaqiyatli yakunlandi");
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    if (
      formikSale.values.organizationId === null ||
      formikSale.values.organizationId === 0
    ) {
      localStorage.setItem(
        `sale-data${organizationId}`,
        JSON.stringify(formikSale.values),
      );
    }
  }, [formikSale.values]);
  useEffect(() => {
    if (tableData) {
      const formattedTables = tableData.map((item) => ({
        productTableId: item.id,
        soldPrice: item.salePrice,
        currencyExchangeRate: Number(exchangeRate),
        productId: item.productId,
        product: item.product,
        serialNumber: item.serialNumber,
        purchasePrice: item.purchasePrice,
        percent: item.percent,
        markupPrice: item.markupPrice,
      }));
      formikSale.setFieldValue("tables", formattedTables);
    }
  }, [tableData]);
  console.log(formikSale.values.organizationId);

  const handleOpenCalculate = (paymentSystemTypeId: 1 | 2 | 3) => {
    setPaymentType(paymentSystemTypeId);
    setOpenCalculate(true);
  };
  const removePaymentSystemType = (item: any) => {
    const filtered = formikSale.values.payments.filter(
      (val) => val.paymentSystemTypeId !== item.paymentSystemTypeId,
    );
    formikSale.setFieldValue("payments", filtered);
    console.log(item);
  };

  const totalAmount = formikSale.values.tables.reduce(
    (sum, tables) => sum + (tables.soldPrice ?? 0),
    0,
  );

  const totalPaidAmount = formikSale.values.payments.reduce((sum, payment) => {
    if (payment.currencyId === 1) {
      return sum + (payment.amount ?? 0);
    } else {
      return sum + Math.round((payment.amount ?? 0) * exchangeRate);
    }
  }, 0);

  const remainingAmount = totalAmount - totalPaidAmount;
  const selectedClient = ClientSelectList?.find(
    (client: ClientSelectListType) => client.id === formikSale.values.clientId,
  );
  const canBorrow = selectedClient?.isPossibleBorrow;
  const isFinishDisabled =
    !formikSale.values.clientId ||
    formikSale.values.tables.length === 0 ||
    (remainingAmount > 0 && !(canBorrow && formikSale.values.isBorrow));

  return (
    <div className="w-[35%] overflow-hidden relative bg-card-base h-full rounded-3xl p-5 bg-white shadow-sm ">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-2">
          <Select
            className=" flex-1"
            options={ClientSelectList?.map((item: ClientSelectListType) => ({
              label: item.name,
              value: item.id,
            }))}
            loading={isLoading}
            showSearch
            placeholder="Mijoz ismi"
            onChange={(val) => formikSale.setFieldValue("clientId", val)}
          />
          <AddClientModal
            open={openModal}
            onCancel={() => setOpenModal(false)}
          />
          <Button
            icon={<UserAddOutlined />}
            size="medium"
            onClick={() => setOpenModal(true)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5   ">
          <div className="bg-gray-200 flex flex-col rounded-xl p-3">
            <span className="text-gray-500 text-2xs">Jami:</span>
            <span className="text-2xs"> {numberSpacing(totalAmount)} UZS</span>
          </div>
          <div className="bg-gray-200 flex flex-col rounded-xl p-3">
            <span className="text-gray-500 text-2xs">Qoldiq:</span>
            <span className="text-2xs">
              {numberSpacing(remainingAmount)} UZS
            </span>
          </div>
        </div>
        <div className="mt-2 h-60 flex flex-col gap-2">
          {formikSale.values.payments.map((item) => (
            <div
              key={item.paymentSystemTypeId}
              className="flex justify-between items-center w-full"
            >
              <div className="font-normal">
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-5 ml-auto">
                <span className=" font-normal">
                  {numberSpacing(item.amount)}
                  {item.currencyId === 1 ? " UZS" : " USD"}
                </span>
                <Button
                  type="text"
                  onClick={() => removePaymentSystemType(item)}
                  icon={<MinusCircleOutlined />}
                  color="danger"
                  variant="filled"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 pt-5  border-gray-50 ">
          <div className="grid grid-cols-3 gap-3 ">
            <Button
              onClick={() => handleOpenCalculate(1)}
              style={{ padding: "5px 30px" }}
              size="large"
            >
              Ko'chirma
            </Button>
            <Button
              onClick={() => handleOpenCalculate(2)}
              style={{ padding: "5px 30px" }}
              size="large"
            >
              Naqd
            </Button>
            <Button
              onClick={() => handleOpenCalculate(3)}
              style={{ padding: "5px 30px" }}
              size="large"
            >
              Terminal
            </Button>
            <CalculateModal
              open={openCalculate}
              paymentSystemTypeId={paymentType}
              onCancel={() => setOpenCalculate(false)}
              formik={formikSale}
            />
          </div>

          <div className="flex ">
            <Button
              disabled
              size="large"
              className="flex-1 h-10! rounded-l-3xl! rounded-r-none! border-gray-300 text-gray-400 "
            >
              Muddatli to'lov
            </Button>
            <Button
              className={`flex-1 h-10! rounded-r-3xl! rounded-l-none!  border-gray-300 ${canBorrow ? "" : "text-gray-400"} ${formikSale.values.isBorrow ? "bg-blue-500 text-white" : ""}`}
              size="large"
              disabled={!canBorrow || remainingAmount === 0}
              color={formikSale.values.isBorrow ? "blue" : undefined}
              variant="solid"
              onClick={() => {
                if (canBorrow && remainingAmount > 0) {
                  formikSale.setFieldValue(
                    "isBorrow",
                    !formikSale.values.isBorrow,
                  );
                }
                console.log(formikSale.values.isBorrow);
              }}
            >
              Qarz
            </Button>
          </div>
          <div>
            <Button
              className="w-full h-10! "
              onClick={() => setOpenFinish(true)}
              color="blue"
              variant="solid"
              shape="round"
              size="large"
              disabled={isFinishDisabled}
            >
              Yakunlash
            </Button>
            <FinishModalSale
              onCancel={() => setOpenFinish(false)}
              open={openFinish}
              formik={formikSale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SalePayment;

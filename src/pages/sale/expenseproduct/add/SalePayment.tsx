import { Select, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useSearchParams } from "react-router";
import AddClientModal from "../components/AddClientModal";
import { useState } from "react";
import CalculateModal from "../components/CalculateModal";
import { useFormik } from "formik";
import FinishModalSale from "../components/FinishModalSale";
import SubMenu from "antd/es/menu/SubMenu";

interface ClientSelectListType {
  isPossibleBorrow: boolean;
  id: number;
  name: string;
}

interface FormikInitialValues {
  docNumber: string;
  clientId: number | null;
  employeeId: number | null;
  saleTypeId: number | null;
  organizationId: number;
  description: string;
  exchangeRate: number | null;
  clientName: string;
  isBorrow: boolean;
  // tables:;
  payments: {
    paymentSystemTypeId: number;
    amount: number;
    currencyId: number | null;
    name: string;
  }[];
}

function SalePayment() {
  const [searchParams] = useSearchParams();
  const organizationId = searchParams.get("organizationId");
  const [openModal, setOpenModal] = useState(false);
  const [openCalculate, setOpenCalculate] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [paymentType, setPaymentType] = useState<1 | 2 | 3 | null>(null);
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

  const formikSale = useFormik<FormikInitialValues>({
    initialValues: {
      clientId: null,
      clientName: "",
      isBorrow: true,
      employeeId: null,
      description: "",
      docNumber: "",
      saleTypeId: null,
      organizationId: Number(organizationId),
      exchangeRate: null,
      payments: [],
    },
    // validationSchema: 
    onsubmit: async (values:FormikInitialValues) => {
      try{
        const response = await api.post("sale/create",values)
        if(response.data){
          console.log("data",response.data);
          formikSale.resetForm()
          
        }
      }catch(error){
        console.log(error);
        
      }
    },
  });

  const handleOpenCalculate = (paymentSystemTypeId: 1 | 2 | 3) => {
    setPaymentType(paymentSystemTypeId);
    setOpenCalculate(true);
  };

  const totalAmount = formikSale.initialValues.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  // const remainingAmount =

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
            <span className="text-lg"> UZS</span>
          </div>
          <div className="bg-gray-200 flex flex-col rounded-xl p-3">
            <span className="text-gray-500 text-2xs">Qoldiq:</span>
            <span className="text-lg"> UZS</span>
          </div>
          <div className="mt-2 space-y-10 overflow-y-auto h-60">
          {formikSale.initialValues.payments.map((item)=>(
             <div  key={item.paymentSystemTypeId}>
              <div>{item.amount}</div>
             </div>

          ))}
          </div>
         
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
              className="flex-1 h-10! rounded-r-3xl! rounded-l-none!  border-gray-300"
              size="large"
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

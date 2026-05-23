import api from "@/api/axiosInstance";
import { useAppSelector } from "@/store/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Typography,
  InputNumber,
} from "antd";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import dayjs from "dayjs";
import { useEffect } from "react";
import { numberSpacing } from "@/utils/utils";

interface PaymentSystemType {
  paymentDate: string;
  paymentSystemTypeId: number | null;
  currencyId: number | null;
  organizationId: number | null;
  saleId: number | null;
  bankId: number | null;
  amount: number | null;
  exchangeRate: number | null;
  description: string;
  transactionTypeCode: string;
  transactionTypeId: number | null;
  operationTypeId: number | null;
  clientId: number | null;
}

function ReturnPayment() {
  const { Title } = Typography;
  const params = useParams();
  const organizationId = useAppSelector(
    (state) => state.organization.selectedOrgId,
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: PaymentSystem } = useQuery({
    queryKey: ["PaymentSystem"],
    queryFn: async () => {
      try {
        const { data } = await api.get("manual/paymentsystemtypeselectlist");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  const { data: CurrencySelect } = useQuery({
    queryKey: ["CurrencySelect"],
    queryFn: async () => {
      try {
        const { data } = await api.get("manual/currencyselectlist");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  const { data: BankSelect } = useQuery({
    queryKey: ["BankSelect"],
    queryFn: async () => {
      try {
        const { data } = await api.get("manual/bankselectlist");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const schemaAuth = yup.object({
    paymentDate: yup.string().required("Sanani kiriting"),
    paymentSystemTypeId: yup.number().required("To'lov turini kiriting"),
    currencyId: yup.number().required(),
    bankId: yup.number().required(),
    amount: yup.number().required("Summani kiriting"),
    exchangeRate: yup.number().required(),
    description: yup.string().notRequired(),
  });

  const formikPayment = useFormik<PaymentSystemType>({
    initialValues: {
      paymentDate: dayjs().format("YYYY-MM-DDTHH:mm"),
      paymentSystemTypeId: null,
      currencyId: null,
      organizationId: organizationId,
      saleId: null,
      bankId: null,
      amount: null,
      exchangeRate: null,
      description: "",
      transactionTypeCode: "Clent_Pay",
      transactionTypeId: 1,
      operationTypeId: 1,
      clientId: Number(params.id),
    },
    enableReinitialize: true,

    validationSchema: schemaAuth,
    onSubmit: async (values) => {
      try {
        const { data } = await api.post("client/createtransaction", values);
        if (data) {
          navigate(-1);
          formikPayment.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    formikPayment.setFieldValue("clientId", params.id);
    formikPayment.setFieldValue("organizationId", organizationId);
    if (formikPayment.values.paymentSystemTypeId === 1) {
      formikPayment.setFieldValue("currencyId", 1);
    }
    if (formikPayment.values.paymentSystemTypeId === 2) {
      formikPayment.setFieldValue("bankId", null);
    }
  }, [
    params.id,
    organizationId,
    formikPayment.values.paymentSystemTypeId,
    formikPayment.values.currencyId,
  ]);

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "100vh",
          //   maxWidth: '900px',
          borderRadius: "12px",
          height: "70vh",
        }}
      >
        <Title level={4} style={{ marginBottom: "24px" }}>
          Qaytim yaratish
        </Title>

        <Form layout="vertical" onFinish={formikPayment.handleSubmit}>
          <Row gutter={[24, 0]}>
            <Col span={12}>
              <Form.Item label="Sana" name="paymentDate">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="08.05.2026"
                  value={formikPayment.values.paymentDate}
                  onChange={(value) =>
                    formikPayment.setFieldValue("paymentDate", value)
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="To'lov turi">
                <Select
                  placeholder="To'lov turi"
                  style={{ width: "100%" }}
                  value={formikPayment.values.paymentSystemTypeId}
                  onChange={(value) =>
                    formikPayment.setFieldValue("paymentSystemTypeId", value)
                  }
                  fieldNames={{ label: "name", value: "id" }}
                  options={PaymentSystem}
                  showSearch
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Valyuta turi">
                <Select
                  placeholder="Valyuta turi"
                  style={{ width: "100%" }}
                  value={formikPayment.values.currencyId}
                  onSelect={(value) =>
                    formikPayment.setFieldValue("currencyId", value)
                  }
                  //   fieldNames={{ label: "name", value: "id" }}
                  options={
                    CurrencySelect?.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    })) ?? []
                  }
                  showSearch
                  disabled={formikPayment.values.paymentSystemTypeId === 1}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Bank">
                <Select
                  placeholder="Bank"
                  style={{ width: "100%" }}
                  value={formikPayment.values.bankId}
                  onChange={(value) =>
                    formikPayment.setFieldValue("bankId", value)
                  }
                  fieldNames={{ label: "name", value: "id" }}
                  options={BankSelect}
                  showSearch
                  disabled={formikPayment.values.paymentSystemTypeId === 2}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Summa"
                name="amount"
                validateStatus={
                  formikPayment.errors.amount && formikPayment.touched.amount
                    ? "error"
                    : ""
                }
                help={
                  formikPayment.touched.amount && formikPayment.errors.amount
                }
              >
                <InputNumber
                  placeholder="Summa"
                  size="large"
                  value={formikPayment.values.amount}
                  onChange={(value) =>
                    formikPayment.setFieldValue("amount", value)
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Kurs">
                <InputNumber
                  placeholder="Kurs"
                  size="large"
                  type="number"
                  value={formikPayment.values.exchangeRate}
                  onChange={(value) =>
                    formikPayment.setFieldValue("exchangeRate", value)
                  }
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Ma'lumot">
                <Input.TextArea
                  placeholder="Ma'lumot"
                  rows={1}
                  style={{ resize: "none" }}
                  value={formikPayment.values.description}
                  name="description"
                  onChange={formikPayment.handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                borderRadius: "8px",
                padding: "0 40px",
                marginTop: "30px",
              }}
            >
              Saqlash
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
export default ReturnPayment;

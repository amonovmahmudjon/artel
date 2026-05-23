import api from "@/api/axiosInstance";
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
import { useLocation, useNavigate, useParams } from "react-router";
import * as yup from "yup";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import dayjs from "dayjs";

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

function Payment() {
  const { Title } = Typography;
  const location = useLocation();
  const ClientRef = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const organizationId = useAppSelector(
    (state) => state.organization.selectedOrgId,
  );

  const { data: PaymentSystem, isLoading } = useQuery({
    queryKey: ["PaymentSystem", location.pathname],
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
    paymentSystemId: yup.number().required("To'lov turini kiriting"),
    currencyId: yup.number().required(),
    bankId: yup.number().required(),
    amount: yup.number().required(),
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
    validationSchema: schemaAuth,
    onSubmit: async (values) => {
      try {
        const { data } = await api.post("client/createtransaction", values);
        if (data) {
          navigate(-1);
          formikPayment.resetForm();
        }
      } catch (error) {
        console.error(error);
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
          To'lov yaratish
        </Title>

        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col span={12}>
              <Form.Item label="Sana" name="paymentDate">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Sanani tanlang"
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
                  loading={isLoading}
                  placeholder="To'lov turi"
                  style={{ width: "100%" }}
                  value={formikPayment.values.paymentSystemTypeId}
                  onChange={(value) =>
                    formikPayment.setFieldValue("paymentSystemTypeId", value)
                  }
                  options={PaymentSystem?.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                  }))}
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
                  onChange={(value) =>
                    formikPayment.setFieldValue("CurrencySelect", value)
                  }
                  fieldNames={{ label: "name", value: "id" }}
                  options={CurrencySelect}
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
              <Form.Item label="Summa">
                <InputNumber
                  placeholder="Summa"
                  size="large"
                  value={formikPayment.values.amount}
                  name="amount"
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
                  value={formikPayment.values.exchangeRate}
                  name="exchangeRate"
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
                  onChange={(value) =>
                    formikPayment.setFieldValue("description", value)
                  }
                  name="description"
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              size="large"
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
export default Payment;

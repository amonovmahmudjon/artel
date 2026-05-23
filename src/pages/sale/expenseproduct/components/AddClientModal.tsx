import { useFormik } from "formik";
import Modal from "antd/es/modal/Modal";
import { Button, Form, Input, Card, InputNumber } from "antd";
import InputText from "@/components/fields/InputText";
import InputPhoneNumber from "@/components/fields/InputPhoneNumber";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Switch } from "antd";
import api from "@/api/axiosInstance";
import * as yup from "yup";
import { useParams, useSearchParams } from "react-router";
import { notifySuccess } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";

interface AddClientModalType {
  fullName: string;
  phoneNumber: string;
  isPossibleBorrow: boolean | null;
  organizationId: number | null;
}
interface AddClientModalProps {
  open: boolean;
  onCancel: () => void;
}

function AddClientModal({ open, onCancel}: AddClientModalProps) {
  const [searchParams] = useSearchParams();
  const organizationId = searchParams.get("organizationId");
  const qy = useQueryClient();
  const schemaAuth = yup.object({
    fullName: yup.string().required("Ismni kiriting"),
    phoneNumber: yup.string().required("Telefon raqamni kiriting")
  });
  const formikAddClient = useFormik<AddClientModalType>({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      isPossibleBorrow: false,
      organizationId: Number(organizationId),
    },

    validationSchema: schemaAuth,
    onSubmit: async (values) => {
      try {
        const response = await api.post("client/create", values);
        if (
          response.data &&
          (response.status === 200 || response.status === 201)
        ) {
          onCancel();

          notifySuccess("Mijoz qo'shildi");
          qy.invalidateQueries({ queryKey: ["ClientSelectList"] });
          formikAddClient.resetForm();
        }
        return response.data;
      } catch (error) {
        console.error(error);
      }
      console.log("assalom");
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onCancel={onCancel}
        title={"Mijoz yaratish"}
        onOk={() => formikAddClient.handleSubmit()}
      >
        <Form layout="vertical" onFinish={formikAddClient.handleSubmit}>
          <InputText
            label="To'liq ismi"
            formik={formikAddClient}
            fieldName="fullName"
            placeholder="To'liq ismi"
          />

          <InputPhoneNumber
            label="Telefon nomer"
            formik={formikAddClient}
            fieldName="phoneNumber"
          />
          <Form.Item label={"Qarzga berish"}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={formikAddClient.values.isPossibleBorrow ?? false}
              onChange={(checked) =>
                formikAddClient.setFieldValue("isPossibleBorrow", checked)
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default AddClientModal;

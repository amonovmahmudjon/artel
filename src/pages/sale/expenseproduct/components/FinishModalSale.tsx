import { Modal, Form, Button, Select } from "antd";
import InputText from "@/components/fields/InputText";
import { type FieldProps, type FormikProps } from "formik";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useAppSelector } from "@/store/hooks";

interface FinishModalProps {
  onCancel: () => void;
  open: boolean;
  formik: FormikProps<FieldProps> | any;
}

function FinishModalSale({ onCancel, open, formik }: FinishModalProps) {
  const organizationId = useAppSelector(
    (state) => state.organization.selectedOrgId,
  );

  const { data: Employeeselectlist, isLoading } = useQuery({
    queryKey: ["Employeeselectlist", organizationId],
    queryFn: async () => {
      const { data } = await api.get("manual/employeeselectlist", {
        params: {
          organizationId: organizationId,
        },
      });
      return data;
    },
  });
  console.log(formik.values);
  
  return (
    <div>
      <Modal
        open={open}
        onCancel={onCancel}
        title={"Yakunlash"}
        footer={false}
        width={450}
      >
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item label="Menejer">
            <Select
              placeholder="Menejer"
              options={Employeeselectlist?.map(
                (state: { id: number; name: string }) => ({
                  label: state.name,
                  value: state.id,
                }),
              )}
              className="w-full text-lg"
              loading={isLoading}
              value={formik.values.employeeId}
              onChange={(value)=> formik.setFieldValue("employeeId",value)}
            />
          </Form.Item>
          <InputText
            label="Kurs"
            fieldName="exchangeRate"
            placeholder="Kurs"
            formik={formik}
          />
          <InputText
            label="Ma'lumot"
            fieldName="description"
            placeholder="Ma'lumot"
            formik={formik}
          />
          <Button
            block /*To'liq kenglik uchun*/
            size="large"
            color="blue"
            variant="solid"
            type="primary"
            htmlType="submit"
            
                     >
            Yakunlash
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
export default FinishModalSale;

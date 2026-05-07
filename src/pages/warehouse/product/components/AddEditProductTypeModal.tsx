import { type ProductTypeChildrenData } from "@/interface/interface";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";

interface AddEditProductTypeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  formik: any;
  editItem: ProductTypeChildrenData | null;
}

function AddEditProductTypeModal({
  open,
  setOpen,
  formik,
  editItem,
}: AddEditProductTypeModalProps) {
  const { data: CounterPartySelectList } = useQuery({
    queryKey: ["CounterPartySelectList"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/manual/counterpartyselectlist");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  const { data: StateSelectList } = useQuery({
    queryKey: ["StateSelectList"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/manual/stateselectlist");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  const formikProductType = useFormik<ProductTypeChildrenData>({
    initialValues: {
      name: "",
      stateId: 1,
      description: "",
      sapCode: "",
      idIndex: null,
      counterPartyId: 1,
      id: null,
      limit: null,
      price: null,
      productTypeId: null,
      state: "",
      new: false,
      productType: "",
      counterParty:null,
      createdDate:""
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSave(values);
    },
  });
  useEffect(() => {
    if (open) {
      if (editItem) {
        formikProductType.setValues(editItem);
      } else {
        formikProductType.resetForm();
      }
    }
  }, [open, editItem]);

  const handleSave = (values: ProductTypeChildrenData) => {
    const copyProducts = [...formik.values.products];

    if (editItem) {
      const updated = copyProducts.map((item) =>
        item.idIndex === editItem.idIndex ? { ...values } : item,
      );
      console.log(values);

      formik.setFieldValue("products", updated);
    } else {
      const newItem = {
        ...values,
        idIndex:
          formik.values.products.length > 0
            ? formik.values.products[0].idIndex + 1
            : 1,
        new: true,
      };

      formik.setFieldValue("products", [...copyProducts, newItem]);
    }
    setOpen(false);
  };

  return (
    <Modal
      title={editItem ? "Tahrirlash" : "Yangi qo'shish"}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => formikProductType.handleSubmit()}
      okText="Saqlash"
      cancelText="Bekor qilish"
    >
      <Form layout="vertical">
        <Form.Item label="Mahsulot nomi">
          <Input
            name="name"
            value={formikProductType.values.name}
            onChange={formikProductType.handleChange}
          />
        </Form.Item>
        <Form.Item label="Ma'lumot">
          <Input
            name="description"
            value={formikProductType.values.description}
            onChange={formikProductType.handleChange}
          />
        </Form.Item>
        <Form.Item label="SAP kodi">
          <Input
            name="sapCode"
            value={formikProductType.values.sapCode}
            onChange={formikProductType.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Yetkazib beruvchi"
          name="Select"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select
            value={formikProductType.values.counterPartyId}
            onChange={(value) =>
              formikProductType.setFieldValue("CounterPartySelectList", value)
            }
            fieldNames={{ label: "name", value: "id" }}
            options={CounterPartySelectList}
          />
        </Form.Item>
        {editItem && (
          <Form.Item
            label="Holati"
            name="Select"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              value={formikProductType.values.stateId}
              onChange={(value) =>
                formikProductType.setFieldValue("stateId", value)
              }
              fieldNames={{ label: "name", value: "id" }}
              options={StateSelectList}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default AddEditProductTypeModal;

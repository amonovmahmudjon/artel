import { Card } from "antd";
import { useParams } from "react-router";
import { useFormik } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { type ProductTypeChildrenData } from "@/interface/interface";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload, Col, Row } from "antd";
import type { UploadProps } from "antd";
import { Button, message } from "antd";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { useEffect } from "react";
import ProductTypeTable from "@/pages/warehouse/product/components/ProductTypeTable";

interface initialValuesTypes {
  name: string;
  stateId?: number | null;
  state?: string | null;
  description: string | null;
  id?: number | null;
  photoUrl?: string | null;
  products: ProductTypeChildrenData[];
}

function ProductAddEdit() {
  const qc = useQueryClient();
  const params = useParams();
  const isEdit = Boolean(params.id);
  const title = isEdit ? "Mahsulotni o'zgartirish" : "Yangi mahsulot yaratish";
  const navigate = useNavigate();

  const { data: ProductData, isLoading } = useQuery({
    queryKey: ["ProductData", params.id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/producttype/get/${params.id}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    enabled: isEdit,
  });
  const schemaAuth = yup.object({
    name: yup.string().required("Mahsulot nomi kiritilishi shart"),
    description: yup.string().notRequired(),
    ...(isEdit && {
      stateId: yup.number().required("Mahsulot holati kiritilishi shart"),
      id: yup.number().required(),
    }),
  });
  const formik = useFormik<initialValuesTypes>({
    initialValues: {
      name: "",
      stateId: 1,
      state: null,
      description: "",
      id: null,
      photoUrl: null,
      products: [],
    },
    enableReinitialize: true,
    validationSchema: schemaAuth,
    onSubmit: async (values) => {
      try {
        const response = isEdit
          ? await api.put("/producttype/update", values)
          : await api.post("/producttype/create", values);
        if (response) {
          formik.resetForm();
          navigate(-1);
          qc.invalidateQueries({ queryKey: ["productTable"] });
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  useEffect(() => {
    if (ProductData) {
      formik.setValues({
        name: ProductData.name,
        stateId: ProductData.stateId,
        state: ProductData.state,
        description: ProductData.description,
        id: ProductData.id,
        photoUrl: null,
        products:
          ProductData.products.map((item: any) => ({
            ...item,
            idIndex: item.id,
          })) || [],
      });
    }
  }, [ProductData]);

  const props: UploadProps = {
    maxCount: 1,
    accept: "image/png, image/jpg",
    beforeUpload: (file) => {
      const isAllowedType =
        file.type === "image/png" || file.type === "image/jpg";

      if (!isAllowedType) {
        message.error(
          `${file.name} — noto'g'ri format. Faqat PNG yoki JPG yuklashingiz mumkin!`,
        );
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: (info) => {
      if (info.fileList.length > 0) {
        formik.setFieldValue("photoUrl", info.fileList[0].originFileObj);
      } else {
        formik.setFieldValue("photoUrl", null);
      }
    },
  };
  if (isEdit && isLoading) {
    return;
  }

  return (
    <>
      <Card
        title={title}
        extra={
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            Orqaga qaytish
          </Button>
        }
      >
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Row gutter={16} align={"bottom"}>
            <Col span={8}>
              <Form.Item label={<b>Mahsulot nomi</b>}>
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Mahsulot nomi"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<b>Mahsulot haqida</b>}>
                <Input
                  name="description"
                  value={formik.values.description || ""}
                  onChange={formik.handleChange}
                  placeholder="Mahsulot haqida"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<b>Rasmni yuklang</b>}>
                <Upload {...props} listType="picture">
                  <Button
                    icon={<UploadOutlined />}
                    className="w-full"
                    size="large"
                  >
                    JPG yoki PNG yuklang
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            {isEdit && (
              <Col span={8}>
                <Form.Item label={<b>Holati</b>}>
                  <Select
                    value={formik.values.stateId}
                    onChange={(value) => formik.setFieldValue("stateId", value)}
                    options={[
                      { label: "Актив", value: 1 },
                      { label: "Пассив", value: 0 },
                    ]}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={formik.isSubmitting}
            >
              Saqlash
            </Button>
          </div>
        </Form>
      </Card>
      <div>
        <ProductTypeTable tableData={formik.values.products} formik={formik} />
      </div>
    </>
  );
}
export default ProductAddEdit;

// onSubmit: async (values) => {
//   try {
//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("description", values.description || "");

//     // Agar rasm tanlangan bo'lsa
//     if (values.photoUrl instanceof File) {
//       formData.append("photo", values.photoUrl);
//     }

//     // Ichki mahsulotlarni string holatida yuborish (ko'p hollarda backend shunday kutadi)
//     formData.append("products", JSON.stringify(values.products));

//     if (isEdit) {
//       await api.put("/producttype/update", formData);
//       message.success("Mahsulot muvaffaqiyatli yangilandi");
//     } else {
//       await api.post("/producttype/create", formData);
//       message.success("Yangi mahsulot yaratildi");
//     }
//     navigate("/warehouse/product"); // Saqlab bo'lgach ro'yxatga qaytish[cite: 1]
//   } catch (error) {
//     message.error("Xatolik yuz berdi!");
//     console.error(error);
//   }
// },

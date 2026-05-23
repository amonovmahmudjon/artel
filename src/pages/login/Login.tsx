import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "@/api/axiosInstance";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/features/authSlice";
import { Button, Card, Form, Input } from "antd";
import useNotification from "@/hooks/useNotification";

const schemaAuth = yup.object({
  userName: yup.string().required("Loginni kiritish majburiy"),
  password: yup.string().required("Parolni kiritish majburiy"),
});

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const setNotification = useNotification();
  const formik = useFormik<yup.InferType<typeof schemaAuth>>({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: schemaAuth,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await api.post("account/login", values);
        console.log("Login response:", data);

        // Har xil API response strukturalarini qo'llab-quvvatlash
        const loginData = {
          user: data.user || { userName: values.userName },
          token: data.token || data.accessToken || data.access_token,
        };

        dispatch(login(loginData));
        localStorage.setItem("login", JSON.stringify(loginData));

        setNotification({
          msg: "Muvaffaqiyatli kirildi",
          variant: "success",
        });
        formik.resetForm();
        setTimeout(() => {
          navigate("/mainlayout");
        }, 500);
      } catch (error) {
        setNotification({
          msg: "Login yoki parol xato",
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4">
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <Form
          name="basic"
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={formik.handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;

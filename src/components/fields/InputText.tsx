import { Form, type FormProps, Input } from "antd";
import { type FormikProps } from "formik";
import React from "react";


interface inputProps {
  label?: string | boolean;
  formik: FormikProps<FieldProps> | any;
  fieldName: string;
  disabled?: boolean;
  marginBottom?: string;
  placeholder:string
}
 interface FieldProps {
  userName: string;
  password: string;
}


const InputText: React.FC<inputProps> = (props) => {
  const {
    label = "",
    formik,
    fieldName = "",
    disabled = false,
    placeholder = "",
  } = props;
  return (
    <Form.Item<FormProps>
      className="flex flex-col"      
      label={label === "" ? false : (label)}
      validateStatus={formik.touched[fieldName]  && formik.errors[fieldName]? "error" : ""}
      help={formik.touched[fieldName] && formik.errors[fieldName]}
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input
        value={formik.values[fieldName]}
        onChange={(event) => {
          let value = event.target.value;
          formik.setFieldValue(fieldName, value, true);
        }}
        name={fieldName}
        placeholder={placeholder}
        className={`${disabled ? "disabled" : ""} mono`}
        style={{
          backgroundColor: "transparent",
          padding: "0px 10px",
          height: "38px",
        }}
      />
    </Form.Item>
  );
};

export default InputText;
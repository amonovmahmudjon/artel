import { Form, type FormProps, Input } from "antd";
import { type FormikProps } from "formik";
import React from "react";
import { PatternFormat } from "react-number-format";
interface InputPhoneNumberProps {
  label?: string;
  formik: FormikProps<FieldProps> | any;
  fieldName: string;
  disabled?: boolean;
  marginBottom?: string;
}
 interface FieldProps {
  userName: string;
  password: string;
}

const InputPhoneNumber: React.FC<InputPhoneNumberProps> = (props) => {
  const { label = "", formik, fieldName = "", disabled = false } = props;
  return (
    <Form.Item<FormProps>
      className="flex flex-col"
      label={label === "" ? false : (label)}
      validateStatus={
        formik.touched[fieldName] && formik.errors[fieldName] ? "error" : ""
      }
      help={formik.touched[fieldName] && formik.errors[fieldName]}
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <PatternFormat
        format="+998 ## ###-##-##"
        customInput={Input}
        value={formik.values[fieldName]}
        onChange={(event) => {
          let value = event.target.value;
          formik.setFieldValue(fieldName, value, true);
        }}
        
        name={fieldName}
        placeholder={"+998 ## ###-##-##"}
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

export default InputPhoneNumber;
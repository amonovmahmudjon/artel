import { Form, type FormProps, Input } from "antd";
import { type FormikProps } from "formik";
import React from "react";
import { NumericFormat } from "react-number-format";

interface InputNumberProps {
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

const InputNumber: React.FC<InputNumberProps> = (props) => {
  const { label = "", formik, fieldName = "", disabled = false } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.split(" ").join(""))
    formik.setFieldValue(fieldName, value, true);
  };
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
      <NumericFormat
        value={formik.values[fieldName]?.toString()}
        customInput={Input}
        onChange={handleChange}
        name={fieldName}
        placeholder={(label)}
        thousandsGroupStyle="thousand"
        decimalScale={5}
        allowLeadingZeros={false}
        fixedDecimalScale={false}
        thousandSeparator=" "
        disabled={disabled}
        style={{
          backgroundColor: "transparent",
          padding: "0px 10px",
          height: "38px",
          width: "100%",
        }}
      />
    </Form.Item>
  );
};

export default InputNumber;
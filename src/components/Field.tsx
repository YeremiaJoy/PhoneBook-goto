import {
  Input,
  InputFieldContainer,
  MessageDanger,
} from "@/styles/01_components/Field";
import { ErrorMessage, Field } from "formik";
import { InputFieldType } from "@/definitions/InputField";

export default function InputField({
  label,
  name,
  placeholder,
  disabled,
}: InputFieldType) {
  return (
    <InputFieldContainer>
      <label htmlFor={name}>{label}</label>
      <Field
        as={Input}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />
      <MessageDanger>
        <ErrorMessage name={name} />
      </MessageDanger>
    </InputFieldContainer>
  );
}

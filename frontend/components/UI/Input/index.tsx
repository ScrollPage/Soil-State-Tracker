import { FieldAttributes } from "formik";
import React from "react";
import { SInput, SInputTag, SInputError } from "./styles";

const Input: React.FC<FieldAttributes<any>> = ({
  field,
  form: { touched, errors },
  name,
  isTextArea,
  ...props
}) => {
  const isShowError = touched[field.name] && errors[field.name];
  return (
    <SInput>
      <SInputTag {...field} {...props} id={name} isShowError={isShowError} />
      {isShowError && <SInputError>{errors[field.name]}</SInputError>}
    </SInput>
  );
};

export default Input;

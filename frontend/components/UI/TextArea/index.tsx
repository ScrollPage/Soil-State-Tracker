import { FieldAttributes } from "formik";
import React from "react";
import { STextArea, STextAreaTag, STextAreaError } from "./styles";

const TextArea: React.FC<FieldAttributes<any>> = ({
  field,
  form: { touched, errors },
  name,
  isTextArea,
  ...props
}) => {
  const isShowError = touched[field.name] && errors[field.name];
  return (
    <STextArea>
      <STextAreaTag {...field} {...props} id={name} isShowError={isShowError} />
      {isShowError && <STextAreaError>{errors[field.name]}</STextAreaError>}
    </STextArea>
  );
};

export default TextArea;

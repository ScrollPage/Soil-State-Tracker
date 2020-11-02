import { from } from "gsap";
import React from "react";
import { SCompanyCreate } from "./styles";
import { Card } from "antd";
import { Formik, FormikProps, Form, Field } from "formik";
import Input from "@/components/UI/Input";
import { SButton } from "@/components/UI/Button";
import { validationCompany } from "@/components/Auth/RegisterForm";
import { addCompanyMutate } from "@/mutates/company";
import { useDispatch } from "react-redux";
import { addCompany } from "@/store/actions/company";
import { trigger } from "swr";

interface FormValues {
  companyName: string;
  companyInfo: string;
}

const CompanyCreate = () => {
  const dispatch = useDispatch();

  const createCompanyHandler = (values: FormValues) => {
    const companyUrl = "/api/company/";
    addCompanyMutate(companyUrl, values.companyName, values.companyInfo);
    try {
      dispatch(addCompany(companyUrl, values.companyName, values.companyInfo));
    } finally {
      trigger(companyUrl);
    }
  };

  return (
    <SCompanyCreate>
      <Card title="Создать компанию" style={{ width: 300 }}>
        <Formik
          initialValues={{
            companyName: "",
            companyInfo: "",
          }}
          onSubmit={(values, helpers) => {
            helpers.setSubmitting(true);
            setTimeout(() => {
              createCompanyHandler(values);
              helpers.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationCompany}
        >
          {(props: FormikProps<FormValues>) => (
            <Form>
              <Field
                type="text"
                name="companyName"
                placeholder="Название компании"
                width={"100%"}
                component={Input}
              />
              <Field
                type="text"
                name="companyInfo"
                placeholder="Описание компании"
                width={"100%"}
                component={Input}
              />
              <SButton htmlType="submit" disabled={props.isSubmitting}>
                Создать
              </SButton>
            </Form>
          )}
        </Formik>
      </Card>
    </SCompanyCreate>
  );
};

export default CompanyCreate;

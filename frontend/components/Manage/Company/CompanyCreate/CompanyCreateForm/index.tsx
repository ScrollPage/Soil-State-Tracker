import React from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import Input from "@/components/UI/Input";
import { SButton } from "@/components/UI/Button";
import { useDispatch } from "react-redux";
import { addCompany } from "@/store/actions/company";
import { object, string, ref } from "yup";

export const validationCompany = object().shape({
  companyName: string()
    .min(3, "Слишком короткое название компании")
    .max(15, "Слишком длинное название компании")
    .required("Введите название компании"),
  companyInfo: string()
    .min(3, "Слишком короткая информация о компании")
    .max(15, "Слишком длинная информация о компании")
    .required("Введите информацию о компании"),
  companyUrl: string()
    .min(5, "Слишком короткая ссылка")
    .max(30, "Слишком длинная ссылка")
    .required("Введите ссылку на сайт компании"),
});

interface FormValues {
  companyName: string;
  companyInfo: string;
  companyUrl: string;
}

interface ICompanyCreateForm {
  changeHanlder?: (id: number, name: string, url: string, info: string) => void;
  initialValues?: {
    id: number;
    name: string;
    info: string;
    url: string;
  };
}

const CompanyCreateForm = ({
  changeHanlder,
  initialValues,
}: ICompanyCreateForm) => {
  const dispatch = useDispatch();

  const isInnerModal = !!changeHanlder;

  const createCompanyHandler = (values: FormValues) => {
    if (isInnerModal) {
      changeHanlder(
        initialValues.id,
        values.companyName,
        values.companyUrl,
        values.companyInfo
      );
    } else {
      dispatch(
        addCompany(values.companyName, values.companyUrl, values.companyInfo)
      );
    }
  };

  return (
    <Formik
      initialValues={{
        companyName: initialValues?.name ?? "",
        companyInfo: initialValues?.info ?? "",
        companyUrl: initialValues?.url ?? "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setTimeout(() => {
          createCompanyHandler(values);
          setSubmitting(false);
          resetForm();
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
            name="companyUrl"
            placeholder="Ссылка на сайт"
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
            {isInnerModal ? "Подтвердить" : "Создать"}
          </SButton>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyCreateForm;

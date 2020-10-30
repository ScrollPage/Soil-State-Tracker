import React from "react";
import { SLoginForm } from "./styles";
import { Formik, Form, FormikProps, Field } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string } from "yup";

const validationSchema = object().shape({
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
  password: string().required("Введите пароль"),
});

const LoginForm = () => {
  return (
    <SLoginForm>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field
              type="text"
              name="email"
              placeholder="E-mail"
              component={Input}
            />
            <Field
              type="password"
              name="password"
              placeholder="Пароль"
              component={Input}
            />
            <SButton htmlType="submit" width={"300px"}>
              Войти
            </SButton>
          </Form>
        )}
      </Formik>
    </SLoginForm>
  );
};

export default LoginForm;

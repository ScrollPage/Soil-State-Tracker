import React from "react";
import { SRegisterForm } from "./styles";
import { Formik, Form, FormikProps, Field } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string, ref } from "yup";

const validationSchema = object().shape({
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
  firstName: string()
    .min(3, "Слишком короткое имя")
    .max(15, "Слишком длинное имя")
    .required("Введите имя"),
  lastName: string()
    .min(3, "Слишком короткая фамилия")
    .max(15, "Слишком длинная фамилия")
    .required("Введите имя"),
  password: string()
    .matches(
      // @ts-ignore: Unreachable code error
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
      "Слишком легкий пароль"
    )
    .required("Введите пароль"),
  confirmPassword: string()
    .required("Введите пароль")
    .oneOf([ref("password"), ""], "Пароли должны совпадать"),
});

const RegisterForm = () => {
  return (
    <SRegisterForm>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
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
              type="text"
              name="firstName"
              placeholder="Имя"
              component={Input}
            />
            <Field
              type="text"
              name="lastName"
              placeholder="Фамилия"
              component={Input}
            />
            <Field
              type="password"
              name="password"
              placeholder="Пароль"
              component={Input}
            />
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Повторите пароль"
              component={Input}
            />
            <SButton htmlType="submit" width={"300px"}>
              Зарегистрироваться
            </SButton>
          </Form>
        )}
      </Formik>
    </SRegisterForm>
  );
};

export default RegisterForm;

import React, { Dispatch, SetStateAction } from "react";
import {
  SRegisterForm,
  SFormikStepper,
  SFormikStepperMain,
  SFormikStepperBtn,
} from "./styles";
import { Formik, Form, Field, FormikValues, FormikConfig } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import TextArea from "@/components/UI/TextArea";
import { object, string, ref } from "yup";

const validationLogin = object().shape({
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
  firstName: string()
    .min(3, "Слишком короткое имя")
    .max(15, "Слишком длинное имя")
    .required("Введите имя"),
  lastName: string()
    .min(3, "Слишком короткая фамилия")
    .max(15, "Слишком длинная фамилия")
    .required("Введите фамилию"),
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

const validationCompany = object().shape({
  companyName: string()
    .min(3, "Слишком короткое название компании")
    .max(15, "Слишком длинное название компании")
    .required("Введите название компании"),
  companyInfo: string()
    .min(3, "Слишком короткая информация о компании")
    .max(15, "Слишком длинная информация о компании")
    .required("Введите нформацию о компании"),
});

interface IRegisterForm {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const RegisterForm: React.FC<IRegisterForm> = ({ step, setStep }) => {
  return (
    <SRegisterForm>
      <FormikStepper
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          companyName: "",
          companyInfo: "",
        }}
        step={step}
        setStep={setStep}
        enableReinitialize={true}
        onSubmit={async (values, helpers) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            helpers.setSubmitting(false);
          }, 1000);
        }}
      >
        <FormikStep validationSchema={validationLogin}>
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
        </FormikStep>
        <FormikStep validationSchema={validationCompany}>
          <Field
            type="text"
            name="companyName"
            placeholder="Название компании"
            component={Input}
          />
          <Field
            type="text"
            name="companyInfo"
            placeholder="Информация о компании"
            component={TextArea}
          />
        </FormikStep>
      </FormikStepper>
    </SRegisterForm>
  );
};

export default RegisterForm;

interface IFormikStep {
  children: React.ReactNode;
  validationSchema: any | (() => any);
}

const FormikStep: React.FC<IFormikStep> = ({ children, validationSchema }) => {
  return <>{children}</>;
};

interface FormikStepperProps extends FormikConfig<FormikValues> {
  children: React.ReactNode;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const FormikStepper: React.FC<FormikStepperProps> = ({
  children,
  step,
  setStep,
  ...stepperProps
}) => {
  // const dispatch = useDispatch();

  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    IFormikStep
  >[];

  const currentChild = childrenArray[step];

  const isLastElement = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...stepperProps}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastElement()) {
          await stepperProps.onSubmit(values, helpers);
        } else {
          helpers.setTouched({
            company: false,
            companyInfo: false,
          });
          setStep((e) => e + 1);
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <SFormikStepper>
              <SFormikStepperMain>{currentChild}</SFormikStepperMain>
              <SFormikStepperBtn>
                {step > 0 ? (
                  <SButton
                    onClick={() => setStep((e) => e - 1)}
                    width={"300px"}
                    disabled={isSubmitting}
                    iswhite={"true"}
                  >
                    Назад
                  </SButton>
                ) : null}
                <SButton
                  width={"300px"}
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  {isLastElement() ? "Зарегистрироваться" : "Дальше"}
                </SButton>
              </SFormikStepperBtn>
            </SFormikStepper>
          </Form>
        );
      }}
    </Formik>
  );
};

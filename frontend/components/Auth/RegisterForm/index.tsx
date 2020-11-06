import React, { Dispatch, SetStateAction } from "react";
import {
  SRegisterForm,
  SFormikStepper,
  SFormikStepperMain,
  SFormikStepperBtn,
  SFormikStepHeader,
} from "./styles";
import { Formik, Form, FormikValues, FormikConfig } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import TextArea from "@/components/UI/TextArea";
import { object, string, ref } from "yup";
import { authCheckActivate, authSignup } from "@/store/actions/auth";
import { useDispatch } from "react-redux";
import { addCompany } from "@/store/actions/company";
import { useRouter } from "next/router";

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
  name: string()
    .min(3, "Слишком короткое название компании")
    .max(15, "Слишком длинное название компании")
    .required("Введите название компании"),
  info: string()
    .min(3, "Слишком короткая информация о компании")
    .max(15, "Слишком длинная информация о компании")
    .required("Введите информацию о компании"),
  url: string()
    .min(3, "Слишком короткая ссылка")
    .max(15, "Слишком длинная ссылка")
    .required("Введите ссылку на сайт компании"),
});

interface IRegisterForm {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const RegisterForm: React.FC<IRegisterForm> = ({ step, setStep }) => {
  const dispatch = useDispatch();

  const { push } = useRouter();

  return (
    <SRegisterForm>
      <FormikStepper
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          name: "",
          url: "",
          info: "",
        }}
        step={step}
        setStep={setStep}
        enableReinitialize={true}
        onSubmit={(values, helpers) => {
          helpers.setSubmitting(true);
          try {
            dispatch(addCompany(values.name, values.url, values.info));
            push({ pathname: "/data" }, undefined, { shallow: true });
          } catch {}

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            helpers.setSubmitting(false);
          }, 1000);
        }}
      >
        <FormikStep validationSchema={validationLogin}>
          <Input type="text" name="email" placeholder="E-mail" />
          <Input type="text" name="firstName" placeholder="Имя" />
          <Input type="text" name="lastName" placeholder="Фамилия" />
          <Input type="password" name="password" placeholder="Пароль" />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
          />
        </FormikStep>
        <FormikStep>
          <SFormikStepHeader>
            К вам на почту пришло подтверждение
          </SFormikStepHeader>
        </FormikStep>
        <FormikStep validationSchema={validationCompany}>
          <Input
            type="text"
            name="companyName"
            placeholder="Название компании"
          />
          <TextArea name="companyInfo" placeholder="Информация о компании" />
        </FormikStep>
      </FormikStepper>
    </SRegisterForm>
  );
};

export default RegisterForm;

interface IFormikStep {
  children: React.ReactNode;
  validationSchema?: any | (() => any);
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
  const dispatch = useDispatch();

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
      onSubmit={(values, helpers) => {
        if (isLastElement()) {
          stepperProps.onSubmit(values, helpers);
        } else {
          helpers.setTouched({
            company: false,
            companyInfo: false,
          });
          helpers.setSubmitting(false);
          if (step === 0) {
            dispatch(
              authSignup(
                values.email,
                values.firstName,
                values.lastName,
                values.password,
                setStep
              )
            );
          }
          if (step === 1) {
            dispatch(authCheckActivate(setStep));
          }
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <SFormikStepper>
              <SFormikStepperMain>{currentChild}</SFormikStepperMain>
              <SFormikStepperBtn>
                {/* {step > 0 ? (
                  <SButton
                    onClick={() => setStep((e) => e - 1)}
                    width={"300px"}
                    disabled={isSubmitting}
                    iswhite={"true"}
                  >
                    Назад
                  </SButton>
                ) : null} */}
                <SButton
                  width={"300px"}
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  {isLastElement()
                    ? "Зарегистрироваться"
                    : step === 0
                    ? "Далее"
                    : "Получил"}
                </SButton>
              </SFormikStepperBtn>
            </SFormikStepper>
          </Form>
        );
      }}
    </Formik>
  );
};

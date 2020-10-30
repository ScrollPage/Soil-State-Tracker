import Head from "next/head";
import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <SLogin>
      <Head>
        <title>Вход</title>
      </Head>
      <SLoginInner>
        <SLoginLeft>
          <SLoginTitle>Вход</SLoginTitle>
          <SLoginSubTitle>
            У вас нет аккаунта? &nbsp;
            <Link href="/register">
              <a>Зарегистрируйтесь</a>
            </Link>
          </SLoginSubTitle>
        </SLoginLeft>
        <SLoginMain>
          <LoginForm />
        </SLoginMain>
      </SLoginInner>
    </SLogin>
  );
};

export default Login;

const SLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SLoginInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  @media (max-width: 767.98px) {
    flex-direction: column;
    align-items: center;
  }
`;
const SLoginTitle = styled.h1`
  font-weight: 800;
  font-size: 36px;
`;
const SLoginSubTitle = styled.span`
  display: flex;
  @media (max-width: 767.98px) {
    margin-bottom: 30px;
  }
`;
const SLoginMain = styled.span``;
const SLoginLeft = styled.span`
  font-size: 20px;
`;

import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

interface IManage {}

export default function Manage({}: IManage) {
  return (
    <SManage>
      <Head>
        <title>Управление</title>
      </Head>
      <h1>Управление</h1>
    </SManage>
  );
}

export const getServerSideProps: GetServerSideProps<IManage> = async (ctx) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};

const SManage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  h1 {
    font-weight: 800;
    font-size: 36px;
  }
`;

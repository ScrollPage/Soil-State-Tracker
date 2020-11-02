import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

interface IData {}

export default function Data({}: IData) {
  return (
    <SData>
      <Head>
        <title>Данные</title>
      </Head>
      <h1>Данные</h1>
    </SData>
  );
}

export const getServerSideProps: GetServerSideProps<IData> = async (ctx) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};

const SData = styled.div`
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

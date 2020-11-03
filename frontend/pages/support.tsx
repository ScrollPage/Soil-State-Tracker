import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

interface ISupport {}

export default function Support({}: ISupport) {
  return (
    <SSupport>
      <Head>
        <title>Поддержка</title>
      </Head>
      <h1>Поддержка</h1>
    </SSupport>
  );
}

export const getServerSideProps: GetServerSideProps<ISupport> = async (ctx) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};

const SSupport = styled.div`
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

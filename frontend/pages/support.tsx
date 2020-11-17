import Chat from "@/components/Chat";
import { getAsString } from "@/utils.ts/getAsString";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

interface ISupport {
  chatId: string | null;
}

export default function Support({ chatId }: ISupport) {
  return (
    <SSupport>
      <Head>
        <title>Поддержка</title>
      </Head>
      <Chat chatId={chatId} />
    </SSupport>
  );
}

export const getServerSideProps: GetServerSideProps<ISupport> = async (ctx) => {
  ensureAuth(ctx);
  const chatId = getAsString(ctx?.query?.id);
  return {
    props: {
      chatId: chatId || null,
    },
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

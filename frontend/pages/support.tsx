import Chat from "@/components/Chat";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { instanceWithSSR } from "@/api";
import { IChat, INotify } from "@/types/chat";

interface ISupport {
  chats: IChat[] | null;
  notifications: INotify[] | null;
}

export default function Support({ chats, notifications }: ISupport) {
  return (
    <SSupport>
      <Head>
        <title>Поддержка</title>
      </Head>
      <Chat chats={chats} notifications={notifications} />
    </SSupport>
  );
}

export const getServerSideProps: GetServerSideProps<ISupport> = async (ctx) => {
  ensureAuth(ctx);

  let chats: IChat[] | null = null;
  await instanceWithSSR(ctx)
    .get("/api/chat/")
    .then((response) => {
      chats = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  let notifications: INotify[] | null = null;
  await instanceWithSSR(ctx)
    .get("/api/notifications/")
    .then((response) => {
      notifications = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      chats: chats || null,
      notifications: notifications || null,
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

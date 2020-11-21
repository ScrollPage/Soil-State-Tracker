import { getMessages, getMessagesLoading } from "@/store/selectors";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatInfo from "./ChatInfo";
import ChatInner from "./ChatInner";
import ChatInput from "./ChatInput";
import { SChat, SChatLeft, SChatRight } from "./styles";
import { messageActions } from "@/store/actions/message";
import WebSocketInstance from "@/websocket";
import ChatList from "./ChatList";
import { IChat, INotify } from "@/types/chat";
import useSWR from "swr";
import { initialiseChat } from "@/utils.ts/initialiseChat";
import { useUser } from "@/utils.ts/useUser";
import { getAsString } from "@/utils.ts/getAsString";

interface IChatProps {
  chats: IChat[] | null;
  notifications: INotify[] | null;
}

const Chat: React.FC<IChatProps> = ({ chats, notifications }) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const loading = useSelector(getMessagesLoading);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const { fullName } = useUser();
  const { query } = useRouter();

  useEffect(() => {
    setChatId(getAsString(query.id));
  }, [query]);

  const getChatNameById = (chats: IChat[], id: string) => {
    return chats.find((chat: IChat) => chat.id === Number(id))?.user_name;
  };

  const { data: chatsData, error: chatsError } = useSWR("/api/chat/", {
    initialData: chats,
  });

  const { data: notifyData, error: notifyError } = useSWR(
    "/api/notifications/",
    {
      initialData: notifications,
    }
  );

  useEffect(() => {
    if (chatId) {
      dispatch(messageActions.setLoading());
      initialiseChat(chatId);
      return () => {
        WebSocketInstance.disconnect();
      };
    }
  }, [chatId]);

  const messageChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMessage(e.target.value);
  };

  const newChatMessageHandler = () => {
    const messageObject = {
      chatId: chatId,
      content: message,
      fullName: fullName,
    };
    WebSocketInstance.newChatMessage(messageObject);
    setMessage("");
  };

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      newChatMessageHandler();
    }
  };

  return (
    <SChat>
      <SChatLeft>
        {chatsData || notifyData ? (
          <ChatList data={chatsData} notify={notifyData} />
        ) : chatsError || notifyError ? (
          <h2>Ошибка в выводе чатов</h2>
        ) : (
          <h2>Загрузка...</h2>
        )}
      </SChatLeft>
      <SChatRight>
        {chatId && chatsData && (
          <>
            <ChatInfo name={getChatNameById(chatsData, chatId)} />
            <ChatInner messages={messages} loading={loading} />
            <ChatInput
              sendMessage={sendMessageHandler}
              messageChange={messageChangeHandler}
              message={message}
            />
          </>
        )}
      </SChatRight>
    </SChat>
  );
};

export default Chat;

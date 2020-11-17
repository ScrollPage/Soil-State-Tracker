import { getMessages, getMessagesLoading } from "@/store/selectors";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatInfo from "./ChatInfo";
import ChatInner from "./ChatInner";
import ChatInput from "./ChatInput";
import { SChat, SChatLeft, SChatRight } from "./styles";
import { messageActions } from "@/store/actions/message";
import WebSocketInstance from "@/websocket";
import ChatList from "./ChatList";
import { IChat } from "@/types/chat";

const data: IChat[] = [
  {
    id: 1,
    manager: "Володя",
    user_name: "Алексей Скворцов",
  },
  {
    id: 2,
    manager: "Володя",
    user_name: "Михаил Гучигей",
  },
  {
    id: 3,
    manager: "Володя",
    user_name: "Дональд Трамп",
  },
  {
    id: 4,
    manager: "Володя",
    user_name: "Пидор",
  },
];

interface IChatProps {
  chatId: string | null;
}

const Chat: React.FC<IChatProps> = ({ chatId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const loading = useSelector(getMessagesLoading);
  const { query } = useRouter();
  const [message, setMessage] = useState("");
  let messagesEnd = useRef<HTMLDivElement>();

  const getChatNameById = (id: number) => {
    return data.find((item) => item.id === Number(chatId))?.user_name;
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // useEffect(() => {
  //   dispatch(actionMessage.setLoading());

  //   initialiseChat();
  //   return () => {
  //     WebSocketInstance.leaveChat(user.userId, query.chatID);
  //     WebSocketInstance.disconnect();
  //   };
  // }, [query.chatID]);

  // const initialiseChat = (): void => {
  //   waitForSocketConnection(() => {
  //     WebSocketInstance.joinChat(user.userId, query.chatID);
  //     WebSocketInstance.fetchMessages(user.userId, query.chatID);
  //   });
  //   WebSocketInstance.connect(query.chatID);
  // };

  // const waitForSocketConnection = (callback: () => void): void => {
  //   setTimeout(function () {
  //     if (WebSocketInstance.state() === 1) {
  //       console.log("Connection is made");
  //       callback();
  //     } else {
  //       console.log("wait for connection...");
  //       waitForSocketConnection(callback);
  //     }
  //   }, 100);
  // };

  // const messageChangeHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ): void => {
  //   setMessage(e.target.value);
  // };

  // const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   if (message.trim() !== "") {
  //     const messageObject = {
  //       from: user.userId,
  //       content: message,
  //       chatId: query.chatID,
  //     };
  //     WebSocketInstance.newChatMessage(messageObject);
  //     setMessage("");
  //   }
  // };

  // const scrollToBottom = () => {
  //   // @ts-ignore: Unreachable code error
  //   messagesEnd.scrollIntoViewIfNeeded({ behavior: "smooth" });
  // };

  return (
    <SChat>
      <SChatLeft>
        <ChatList data={data} />
      </SChatLeft>
      <SChatRight>
        {chatId && (
          <>
            <ChatInfo name={getChatNameById(Number(chatId))} />
            <ChatInner />
            {/* <ChatInput /> */}
          </>
        )}
      </SChatRight>
    </SChat>
  );
};

export default Chat;

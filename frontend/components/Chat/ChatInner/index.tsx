import { IMessage } from "@/types/message";
import React, { useRef, useEffect } from "react";
import ChatMessage from "../ChatMessage";
import { SChatInner } from "./styles";
import scrollIntoViewIfNeeded from "scroll-into-view-if-needed";

const renderChatMessages = (data: IMessage[]) => {
  return data.map((item, index) => {
    return <ChatMessage key={`message__key__${index}`} message={item} />;
  });
};

const ChatInner: React.FC<{ messages: IMessage[]; loading: boolean }> = ({
  messages,
  loading,
}) => {
  let messagesEnd = useRef<HTMLDivElement>();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    // @ts-ignore: Unreachable code error
    messagesEnd.scrollIntoViewIfNeeded({ behavior: "smooth" });
  };

  return (
    <SChatInner>
      {!messages || loading ? (
        <p>Загрузка...</p>
      ) : messages.length === 0 ? (
        <p className="not-messages">У вас нет сообщений</p>
      ) : (
        renderChatMessages(messages)
      )}
      <div
        className="messages-end"
        // @ts-ignore: Unreachable code error
        ref={(el) => (messagesEnd = el)}
      />
    </SChatInner>
  );
};

export default ChatInner;

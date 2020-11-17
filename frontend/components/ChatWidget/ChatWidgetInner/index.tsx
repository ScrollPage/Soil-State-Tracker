import { createChat } from "@/store/actions/chat";
import { getChatId, getMessages, getMessagesLoading } from "@/store/selectors";
import scrollIntoViewIfNeeded from "scroll-into-view-if-needed";
import { IMessage } from "@/types/message";
import WebSocketInstance from "@/websocket";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "@/store/actions/message";
import { initialiseChat } from "@/utils.ts/initialiseChat";
import ChatInput from "@/components/Chat/ChatInput";
import ChatMessage from "@/components/Chat/ChatMessage";
import { useUser } from "@/utils.ts/useUser";
import Cookie from "js-cookie";
import {
  SChatWidget,
  SChatWidgetTop,
  SChatWidgetMessages,
  SChatWidgetClose,
} from "./styles";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface IChatWidgetInner {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatWidgetInner: React.FC<IChatWidgetInner> = ({ setIsOpen }) => {
  const dispatch = useDispatch();

  const chatId = useSelector(getChatId);
  const messages = useSelector(getMessages);
  const loading = useSelector(getMessagesLoading);

  const [message, setMessage] = useState("");

  let messagesEnd = useRef<HTMLDivElement>();

  const { fullName } = useUser();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatId) {
      Cookie.set("chatId", String(chatId));
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
      if (!chatId) {
        await dispatch(createChat());
        if (chatId) {
          initialiseChat(chatId, () => {
            newChatMessageHandler();
          });
        }
      } else {
        newChatMessageHandler();
      }
    }
  };

  const scrollToBottom = () => {
    // @ts-ignore: Unreachable code error
    messagesEnd.scrollIntoViewIfNeeded({ behavior: "smooth" });
  };

  return (
    <>
      <SChatWidget>
        <SChatWidgetClose onClick={() => setIsOpen(false)}>
          <CloseOutlined style={{ color: "#fff" }} />
        </SChatWidgetClose>
        <SChatWidgetTop>
          <h3>Напишите ваше сообщение</h3>
          <span>Операторы онлайн</span>
        </SChatWidgetTop>
        <SChatWidgetMessages>
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
        </SChatWidgetMessages>
        <ChatInput
          message={message}
          messageChange={messageChangeHandler}
          sendMessage={sendMessageHandler}
        />
      </SChatWidget>
    </>
  );
};

export default ChatWidgetInner;

const renderChatMessages = (data: IMessage[]) => {
  return data.map((item, index) => {
    return <ChatMessage key={`message__key__${index}`} message={item} />;
  });
};

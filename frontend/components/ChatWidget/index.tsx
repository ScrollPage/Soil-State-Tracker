import { createChat } from "@/store/actions/chat";
import { getChatId } from "@/store/selectors";
import { IMessage } from "@/types/message";
import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatInput from "../Chat/ChatInput";
import ChatMessage from "../Chat/ChatMessage";
import {
  SChatWidget,
  SChatWidgetBtn,
  SChatWidgetTop,
  SChatWidgetInner,
  SChatWidgetClose,
} from "./styles";

const data: IMessage[] = [
  {
    id: 1,
    full_name: "Володя",
    content: "Где мои бабка Дедди?",
    timestamp: "5 минут назад",
  },
  {
    id: 2,
    full_name: "Володя",
    content:
      "В хуй не дуешь живешь роскошно припеваючи набахал себе телочек с восточных стран",
    timestamp: "5 минут назад",
  },
  {
    id: 3,
    full_name: "Володя",
    content: "Порежу всю твою семью",
    timestamp: "5 минут назад",
  },
  {
    id: 4,
    full_name: "Гершпруд Рассел",
    content: "Ля Володя, не торопись",
    timestamp: "5 минут назад",
  },
  {
    id: 5,
    full_name: "Гершпруд Рассел",
    content: "Какие плюшки?",
    timestamp: "5 минут назад",
  },
  {
    id: 6,
    full_name: "Гершпруд Рассел",
    content: "Дай мне только доделать торт и нассать нассать",
    timestamp: "5 минут назад",
  },
  {
    id: 7,
    full_name: "Володя",
    content: "Даю тебе пару дней, голубчик",
    timestamp: "5 минут назад",
  },
  {
    id: 7,
    full_name: "Володя",
    content: "Говна поешь потом",
    timestamp: "5 минут назад",
  },
];

const renderChatMessages = (data: IMessage[]) => {
  return data.map((item, index) => {
    return <ChatMessage key={`message__key__${index}`} message={item} />;
  });
};

const ChatWidget = () => {
  const dispatch = useDispatch();

  const chatId = useSelector(getChatId);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  // chatId

  const messageChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (message.trim() !== "") {
      if (!chatId) {
        dispatch(createChat());
      }

      const messageObject = {
        chatId: 1,
        content: message,
        fullName: "Аноним",
      };
      // WebSocketInstance.newChatMessage(messageObject);
      setMessage("");
    }
  };

  return (
    <>
      {isOpen ? (
        <SChatWidget>
          <SChatWidgetClose onClick={() => setIsOpen(false)}>
            <CloseOutlined style={{ color: "#fff" }} />
          </SChatWidgetClose>
          <SChatWidgetTop>
            <h3>Напишите ваше сообщение</h3>
            <span>Операторы онлайн</span>
          </SChatWidgetTop>
          <SChatWidgetInner>{renderChatMessages(data)}</SChatWidgetInner>
          {/* <ChatInput /> */}
        </SChatWidget>
      ) : (
        <SChatWidgetBtn onClick={() => setIsOpen(true)}>
          Начать чат, мы онлайн!
        </SChatWidgetBtn>
      )}
    </>
  );
};

export default ChatWidget;

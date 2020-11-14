import { IMessage } from "@/types/message";
import React from "react";
import ChatMessage from "../ChatMessage";
import { SChatInner } from "./styles";

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

const ChatInner = () => {
  return <SChatInner>{renderChatMessages(data)}</SChatInner>;
};

export default ChatInner;

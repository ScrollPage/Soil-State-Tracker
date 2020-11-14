import React from "react";
import { SChatList, SChatSearch } from "./styles";
import { IChat } from "@/types/chat";
import ChatListItem from "./ChatListItem";

const renderChatListItems = (data: IChat[]) => {
  return data.map((item, key) => {
    return (
      <ChatListItem key={`chatlist__key__${item.user_name}`} chat={item} />
    );
  });
};

interface IChatList {
  data: IChat[];
}

const ChatList: React.FC<IChatList> = ({ data }) => {
  const error = false;
  return (
    <SChatList>
      <SChatSearch>Поиск</SChatSearch>
      {data ? (
        data.length !== 0 ? (
          renderChatListItems(data)
        ) : null
      ) : error ? (
        <h2>Ошибка в выводе чатов</h2>
      ) : (
        <h2>Загрузка...</h2>
      )}
    </SChatList>
  );
};

export default ChatList;

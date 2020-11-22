import React from "react";
import { SChatList, SChatSearch, SChatListInner } from "./styles";
import { IChat, INotify } from "@/types/chat";
import ChatListItem from "./ChatListItem";

const renderChatListItems = (data: IChat[]) => {
  return data.map((item, key) => {
    return (
      <ChatListItem
        key={`chat__key__${item.user_name}__${key}`}
        id={item.id}
        userName={item.user_name}
        isNotify={false}
      />
    );
  });
};

const renderNotifyListItems = (data: INotify[]) => {
  return data.map((item, key) => {
    return (
      <ChatListItem
        key={`notify__key__${item.user_name}__${key}`}
        id={item.chat}
        userName={item.user_name}
        isNotify={true}
      />
    );
  });
};

interface IChatList {
  data?: IChat[] | null;
  notify?: INotify[] | null;
}

const ChatList: React.FC<IChatList> = ({ data, notify }) => {
  return (
    <SChatList>
      <SChatSearch>Поиск</SChatSearch>
      <SChatListInner>
        {notify
          ? notify.length !== 0
            ? renderNotifyListItems(notify)
            : null
          : "Ошибка"}
        {data
          ? data.length !== 0
            ? renderChatListItems(data)
            : "У вас нет чатов"
          : "Ошибка"}
      </SChatListInner>
    </SChatList>
  );
};

export default ChatList;

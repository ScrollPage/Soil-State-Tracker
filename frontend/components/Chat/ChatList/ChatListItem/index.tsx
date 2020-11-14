import { IChat } from "@/types/chat";
import Link from "next/link";
import React from "react";
import { SChatListItem } from "./styles";

interface IChatListItem {
  chat: IChat;
}

const ChatListItem: React.FC<IChatListItem> = ({ chat }) => {
  return (
    <SChatListItem>
      <Link href={`/support/?id=${chat.id}`}>
        <a>
          <h4>{chat.user_name}</h4>
        </a>
      </Link>
    </SChatListItem>
  );
};

export default ChatListItem;

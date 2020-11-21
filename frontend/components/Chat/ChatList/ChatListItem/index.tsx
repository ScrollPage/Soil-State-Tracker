import { acceptChatMutate } from "@/mutates/chat";
import { acceptChat } from "@/store/actions/chat";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { SChatListItem } from "./styles";

interface IChatListItem {
  userName: string;
  id: number;
  isNotify: boolean;
}

const ChatListItem: React.FC<IChatListItem> = ({ userName, id, isNotify }) => {
  const dispatch = useDispatch();

  const accceptHandler = () => {
    dispatch(acceptChat(id));
    acceptChatMutate(id, userName);
  };

  return (
    <SChatListItem isNotify={isNotify}>
      {isNotify ? (
        <>
          <h4>{userName}</h4>
          <PlusCircleOutlined
            style={{ cursor: "pointer" }}
            onClick={accceptHandler}
          />
        </>
      ) : (
        <Link href={`/support/?id=${id}`}>
          <a>
            <h4>{userName}</h4>
          </a>
        </Link>
      )}
    </SChatListItem>
  );
};

export default ChatListItem;

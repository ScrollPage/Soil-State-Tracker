import React from "react";
import { SChatInfo } from "./styles";

interface IChatInfo {
  name?: string;
}

const ChatInfo: React.FC<IChatInfo> = ({ name }) => {
  return (
    <SChatInfo>
      <h3>{name}</h3>
    </SChatInfo>
  );
};

export default ChatInfo;

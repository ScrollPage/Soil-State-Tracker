import Container from "@/components/Container";
import Header from "@/components/Header";
import React, { useRef, useState, useEffect } from "react";
import Drower from "../Drower";
import { SPrivateLayout, SMain } from "./styles";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { authCheckState } from "@/store/actions/auth";
import ChatWidget from "@/components/ChatWidget";
import { messageActions, setMessages } from "@/store/actions/message";
import { IMessage, IMessages } from "@/types/message";
import WebSocketInstance from "@/websocket";
import { IProtection } from "@/types/protection";
import Pusher from "pusher-js";
import { useUser } from "@/utils.ts/useUser";

interface IPrivateLayout {
  children: React.ReactNode;
  protection: IProtection;
}

const PrivateLayout: React.FC<IPrivateLayout> = ({ children, protection }) => {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  let layout = useRef<HTMLDivElement>(null);

  const { userId } = useUser();

  useEffect(() => {
    if (protection.isStaff) {
      const pusher = new Pusher("cd195d4bd07dc0db154b", {
        cluster: "eu",
        // @ts-ignore: Unreachable code error
        encrypted: true,
      });
      const channel = pusher.subscribe(`notifications${userId}`);
    }
  }, [userId]);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(layout.current, {
        duration: 0.8,
        x: "-280px",
        ease: "power3.inOut",
      });
    } else {
      gsap.to(layout.current, {
        duration: 0.6,
        x: "0px",
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    dispatch(authCheckState());
    WebSocketInstance.addCallbacks(setMessagesHandler, addMessageHandler);
  }, []);

  const setMessagesHandler = (messages: IMessages) => {
    dispatch(setMessages(messages));
  };

  const addMessageHandler = (message: IMessage) => {
    dispatch(messageActions.addMessage(message));
  };

  return (
    <>
      <SPrivateLayout ref={layout}>
        <Header protection={protection} setMenuOpen={setMenuOpen} />
        <SMain>
          <Container>{children}</Container>
        </SMain>
      </SPrivateLayout>
      <Drower
        protection={protection}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
      />
      {!protection.isStaff && <ChatWidget />}
    </>
  );
};

export default PrivateLayout;

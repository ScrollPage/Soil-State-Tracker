import Container from "@/components/Container";
import Header from "@/components/Header";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Drower from "../Drower";
import { SPrivateLayout, SMain } from "./styles";
import gsap from "gsap";

interface IPrivateLayout {
  children: React.ReactNode;
  isAuth: boolean;
}

const PrivateLayout: React.FC<IPrivateLayout> = ({ children, isAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  let layout = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <SPrivateLayout ref={layout}>
        <Header setMenuOpen={setMenuOpen} isAuth={isAuth} />
        <SMain>
          <Container>{children}</Container>
        </SMain>
      </SPrivateLayout>
      <Drower setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
    </>
  );
};

export default PrivateLayout;

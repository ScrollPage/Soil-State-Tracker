import Container from "@/components/Container";
import Header from "@/components/Header";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Drower from "../Drower";
import { SPrivateLayout, SMain, SBackDrop } from "./styles";
import gsap from "gsap";

interface IPrivateLayout {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: IPrivateLayout) => {
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
        <Header setMenuOpen={setMenuOpen} />
        {/* {menuOpen && <SBackDrop onClick={() => setMenuOpen(false)} />} */}
        <SMain>
          <Container>{children}</Container>
        </SMain>
      </SPrivateLayout>
      <Drower setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
    </>
  );
};

export default PrivateLayout;

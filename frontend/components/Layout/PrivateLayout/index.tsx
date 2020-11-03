import Container from "@/components/Container";
import Header from "@/components/Header";
import React, { useRef, useState, useEffect } from "react";
import Drower from "../Drower";
import { SPrivateLayout, SMain } from "./styles";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { authCheckState } from "@/store/actions/auth";

interface IPrivateLayout {
  children: React.ReactNode;
  isAuth: boolean;
}

const PrivateLayout: React.FC<IPrivateLayout> = ({ children, isAuth }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  return (
    <>
      <SPrivateLayout ref={layout}>
        <Header isAuth={isAuth} setMenuOpen={setMenuOpen} />
        <SMain>
          <Container>{children}</Container>
        </SMain>
      </SPrivateLayout>
      <Drower isAuth={isAuth} setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
    </>
  );
};

export default PrivateLayout;

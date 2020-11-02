import { renderLinks } from "@/components/Header/HeaderMenu";
import { SButton } from "@/components/UI/Button";
import Logo from "@/components/UI/Logo";
import { CloseOutlined } from "@ant-design/icons";
import React, { SetStateAction, useEffect, useRef } from "react";
import { Dispatch } from "react";
import {
  SDrower,
  SDrowerInner,
  SDrowerItem,
  SDrowerClose,
  SDrowerPages,
  SDrowerAuth,
} from "./styles";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "@/store/actions/auth";
import { SItemBtn, SItemLink } from "@/components/Header/styles";

interface IDrower {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuOpen: boolean;
  isAuth: boolean;
}

const Drower: React.FC<IDrower> = ({ setMenuOpen, menuOpen, isAuth }) => {
  let drower = useRef(null);

  const { push } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (menuOpen) {
      gsap.to(drower.current, {
        duration: 0.8,
        css: {
          right: "0px",
        },
        ease: "power3.inOut",
      });
    } else {
      gsap.to(drower.current, {
        duration: 0.6,
        css: {
          right: "-280px",
        },
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  const goToRegisterHandler = () => {
    push({ pathname: "/register" }, undefined, {
      shallow: true,
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <SDrower ref={drower}>
      <SDrowerInner>
        <SDrowerClose>
          <SButton shape="circle" onClick={() => setMenuOpen(false)}>
            <CloseOutlined />
          </SButton>
        </SDrowerClose>
        <SDrowerItem>
          <Logo />
        </SDrowerItem>
        <SDrowerItem>
          <SDrowerPages>{renderLinks(isAuth, true)}</SDrowerPages>
          <SDrowerAuth>
            {!isAuth ? (
              <>
                <SItemBtn>
                  <SItemLink href={"/login"}>
                    <a>Вход</a>
                  </SItemLink>
                </SItemBtn>
                <SItemBtn>
                  <SButton shape="round" onClick={goToRegisterHandler}>
                    Регистрация
                  </SButton>
                </SItemBtn>
              </>
            ) : (
              <SItemBtn>
                <SButton shape="round" onClick={logoutHandler}>
                  Выйти
                </SButton>
              </SItemBtn>
            )}
          </SDrowerAuth>
        </SDrowerItem>
      </SDrowerInner>
    </SDrower>
  );
};

export default Drower;

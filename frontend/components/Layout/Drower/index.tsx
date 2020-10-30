import { renderLinks } from "@/components/Header/HeaderMenu";
import { SButton } from "@/components/UI/Button";
import Logo from "@/components/UI/Logo";
import { CloseOutlined } from "@ant-design/icons";
import React, { SetStateAction, useEffect, useRef } from "react";
import { Dispatch } from "react";
import { SDrower, SDrowerInner, SDrowerItem, SDrowerClose } from "./styles";
import gsap from "gsap";

interface IDrower {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuOpen: boolean;
}

const Drower: React.FC<IDrower> = ({ setMenuOpen, menuOpen }) => {
  let drower = useRef(null);

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

  return (
    <SDrower ref={drower}>
      <SDrowerInner>
        <SDrowerClose>
          <SButton
            shape="circle"
            onClick={() => setMenuOpen((state) => !state)}
          >
            <CloseOutlined />
          </SButton>
        </SDrowerClose>
        <SDrowerItem>
          <Logo />
        </SDrowerItem>
        <SDrowerItem>{renderLinks(true)}</SDrowerItem>
      </SDrowerInner>
    </SDrower>
  );
};

export default Drower;

import React, { Dispatch, SetStateAction } from "react";
import Container from "../Container";
import { SButton } from "../UI/Button";
import HeaderMenu from "./HeaderMenu";
import { SHeader, SInner, SItem, SItemLink, SItemBtn } from "./styles";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../UI/Logo";
import { useRouter } from "next/router";

interface IHeader {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setMenuOpen }: IHeader) => {
  const { push } = useRouter();

  const goToRegisterHandler = () => {
    push({ pathname: "/register" }, undefined, {
      shallow: true,
    });
  };

  return (
    <SHeader>
      <Container fluid>
        <SInner>
          <SItem>
            <Logo />
          </SItem>
          <SItem>
            <HeaderMenu />
          </SItem>
          <SItem>
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
          </SItem>
          <SItem>
            <SItemBtn>
              <SButton
                shape="circle"
                onClick={() => setMenuOpen((state) => !state)}
              >
                <MenuOutlined />
              </SButton>
            </SItemBtn>
          </SItem>
        </SInner>
      </Container>
    </SHeader>
  );
};

export default Header;

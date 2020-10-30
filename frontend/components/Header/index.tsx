import React, { Dispatch, SetStateAction } from "react";
import Container from "../Container";
import { SButton } from "../UI/Button";
import HeaderMenu from "./HeaderMenu";
import { SHeader, SInner, SItem, SItemLink, SItemBtn } from "./styles";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../UI/Logo";

interface IHeader {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setMenuOpen }: IHeader) => {
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
              <SItemLink>Вход</SItemLink>
            </SItemBtn>
            <SItemBtn>
              <SButton shape="round">Регистрация</SButton>
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

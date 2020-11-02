import React, { Dispatch, SetStateAction } from "react";
import Container from "../Container";
import { SButton } from "../UI/Button";
import HeaderMenu from "./HeaderMenu";
import { SHeader, SInner, SItem, SItemLink, SItemBtn } from "./styles";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../UI/Logo";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/store/actions/auth";

interface IHeader {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  isAuth: boolean;
}

const Header = ({ setMenuOpen, isAuth }: IHeader) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const goToRegisterHandler = () => {
    push({ pathname: "/register" }, undefined, {
      shallow: true,
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <SHeader>
      <Container fluid>
        <SInner>
          <SItem>
            <Logo />
          </SItem>
          <SItem>
            <HeaderMenu isAuth={isAuth} setMenuOpen={setMenuOpen} />
          </SItem>
          <SItem>
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

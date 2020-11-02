import Link from "next/link";
import { useRouter } from "next/router";
import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import { SHeaderMenu, SNavLink } from "./styles";

interface INavitem {
  path: string;
  name: string;
  isPrivate: boolean;
}

const navItems: INavitem[] = [
  { isPrivate: false, path: "/", name: "Главная" },
  { isPrivate: false, path: "/about", name: "О продукте" },

  { isPrivate: true, path: "/", name: "Главная" },
  { isPrivate: true, path: "/about", name: "О продукте" },
  { isPrivate: true, path: "/data", name: "Данные" },
  { isPrivate: true, path: "/manage", name: "Управление" },
  { isPrivate: true, path: "/support", name: "Поддержка" },
];

export const renderLinks = (
  isAuth: boolean,
  isDrower?: boolean,
  setMenuOpen?: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();

  const menuOpenHadler = () => {
    if (isDrower) {
      setMenuOpen(false);
    }
  };

  return navItems
    .filter((item) => item.isPrivate === isAuth)
    .map((item, index) => (
      <Link key={`navlink__key__${item.path}__${index}`} href={item.path}>
        <SNavLink
          isDrower={isDrower}
          active={router.pathname === item.path}
          onClick={menuOpenHadler}
        >
          {item.name}
        </SNavLink>
      </Link>
    ));
};

interface IHeaderMenu {
  isAuth: boolean;
}

const HeaderMenu = ({ isAuth }: IHeaderMenu) => {
  return <SHeaderMenu>{renderLinks(isAuth, false)}</SHeaderMenu>;
};

export default HeaderMenu;

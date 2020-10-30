import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SHeaderMenu, SNavLink } from "./styles";

interface INavitem {
  path: string;
  name: string;
}

const navItems: INavitem[] = [
  { path: "/", name: "Главная" },
  { path: "/data", name: "Данные" },
];

export const renderLinks = (isDrower?: boolean) => {
  const router = useRouter();
  return navItems.map((item, index) => (
    <Link key={`navlink__key__${item.path}__${index}`} href={item.path}>
      <SNavLink isDrower={isDrower} active={router.pathname === item.path}>
        {item.name}
      </SNavLink>
    </Link>
  ));
};

const HeaderMenu = () => {
  return <SHeaderMenu>{renderLinks()}</SHeaderMenu>;
};

export default HeaderMenu;

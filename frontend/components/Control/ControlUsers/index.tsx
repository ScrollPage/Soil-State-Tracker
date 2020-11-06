import { ICompany } from "@/types/company";
import React from "react";
import { SControlUsers } from "./styles";

interface IControlUsers {
  companyItem: ICompany;
}

const ControlUsers = ({companyItem}:IControlUsers) => {
  return <SControlUsers></SControlUsers>;
};

export default ControlUsers;

import { ICompany } from "@/types/company";
import React from "react";
import { SControlSensors } from "./styles";

interface IControlSensors {
  companyItem: ICompany;
}

const ControlSensors = ({ companyItem }: IControlSensors) => {
  return <SControlSensors></SControlSensors>;
};

export default ControlSensors;

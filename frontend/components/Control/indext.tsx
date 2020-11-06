import { ICompany } from "@/types/company";
import React from "react";
import ControlSensors from "./ControlSensors";
import ControlUsers from "./ControlUsers";
import { SControl, SControlTitle, SControlMain } from "./styles";

interface IControl {
  companyItem: ICompany;
}

const Control = ({ companyItem }: IControl) => {
  return (
    <SControl>
      <SControlTitle>Управление компанией {companyItem.name}</SControlTitle>
      <SControlMain>
        <ControlSensors companyItem={companyItem} />
        <ControlUsers companyItem={companyItem} />
      </SControlMain>
    </SControl>
  );
};

export default Control;

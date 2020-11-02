import { ICompany } from "@/types/company";
import { Card } from "antd";
import React from "react";
import { SCompanyItem } from "./styles";

interface ICompanyItemFC {
  companyItem: ICompany;
}

const CompanyItem = ({ companyItem }: ICompanyItemFC) => {
  return (
    <SCompanyItem>
      <Card
        title="Default size card"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </SCompanyItem>
  );
};

export default CompanyItem;

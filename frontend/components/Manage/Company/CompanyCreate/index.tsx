import React from "react";
import { SCompanyCreate } from "./styles";
import { Card } from "antd";
import CompanyCreateForm from "./CompanyCreateForm";

const CompanyCreate = () => {
  return (
    <SCompanyCreate>
      <Card title="Создать компанию" style={{ width: 300 }}>
        <CompanyCreateForm />
      </Card>
    </SCompanyCreate>
  );
};

export default CompanyCreate;

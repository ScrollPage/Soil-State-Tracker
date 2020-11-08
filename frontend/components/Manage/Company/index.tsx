import { ICompany } from "@/types/company";
import React from "react";
import useSWR from "swr";
import CompanyItem from "./CompanyItem";
import { SCompany, SCompanyTitle, SCompanyMain } from "./styles";
import CompanyCreate from "./CompanyCreate";

interface ICompanyFC {
  company: ICompany[] | null;
}

const renderCompanyItems = (company: ICompany[]) => {
  return company.map((companyItem) => (
    <CompanyItem
      key={`companyItem__key__${companyItem.name}`}
      companyItem={companyItem}
    />
  ));
};

const Company = ({ company }: ICompanyFC) => {
  const { data, error } = useSWR("/api/company/", {
    initialData: company,
  });

  return (
    <SCompany>
      <SCompanyTitle>Ваши компании</SCompanyTitle>
      <SCompanyMain>
        {data ? (
          data.length !== 0 ? (
            renderCompanyItems(data)
          ) : null
        ) : error ? (
          <h2>Ошибка в выводе компаний</h2>
        ) : (
          <h2>Загрузка...</h2>
        )}
        <CompanyCreate />
      </SCompanyMain>
    </SCompany>
  );
};

export default Company;

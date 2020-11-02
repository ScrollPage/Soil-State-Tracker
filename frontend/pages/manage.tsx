import { instanceWithSSR } from "@/api";
import Company from "@/components/Manage/Company";
import { ICompany } from "@/types/company";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

interface IManage {
  company?: ICompany[];
}

export default function Manage({ company }: IManage) {
  console.log(company);

  return (
    <SManage>
      <Head>
        <title>Управление</title>
      </Head>
      <Company company={company} />
    </SManage>
  );
}

export const getServerSideProps: GetServerSideProps<IManage> = async (ctx) => {
  ensureAuth(ctx);
  let company: ICompany[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/company/`)
    .then((response) => {
      company = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return {
    props: {
      company: company || null,
    },
  };
};

const SManage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

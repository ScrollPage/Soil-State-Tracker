import { ICompany } from '@/types/company';
import { mutate } from 'swr';

export const addCompanyMutate = (url: string, name: string, info: string, companyUrl: string) => {
  const companyItem: ICompany = {
    id: 0,
    info,
    is_admin: true,
    name,
    url: companyUrl,
    workers: []
  }
  mutate(url, async (company: ICompany[]) => {
    if (company) {
      return [...company, companyItem];
    }
  }, false);
}

export const deleteCompanyMutate = (url: string, id: number) => {
  mutate(url, async (company: ICompany[]) => {
    if (company) {
      return company.filter(companyitem => companyitem.id !== id);
    }
  }, false);
}

export const changeCompanyMutate = (triggerUrl: string, id: number, name: string, info: string, url: string) => {
  mutate(triggerUrl, async (company: ICompany[]) => {
    if (company) {
      const index = company.findIndex(item => item.id === id);
      let newCompany = [...company];
      newCompany[index] = {
        ...company[index],
        name,
        info,
        url
      };
      return newCompany;
    }
  }, false);
}
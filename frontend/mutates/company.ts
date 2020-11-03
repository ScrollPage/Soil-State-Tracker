import { ICompany } from '@/types/company';
import { mutate } from 'swr';

export const addCompanyMutate = (url: string, name: string, info: string) => {
  const companyItem = {
    name, info
  }
  mutate(url, async (company: ICompany[]) => {
    if (company) {
      return [companyItem, ...company];
    }
  }, false);
}
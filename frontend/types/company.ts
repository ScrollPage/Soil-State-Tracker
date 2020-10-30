import { IClient } from './client';

export interface ICompany {
  id: number;
  name: string;
  url: string;
  admin: string;
  workers: IClient[];
}
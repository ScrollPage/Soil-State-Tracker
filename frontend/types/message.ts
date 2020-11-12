export type IMessages = IMessage[]

export interface IMessage {
  author: number;
  content: string;
  first_name: string;
  id: number;
  last_name: string;
  timestamp: string;
  small_avatar?: string;
}
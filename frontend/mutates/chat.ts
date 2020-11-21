import { INotify } from '@/types/chat';
import { IChat } from '@/types/chat';
import { mutate, trigger } from 'swr';

export const acceptChatMutate = (notifyUrl: string, chatUrl: string, chatId: number, userName: string) => {
  mutate(notifyUrl, async (notify: INotify[]) => {
    if (notify) {
      return notify.filter(item => item.chat !== chatId);
    }
  }, false);

  mutate(chatUrl, async (chats: IChat[]) => {
    if (chats) {
      return [...chats, {
        id: chatId,
        user_name: userName
      }];
    }
  }, false);
}

export const addNotifyChatMutate = (notifyUrl: string, chatId: number, userName: string) => {
  mutate(notifyUrl, async (notify: INotify[]) => {
    if (notify) {
      return [...notify, {
        chat: chatId,
        user_name: userName
      }]
    }
  }, false);
  trigger(notifyUrl);
}

export const removeNotifyChatMutate = (notifyUrl: string, chatId: number) => {
  mutate(notifyUrl, async (notify: INotify[]) => {
    if (notify) {
      return notify.filter(item => item.chat !== chatId);
    }
  }, false);
  trigger(notifyUrl);
}


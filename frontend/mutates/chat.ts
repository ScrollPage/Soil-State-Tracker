import { INotify } from '@/types/chat';
import { IChat } from '@/types/chat';
import { mutate, trigger } from 'swr';

export const acceptChatMutate = (chatId: number, userName: string) => {
  const notifyUrl = "/api/notifications/";
  console.log('out')
  mutate(notifyUrl, async (notify: INotify[]) => {
    console.log('inner')
    if (notify) {
      console.log('mutate')
      return notify.filter(item => item.chat !== chatId);
    }
  }, false);
  // trigger(notifyUrl);

  const chatUrl = "/api/chat/";
  mutate(chatUrl, async (chats: IChat[]) => {
    if (chats) {
      return [...chats, {
        id: chatId,
        user_name: userName
      }];
    }
  }, false);
  // trigger(chatUrl);
}
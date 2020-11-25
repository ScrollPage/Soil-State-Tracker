import { INotify, IChat } from '@/types/chat';
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
        user_name: userName,
        is_read: true
      }];
    }
  }, false);
}

export const notifyUnreadChatMutate = async (chatUrl: string, chatId: number) => {
  await mutate(chatUrl, async (chats: IChat[]) => {
    if (chats) {
      const index = chats.findIndex(chat => chat.id === chatId);
      if (index === -1) {
        return
      }
      const newChats = [...chats];
      newChats[index] = {
        ...chats[index],
        is_read: false
      }
      return newChats;
    }
  })
  trigger(chatUrl);
}

export const addNotifyChatMutate = async (notifyUrl: string, chatId: number, userName: string) => {
  await mutate(notifyUrl, async (notify: INotify[]) => {
    if (notify) {
      return [...notify, {
        chat: chatId,
        user_name: userName
      }]
    }
  }, false);
  trigger(notifyUrl);
}

export const removeNotifyChatMutate = async (notifyUrl: string, chatId: number) => {
  await mutate(notifyUrl, async (notify: INotify[]) => {
    if (notify) {
      return notify.filter(item => item.chat !== chatId);
    }
  }, false);
  trigger(notifyUrl);
}


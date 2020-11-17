import Cookie from 'js-cookie';
import { show } from '@/store/actions/alert';
import { instance, instanceWithOutHeaders } from '@/api';
import { ThunkType } from '@/types/thunk';

export const chatActions = {
  setChat: (chatId: number, manager: string) => ({ type: 'SET_CHAT_ID', chatId, manager } as const)
}

interface ICreateChatRes {
  id: number;
  manager: string;
  user_name: string;
}

export const createChat = (): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  const thisInstance = token ? instance(token) : instanceWithOutHeaders;
  await thisInstance
    .post('/api/chat/', {})
    .then(res => {
      const data: ICreateChatRes = res.data;
      dispatch(chatActions.setChat(data.id, data.manager));
      dispatch(show('Вы успешно создали чат!', 'success'));
    })
    .catch(err => {
      dispatch(show('Ошибка создания чата!', 'warning'));
    });
};
import Cookie from 'js-cookie';
import { show } from '@/store/actions/alert';
import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';

export const chatActions = {
  setChatId: (chatId: number) => ({ type: 'SET_CHAT_ID', chatId } as const)
}

interface ICreateChatRes {
  id: number;
  manager: string;
  user_name: string;
}

export const createChat = (): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  await instance(token)
    .post('/api/chat/', {})
    .then(res => {
      const data: ICreateChatRes = res.data;
      dispatch(chatActions.setChatId(data.id));
      dispatch(show('Вы успешно создали чат!', 'success'));
    })
    .catch(err => {
      dispatch(show('Ошибка создания чата!', 'warning'));
    });
};
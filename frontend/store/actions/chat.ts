import { IChat } from '@/types/chat';
import Cookie from 'js-cookie';
import { show } from '@/store/actions/alert';
import { instance, instanceWithOutHeaders } from '@/api';
import { ThunkType } from '@/types/thunk';

export const createChat = (callback: (chatId: number) => void): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  const thisInstance = token ? instance(token) : instanceWithOutHeaders;
  await thisInstance
    .post('/api/chat/', {})
    .then(res => {
      const data: IChat = res.data;
      callback(data.id);
      dispatch(show('Вы успешно создали чат!', 'success'));
    })
    .catch(err => {
      dispatch(show('Ошибка создания чата!', 'warning'));
    });
};

export const acceptChat = (chatId: number): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  await instance(token)
    .post(`/api/chat/${chatId}/`, {})
    .then(res => {
      dispatch(show('Вы успешно приняли чат!', 'success'));
    })
    .catch(err => {
      dispatch(show('Ошибка принятия чата!', 'warning'));
    });
};


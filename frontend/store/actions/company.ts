import { ThunkType } from '@/types/thunk';
import { show } from '@/store/actions/alert';
import { instance } from '@/api';
import Cookie from 'js-cookie';

export const addCompany = (url: string, name: string, info: string): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  await instance(token)
    .post(url, {
      name,
      info
    })
    .then(res => {
      dispatch(show('Вы успешно добавили компанию!', 'success'));
    })
    .catch(err => {
      dispatch(show('Ошибка добавления компании!', 'warning'));
    });
};
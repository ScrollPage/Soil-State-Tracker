import { Dispatch, SetStateAction } from 'react';
import { instance, instanceWithOutHeaders } from '@/api';
import { ThunkType } from '@/types/thunk';
import Cookie from 'js-cookie';
import { show } from './alert';
import Router from 'next/router';

export const authSignup = (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  setStep: Dispatch<SetStateAction<number>>
): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/users/ ', {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    })
    .then(res => {
      Cookie.set('email', email);
      Cookie.set('password', password);
      dispatch(show('Вы успешно создали аккаунт!', 'success'));
      setStep(e => e + 1);
    })
    .catch(err => {
      dispatch(show('Ошибка в создании аккаунта!', 'warning'));
    });
};

export const emailActivate = (token: string): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/api/activate/', {
      token,
    })
    .then(res => {
      dispatch(show('Активация прошла успешно!', 'success'));
    })
    .catch(err => {
      dispatch(show('Ошибка активации!', 'warning'));
    });
};

export const authLogin = (email: string, password: string, isRouterPush: boolean): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/jwt/create/', {
      email,
      password,
    })
    .then(res => {
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 24);

      Cookie.set('token', res.data.access);
      Cookie.set('expirationDate', expirationDate);

      dispatch(checkAuthTimeout(3600 * 24));
      if (isRouterPush) {
        dispatch(authInfo(true));
        dispatch(show('Вы успешно вошли!', 'success'));
      } else {
        dispatch(authInfo(false));
      }
    })
    .catch(err => {
      dispatch(show('Ошибка входа, возможно у вас неверный логин или пароль!', 'warning'));
    });
};

export const authInfo = (isRouterPush: boolean): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  await instance(token)
    .get('/auth/users/me/')
    .then(res => {
      Cookie.set('firstName', res.data.first_name);
      Cookie.set('lastName', res.data.last_name);
      Cookie.set('userId', res.data.id);
      Cookie.set('email', res.data.email);

      if (isRouterPush) {
        Router.push({ pathname: '/data' }, undefined, { shallow: true });
      }

      console.log('Информация успешно занесена в куки');
    })
    .catch(err => {
      dispatch(show('Ошибка при взятии информации о пользователе!', 'warning'));
    });
};

export const logout = () => (dispatch: any) => {
  Router.push({ pathname: '/' }, undefined, { shallow: true });
  // if (Router.query.chatID !== undefined) {
  //     WebSocketInstance.disconnect();
  // }
  Cookie.remove('token');
  Cookie.remove('expirationDate');
  Cookie.remove('firstName');
  Cookie.remove('lastName');
  Cookie.remove('userId');
  Cookie.remove('email');
  dispatch(show('Вы успешно вышли!', 'success'));
};

export const checkAuthTimeout = (expirationTime: number): ThunkType => dispatch =>
  setTimeout(() => dispatch(logout()), expirationTime * 1000);

export const authCheckState = (): ThunkType => dispatch => {
  const token = Cookie.get('token');

  if (token === undefined) {
    dispatch(logout());
  } else {
    const date: any = Cookie.get('expirationDate');
    const expirationDate = new Date(date);

    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};

export const authCheckActivate = (
  setStep: Dispatch<SetStateAction<number>>
): ThunkType => async dispatch => {
  const email = Cookie.get('email');
  await instanceWithOutHeaders
    .get(`/api/activity/${email}/`)
    .then(res => {
      if (res.data?.is_active === true) {
        const password = Cookie.get('password');
        dispatch(authLogin(email, password, false));
        setStep(e => e + 1);
        dispatch(show('Ваш аккаунт подтвержден!', 'success'));
      }
      dispatch(show('Ваш аккаунт не подтвержден!', 'warning'));
    })
    .catch(err => {
      dispatch(show('Ошибка в подтверждении аккаунта!', 'warning'));
    });
};

export const setAuthActivate = (isActivate: boolean) => ({
  type: 'SET_AUTH_ACTIVATE', isActivate
} as const)




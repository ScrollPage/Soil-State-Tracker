import { chatReducer } from './chat';
import { messageReducer } from './message';
import { modalReducer } from './modal';
import { combineReducers } from 'redux';
import { alertReducer } from './alert';

export let rootReducer = combineReducers({
  alert: alertReducer,
  modal: modalReducer,
  message: messageReducer,
  chat: chatReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;



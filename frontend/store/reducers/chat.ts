import Cookie from 'js-cookie';
import { PropertiesType } from '@/types/action';
import { chatActions } from './../actions/chat';

const initialState = {
  chatId: Cookie.get('chatId') != null ? Number(Cookie.get('chatId')) : null
};

type InititalStateType = typeof initialState;

type ChatActionsTypes = ReturnType<PropertiesType<typeof chatActions>>

export const chatReducer = (state = initialState, action: ChatActionsTypes): InititalStateType => {
  switch (action.type) {
    case 'SET_CHAT_ID':
      return { ...state, chatId: action.chatId }
    default:
      return state;
  }
}


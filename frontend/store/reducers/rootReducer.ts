import { combineReducers } from 'redux';

export let rootReducer = combineReducers({
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;



import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

export type RootReducerType = ReturnType<typeof rootReducer>
export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
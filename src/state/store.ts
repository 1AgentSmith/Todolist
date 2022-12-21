import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

//@ts-ignore
window.store = store
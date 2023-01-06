import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type AllActionTodolistType =
    RemoveTodolistACType |
    ChangeTodolistFilterACType |
    AddTodolistACType |
    ChangeTodolistTitleACType

export let todolistId1 = v1();
export let todolistId2 = v1();

let initialState: Array<TodolistType> = []
export const todolistReducer = (state: Array<TodolistType> = initialState,
                                action: AllActionTodolistType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(
                todolist => todolist.id !== action.payload.todolistID
            )
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todolist =>
                todolist.id === action.payload.todolistID
                    ? {
                        ...todolist,
                        filter: action.payload.filterValue,
                    }
                    : todolist
            )
        }
        case 'ADD-TODOLIST': {
            return [
                {
                    id: action.payload.todolistID,
                    title: action.payload.todolistTitle,
                    filter: 'all',
                },
                ...state,
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist =>
                todolist.id === action.payload.todolistID
                    ? {
                        ...todolist,
                        title: action.payload.changedTodolistTitle,
                    }
                    : todolist
            )
        }
        default:
            return state
    }
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID,
        }
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistID: string, filterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistID,
            filterValue
        }
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (todolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistTitle,
            todolistID: v1()
        },
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, changedTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID,
            changedTodolistTitle,
        },
    } as const
}




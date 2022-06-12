import {FilterValuesType, TodolistType} from "../App";

type AllActionTodolistType =
    RemoveTodolistACType |
    ChangeTodolistFilterACType |
    AddTodolistTypeAC

export const TodolistReducer = (state: Array<TodolistType>,
                                action: AllActionTodolistType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(todolist => todolist.id === action.payload.todolistID ? {
                ...todolist,
                filter: action.payload.filterValue
            } : todolist)
        }
        case "ADD-TODOLIST": {
            return [{id: action.payload.todolistID, title: action.payload.todolistTitle, filter: 'all'}, ...state]
        }
    }
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
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

export type AddTodolistTypeAC = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (todolistID : string, todolistTitle: string)=> {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistTitle,
            todolistID
        }
    } as const
}


import {FilterValuesType, TodolistType} from "../App";

type AllActionTodolistType =
    RemoveTodolistACType |
    ChangeTodolistFilterACType |
    AddTodolistACType |
    ChangeTodolistTitleACType

export const todolistReducer = (state: Array<TodolistType>,
                                action: AllActionTodolistType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.payload.todolistID)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(todolist =>
                todolist.id === action.payload.todolistID ? {
                    ...todolist,
                    filter: action.payload.filterValue
                } : todolist)
        }
        case "ADD-TODOLIST": {
            return [
                {
                    id: action.payload.todolistID,
                    title: action.payload.todolistTitle,
                    filter: 'all'
                },
                ...state
            ]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(todolist =>
                todolist.id === action.payload.todolistID ? {
                    ...todolist,
                    title: action.payload.changedTodolistTitle
                } : todolist)
        }
    }
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
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

type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (todolistID: string, todolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistTitle,
            todolistID
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, changedTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID,
            changedTodolistTitle,
        }
    } as const
}




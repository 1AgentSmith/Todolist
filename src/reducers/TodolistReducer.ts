import {FilterValuesType, TodolistType} from "../App";

type AllActionTodolistType = RemoveTodolistACType | ChangeTodolistFilterACType

export const TodolistReducer = (state: Array<TodolistType>,
                                action: AllActionTodolistType) => {
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
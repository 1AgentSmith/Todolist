import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistID: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType> = [
    // {id: todolistId1, title: 'What to learn', filter: 'all'},
    // {id: todolistId2, title: 'What to buy', filter: 'all'},
]
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            /*            // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
                        setTodolists(todolists.filter(tl => tl.id != id));
                        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
                        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
                        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                        setTasks({...tasks})*/
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST': {
            /*            let newTodolistId = v1();
                        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
                        setTodolists([newTodolist, ...todolists]);
                        setTasks({
                            ...tasks,
                            [newTodolistId]: []
                        })*/

            return [
                ...state,
                {id: action.todolistID, title: action.title, filter: 'all'}
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            /*            // найдём нужный todolist
                        const todolist = todolists.find(tl => tl.id === id);
                        if (todolist) {
                            // если нашёлся - изменим ему заголовок
                            todolist.title = title;
                            setTodolists([...todolists])*/
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            /*            const todolist = state.find(tl => tl.id === action.id);
                        if (todolist) {
                            // если нашёлся - изменим ему заголовок
                            todolist.filter = action.filter;
                        }*/
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (title: string, id: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistID: id,
    }
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: todolistId
    }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: filter,
        id: todolistId
    }
}

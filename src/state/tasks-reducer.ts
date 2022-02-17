import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from './todolists-reducer';

export type RemoveTaskAcType = ReturnType<typeof removeTasksAC>
export type AddTasksACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    RemoveTaskAcType
    | AddTasksACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType


const initialState: TasksStateType = {
    // [todolistId1]: [
    //     {id: v1(), title: 'HTML/CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: 'Milk', isDone: true},
    //     {id: v1(), title: 'React book', isDone: true},
    // ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            /*            //достанем нужный массив по todolistId:
                        let todolistTasks = tasks[todolistId];
                        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
                        tasks[todolistId] = todolistTasks.filter(t => t.id != taskID);
                        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                        setTasks({...tasks})*/
            return {...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            /*            let task = {id: v1(), title: title, isDone: false};
                        //достанем нужный массив по todolistId:
                        let todolistTasks = tasks[todolistId];
                        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
                        tasks[todolistId] = [task, ...todolistTasks];
                        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                        setTasks({...tasks})*/
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            /*            //достанем нужный массив по todolistId:
                        let todolistTasks = tasks[todolistId];
                        // найдём нужную таску:
                        let task = todolistTasks.find(t => t.id === id);
                        //изменим таску, если она нашлась
                        if (task) {
                            task.isDone = isDone;
                            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                            setTasks({...tasks})*/
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.taskID ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            /*            //достанем нужный массив по todolistId:
                        let todolistTasks = tasks[todolistId];
                        // найдём нужную таску:
                        let task = todolistTasks.find(t => t.id === id);
                        //изменим таску, если она нашлась
                        if (task) {
                            task.title = newTitle;
                            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                            setTasks({...tasks})*/
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.taskID ? {
                    ...m,
                    title: action.newTitle
                } : m)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTasksAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK', taskID, todolistID
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK', title, todolistId
    } as const
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistId
    } as const
}
export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE', taskID, newTitle, todolistId
    } as const
}

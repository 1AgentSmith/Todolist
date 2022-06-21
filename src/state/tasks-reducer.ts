import {v1} from "uuid";
import {TaskStateType} from "../App";
import {todolistId1, todolistId2} from "./todolist-reducer";

type AllTypeAC =
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistTasksArrayAcType |
    RemoveTodolistTasksArrayACType

let initialState: TaskStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
}
export const tasksReducer = (state: TaskStateType = initialState,
                             action: AllTypeAC): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].filter(
                        (task) => task.id !== action.payload.taskID
                    )
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: [...state[action.payload.todolistID],
                    {
                        id: v1(),
                        title: action.payload.title,
                        isDone: false
                    }
                ]
            }
        }
        case "CHANGE-TASK-STATUS" : {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(
                    (task) => task.id === action.payload.taskID ?
                        {...task, isDone: !action.payload.isDone} : task
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(
                    (task) =>
                        task.id === action.payload.taskID ?
                            {...task, title: action.payload.changedTaskTitle} : task
                )
            }
        }
        case "ADD-TODOLIST-TASKS-ARRAY": {
            return {
                ...state,
                [action.payload.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST-ARRAY-TASKS": {
            let copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState
        }
        default:
            return state
    }
}


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string,
                             taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskID,
            todolistID,
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string,
                          title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistID,
            title,
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string,
                                   taskID: string,
                                   isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskID,
            isDone,
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string,
                                  taskID: string,
                                  changedTaskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID,
            taskID,
            changedTaskTitle,
        }
    } as const
}

type AddTodolistTasksArrayAcType = ReturnType<typeof addTodolistTasksArrayAC>
export const addTodolistTasksArrayAC = (todolistID: string) => {
    return {
        type: 'ADD-TODOLIST-TASKS-ARRAY',
        payload: {
            todolistID,
        }
    } as const
}

type RemoveTodolistTasksArrayACType = ReturnType<typeof removeTodolistArrayTasksAC>
export const removeTodolistArrayTasksAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST-ARRAY-TASKS',
        payload: {
            todolistID,
        }
    } as const
}


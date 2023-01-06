import {v1} from "uuid";
import {TaskStateType} from "../App";
import {AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";

type AllTypeAC =
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    RemoveTodolistACType |
    AddTodolistACType

let initialState: TaskStateType = {}
export const tasksReducer = (state: TaskStateType = initialState,
                             action: AllTypeAC): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter((task) => task.id !== action.payload.taskID)
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
                        {...task, isDone: action.payload.isDone} : task
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
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST": {
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

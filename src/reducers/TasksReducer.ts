import {v1} from "uuid";
import {TaskStateType} from "../App";

export const TasksReducer = (state: TaskStateType, action: AllTypeAC): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.taskID)
            }
        }
        case "ADD-TASK": {

            return {
                ...state,
                [action.payload.todolistID]:[...state[action.payload.todolistID], {id: v1(), title: action.payload.title, isDone: false}]
            }
        }
        case "CHANGE-TASK-STATUS" : {
            return state
            //     .map(mTask => mTask.id === action.payload.taskID ? {
            //     ...mTask,
            //     isDone: !action.payload.isDone
            // } : mTask)
        }
        case 'CHANGE-TASK-TITLE': {
            return state
            //     .map(mTask => mTask.id === action.payload.taskID ? {
            //     ...mTask,
            //     title: action.payload.changedTaskTitle
            // } : mTask)
        }

        default:
            return state
    }
}

type AllTypeAC = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskID,
            todolistID,
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistID,
            title,
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskID,
            isDone,
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export const ChangeTaskTitleAC = (taskID: string, changedTaskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskID,
            changedTaskTitle,
        }
    } as const
}

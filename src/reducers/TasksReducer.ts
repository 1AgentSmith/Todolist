import {TaskType} from "../components/Todolist";
import {v1} from "uuid";

export const TasksReducer = (state: Array<TaskType>, action: AllTypeAC): Array<TaskType> => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return state.filter(f => f.id !== action.payload.id)
        }
        case "ADD-TASK": {

            return [{id: v1(), title: action.payload.title, isDone: false}, ...state]
        }
        case "CHANGE-TASK-STATUS" : {
            return state.map(mTask=> mTask.id === action.payload.taskID ? {...mTask, isDone: !action.payload.isDone}: mTask)
        }
        case 'CHANGE-TASK-TITLE': {
            return state.map(mTask=> mTask.id === action.payload.taskID ? {...mTask, title: action.payload.newTaskTitle}: mTask)
        }
        default:
            return state
    }
}

type AllTypeAC = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title
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
export const ChangeTaskTitleAC = (taskID: string, newTaskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskID,
            newTaskTitle,
        }
    } as const
}

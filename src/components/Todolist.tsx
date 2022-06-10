import React from 'react';
import {FilterValuesType} from '../App';
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    todolistID: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, taskTitle: string) => void
}

export function Todolist(props: PropsType) {

    const addTaskFromProps = (title: string) => {
        props.addTask(props.todolistID, title);
    }

    const onClickFilterHandler = (todolistID: string, value: FilterValuesType) => {
        props.changeFilter(todolistID, value)
    }

    const onClickHandler = (tId: string) => props.removeTask(props.todolistID, tId)

    const onChangeTaskStatusHandler = (taskID: string, isDone: boolean) => {
        debugger
        props.changeTaskStatus(taskID, isDone)
    }

    const onChangeTaskTitle = (mapID: string, changedTaskTitle: string) => {
        props.changeTaskTitle(mapID, changedTaskTitle)
    }

    return <div>
        <h3>{props.title}</h3>

        <AddItemForm buttonName={'Add'} callBack={(title) => addTaskFromProps(title)}/>

        <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={() => onChangeTaskStatusHandler(t.id, t.isDone)}/>
                            <EditableSpan title={t.title}
                                          callBack={(changedTaskTitle) => onChangeTaskTitle(t.id, changedTaskTitle)}/>
                            <button onClick={() => onClickHandler(t.id)}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={() => onClickFilterHandler(props.todolistID, 'all')}>All</button>
            <button onClick={() => onClickFilterHandler(props.todolistID, 'active')}>Active</button>
            <button onClick={() => onClickFilterHandler(props.todolistID, 'completed')}>Completed</button>
        </div>
    </div>
}
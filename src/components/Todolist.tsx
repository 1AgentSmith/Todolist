import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, taskTitle: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")


    const addTaskFromProps = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskFromProps();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const onClickHandler = (tId: string) => props.removeTask(tId)
    const onChangeTaskStatusHandler = (taskID: string, isDone: boolean) => {
        debugger
        props.changeTaskStatus(taskID, isDone)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskFromProps}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeTaskTitle = (newTaskTitle: string) => {
                        props.changeTaskTitle(t.id, newTaskTitle)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={() => onChangeTaskStatusHandler(t.id, t.isDone)}/>
                            <EditableSpan title={t.title}
                                          callBack={onChangeTaskTitle}/>
                            <button onClick={() => onClickHandler(t.id)}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

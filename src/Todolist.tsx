import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Tasks} from './Tasks';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistsID:string,taskId: string) => void
    changeFilter: (value: FilterValuesType,todolistsID:string) => void
    addTask: (todolistsID:string,title: string) => void
    changeTaskStatus: (todolistsID:string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistsID:string
    removeTodolist:(todolistsID: string)=>void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistsID,title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.todolistsID);
    const onActiveClickHandler = () => props.changeFilter("active",props.todolistsID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistsID);

    return <div>
        <h3 >{props.title}
        <button onClick={()=>props.removeTodolist(props.todolistsID)}>X</button>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return(
                        <Tasks t={t}
                               changeTaskStatus={props.changeTaskStatus}
                               removeTask={props.removeTask}
                               todolistsID={props.todolistsID}/>
                    )
                })
            }
        </ul>
{/*        const onClickHandler = () => props.removeTask(props.todolistsID,t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistsID,t.id, e.currentTarget.checked);
    }

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
        </li>*/}
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

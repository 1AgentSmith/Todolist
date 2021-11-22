import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';

type TasksPropsType = {
    removeTask: (todolistsID:string,taskId: string) => void
    changeTaskStatus: (todolistsID:string,taskId: string, isDone: boolean) => void
    todolistsID:string
    t: TaskType
}

export const Tasks = (props: TasksPropsType) => {
    const onClickHandler = () => props.removeTask(props.todolistsID,props.t.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistsID,props.t.id, e.currentTarget.checked);
    }
    return(
        <li key={props.t.id} className={props.t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={props.t.isDone}/>
            <span>{props.t.title}</span>
            <button onClick={onClickHandler}>x</button>
        </li>
    )
}
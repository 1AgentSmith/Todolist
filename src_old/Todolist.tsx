import React from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import Input from './components/Input';


export type  TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (newTitle: string) => void,
}


export function Todolist(props: PropsType) {
    const changeFilterHandlerAll = () => {
        props.changeFilter('All')
    }
    const changeFilterHandlerCompleted = () => {
        props.changeFilter('Completed')
    }
    const changeFilterHandlerActive = () => {
        props.changeFilter('Active')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <Input callBack={(newTitle: string) => props.addTask(newTitle)}/>
            <ul>
                {props.tasks.map((t) => {
                    const removeTaskHandler = () => props.removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <Button callBack={removeTaskHandler} value={'x'}/>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button callBack={changeFilterHandlerAll} value={'All'}/>
                <Button callBack={changeFilterHandlerActive} value={'Active'}/>
                <Button callBack={changeFilterHandlerCompleted} value={'Completed'}/>
            </div>
        </div>
    )
}
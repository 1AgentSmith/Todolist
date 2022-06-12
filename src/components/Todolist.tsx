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
    todolistTitle: string
    todolistID: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, taskTitle: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, todolistTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onClickAddTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title);
    }

    const onClickFilterHandler = (todolistID: string, value: FilterValuesType) => {
        props.changeFilter(todolistID, value)
    }

    const onClickHandler = (tId: string) => props.removeTask(props.todolistID, tId)

    const onChangeTaskStatusHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistID, taskID, isDone)
    }

    const onChangeTaskTitleHandler = (mapID: string, changedTaskTitle: string) => {
        props.changeTaskTitle(props.todolistID, mapID, changedTaskTitle)
    }

    const onClickRemoveTodolistHandler = (todolistID: string) => {
        props.removeTodolist(todolistID)
    }
    const onChangeTodolistTitleHandler = (changedTodolistTitle: string) => {
        props.changeTodolistTitle(props.todolistID, changedTodolistTitle)
    }
    return <div>
        <h3>
            <EditableSpan title={props.todolistTitle}
                          callBack={
                              (changedTodolistTitle) => onChangeTodolistTitleHandler(changedTodolistTitle)
                          }
            />
            <button onClick={() => onClickRemoveTodolistHandler(props.todolistID)}>X</button>
        </h3>
        <AddItemForm buttonName={'Add'}
                     callBack={(title) => onClickAddTaskHandler(title)}/>

        <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={() =>
                                       onChangeTaskStatusHandler(t.id, t.isDone)}
                            />
                            <EditableSpan title={t.title}
                                          callBack={(changedTaskTitle) =>
                                              onChangeTaskTitleHandler(t.id, changedTaskTitle)}
                            />
                            <button onClick={() => onClickHandler(t.id)}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={() =>
                onClickFilterHandler(props.todolistID, 'all')}>All
            </button>
            <button onClick={() =>
                onClickFilterHandler(props.todolistID, 'active')}>Active
            </button>
            <button onClick={() =>
                onClickFilterHandler(props.todolistID, 'completed')}>Completed
            </button>
        </div>
    </div>
}

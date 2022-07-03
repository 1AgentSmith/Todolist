import React from 'react';
import {FilterValuesType} from '../App';
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../state/todolist-reducer";
import {AppRootStateType} from "../state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistTitle: string
    todolistID: string
    filterValue: FilterValuesType
}

export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])


    let filteredTasks = tasks
    if (props.filterValue === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (props.filterValue === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }
    return <div>
        <h3>
            <EditableSpan title={props.todolistTitle}
                          callBack={
                              (changedTodolistTitle) => dispatch(changeTodolistTitleAC(props.todolistID, changedTodolistTitle))
                          }
            />
            <button onClick={() => dispatch(removeTodolistAC(props.todolistID))}>X</button>
        </h3>
        <AddItemForm buttonName={'Add'}
                     callBack={(title) => dispatch(addTaskAC(props.todolistID, title))}/>

        <ul>
            {
                filteredTasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={() =>
                                       dispatch(changeTaskStatusAC(props.todolistID, t.id, t.isDone))}
                            />
                            <EditableSpan title={t.title}
                                          callBack={(changedTaskTitle) =>
                                              dispatch(changeTaskTitleAC(props.todolistID, t.id, changedTaskTitle))}
                            />
                            <button onClick={() => dispatch(removeTaskAC(props.todolistID, t.id))}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={() =>
                dispatch(changeTodolistFilterAC(props.todolistID, 'all'))}>All
            </button>
            <button onClick={() =>
                dispatch(changeTodolistFilterAC(props.todolistID, 'active'))}>Active
            </button>
            <button onClick={() =>
                dispatch(changeTodolistFilterAC(props.todolistID, 'active'))}>Completed
            </button>
        </div>
    </div>
}

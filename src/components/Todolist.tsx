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
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


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
            <IconButton aria-label="delete">
                <DeleteIcon onClick={() => dispatch(removeTodolistAC(props.todolistID))}/>
            </IconButton>

        </h3>
        <AddItemForm buttonName={'+'}
                     callBack={(title) => dispatch(addTaskAC(props.todolistID, title))}/>

        <ul>
            {
                filteredTasks.map(t => {
                    return (
                        <li key={t.id}>
                            <Checkbox defaultChecked size={'small'} color={'success'} checked={t.isDone} onChange={() =>
                                dispatch(changeTaskStatusAC(props.todolistID, t.id, !t.isDone))}/>
                            <EditableSpan title={t.title}
                                          callBack={(changedTaskTitle) =>
                                              dispatch(changeTaskTitleAC(props.todolistID, t.id, changedTaskTitle))}
                            />
                            <IconButton aria-label="delete">
                                <DeleteIcon fontSize={'small'} onClick={() => dispatch(removeTaskAC(props.todolistID, t.id))}/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button variant={props.filterValue === 'all' ? 'contained' : 'outlined'} color={'info'} onClick={() =>
                dispatch(changeTodolistFilterAC(props.todolistID, 'all'))}>All
            </Button>
            <Button variant={props.filterValue === 'active' ? 'contained' : 'outlined'} color={'warning'} onClick={() =>
                dispatch(changeTodolistFilterAC(props.todolistID, 'active'))}>Active
            </Button>
            <Button variant={props.filterValue === 'completed' ? 'contained' : 'outlined'} color={'success'}
                    onClick={() =>
                        dispatch(changeTodolistFilterAC(props.todolistID, 'completed'))}>Completed
            </Button>
        </div>
    </div>
}

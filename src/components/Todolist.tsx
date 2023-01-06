import React, {memo, useCallback} from 'react';
import {FilterValuesType} from '../App';
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {
    addTaskAC
} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../state/todolist-reducer";
import {AppRootStateType} from "../state/store";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";


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

export const Todolist = memo((props: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    }, [dispatch, props.todolistID])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID, title))
    }, [dispatch, props.todolistID])

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
                          callBack={changeTodolistTitle}
            />
            <IconButton aria-label="delete" onClick={() => dispatch(removeTodolistAC(props.todolistID))}>
                <DeleteIcon/>
            </IconButton>

        </h3>
        <AddItemForm callBack={addTask}/>

        <ul>
            {
                filteredTasks.map(t => {
                    return (
                        <Task task={t} todolistID={props.todolistID} key={t.id}/>
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
})

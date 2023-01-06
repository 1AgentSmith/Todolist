import {Checkbox, IconButton} from "@mui/material";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {memo} from "react";
import {useDispatch} from "react-redux";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistID: string
}
export const Task = memo(({task, todolistID}: TaskPropsType) => {
    const {id, title, isDone} = task
    const dispatch = useDispatch()

    return (
        <div key={id}>
            <Checkbox size={'small'}
                      key={id}
                      color={'success'}
                      checked={isDone}
                      onChange={() => dispatch(changeTaskStatusAC(todolistID, id, !isDone))}/>
            <EditableSpan title={title}
                          callBack={(changedTaskTitle) =>
                              dispatch(changeTaskTitleAC(todolistID, title, changedTaskTitle))}
            />
            <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(todolistID, id))}>
                <DeleteIcon fontSize={'small'}/>
            </IconButton>
        </div>
    )
})
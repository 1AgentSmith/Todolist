import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {blue, green} from '@mui/material/colors';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onClickHandler = (id: string) => props.removeTask(id, props.id)
    const onChangeHandler = (id: string, check: boolean) => {
        let newIsDoneValue = check;
        props.changeTaskStatus(id, newIsDoneValue, props.id);
    }
    const onTitleChangeHandler = (id: string, newValue: string) => {
        props.changeTaskTitle(id, newValue, props.id);
    }

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton aria-label="delete">
                <Delete onClick={removeTodolist} />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} title={'+'} label={'Outlined'}/>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox  defaultChecked onChange={(e)=>onChangeHandler(t.id, e.currentTarget.checked)} checked={t.isDone} sx={{
                            color: blue[800],
                            '&.Mui-checked': {
                                color: green[800],
                            },
                        }}/>
                        <EditableSpan value={t.title} onChange={(newValue)=>onTitleChangeHandler(t.id, newValue)} />
                        <IconButton aria-label="delete">
                            <Delete onClick={()=>onClickHandler(t.id)} />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'} style={{margin: '2px'}} color="success" onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'} style={{margin: '2px'}} color="secondary" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'} style={{margin: '2px'}} onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}



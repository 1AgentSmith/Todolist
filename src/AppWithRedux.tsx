import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from './state/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducerType} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<RootReducerType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<RootReducerType, TasksStateType>(state => state.tasks)


    const removeTask = useCallback((taskID: string, todolistId: string) => {
        dispatch(removeTasksAC(taskID, todolistId))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [])

    const changeTodolistFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistId))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistId))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))

    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [])

    const addTodolist = useCallback((title: string) => {
        const id = v1()
        dispatch(addTodolistAC(title, id))
    }, [])

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '10px', margin: '0 0 0 10px'}}>
                    <AddItemForm addItem={addTodolist} title={'Add'} label={'Enter name task'}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        return <Grid item>
                            <Paper style={{padding: '10px', margin: '0 0 0 20px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeTodolistFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;

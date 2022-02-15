import React, {useReducer, useState} from 'react';
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
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from './state/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML/CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React book', isDone: true},
        ],

    })

    function removeTask(taskID: string, todolistId: string) {
        dispatchToTasksReducer(removeTasksAC(taskID, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        /*        let task = {id: v1(), title: title, isDone: false};
                //достанем нужный массив по todolistId:
                let todolistTasks = tasks[todolistId];
                // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
                tasks[todolistId] = [task, ...todolistTasks];
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                setTasks({...tasks});*/

        // setTasks({...tasks, [todolistId]:[{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }

    function changeTodolistFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(value, todolistId))
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskID, isDone, todolistId))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskID, newTitle, todolistId))
    }

    function removeTodolist(todolistId: string) {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, title))
    }

    function addTodolist(title: string) {
        const id = v1()
        dispatchToTodolistsReducer(addTodolistAC(title, id))
        dispatchToTasksReducer(addTodolistAC(title, id))

    }

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
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px', margin: '0 0 0 20px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
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

export default App;

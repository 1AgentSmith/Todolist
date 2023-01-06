import React, {useCallback} from 'react'
import './App.css'
import {TaskType, Todolist} from './components/Todolist'
import {addTodolistAC} from './state/todolist-reducer'
import {AddItemForm} from './components/AddItemForm'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import ButtonAppBar from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log('App is called')
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(
        state => state.todoLists
    )

    const addTodolist = useCallback((todolistTitle: string) => {
        // let idForNewTodolist = v1()
        dispatch(addTodolistAC(todolistTitle))
        // dispatch(addTodolistTasksArrayAC(idForNewTodolist))
    }, [dispatch])

    return (
        <div className='App'>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container={true} style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todoLists.map((todolist: TodolistType) => {
                        return (
                            <Grid item>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <Todolist
                                        todolistTitle={todolist.title}
                                        filterValue={todolist.filter}
                                        todolistID={todolist.id}
                                    />
                                </Paper>

                            </Grid>
                        )
                    })}
                </Grid>

            </Container>

        </div>
    )
}

export default App

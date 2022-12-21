import React from 'react'
import './App.css'
import {TaskType, Todolist} from './components/Todolist'
import {v1} from 'uuid'
import {addTodolistTasksArrayAC} from './state/tasks-reducer'
import {addTodolistAC} from './state/todolist-reducer'
import {AddItemForm} from './components/AddItemForm'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'

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
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(
        state => state.todoLists
    )

    const addTodolist = (todolistTitle: string) => {
        let idForNewTodolist = v1()
        dispatch(addTodolistAC(idForNewTodolist, todolistTitle))
        dispatch(addTodolistTasksArrayAC(idForNewTodolist))
    }

    return (
        <div className='App'>
            <AddItemForm
                buttonName={'+ create new list'}
                callBack={todolistTitle => addTodolist(todolistTitle)}
            />
            {todoLists.map((todolist: TodolistType) => {
                return (
                    <Todolist
                        key={todolist.id}
                        todolistTitle={todolist.title}
                        filterValue={todolist.filter}
                        todolistID={todolist.id}
                    />
                )
            })}
        </div>
    )
}

export default App

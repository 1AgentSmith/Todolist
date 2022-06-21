import React from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {
    addTaskAC, addTodolistTasksArrayAC, changeTaskStatusAC,
    changeTaskTitleAC, removeTaskAC,
} from "./state/tasks-reducer";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC, todolistId1, todolistId2,
} from "./state/todolist-reducer";
import {AddItemForm} from "./components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const dispatch = useDispatch()
    // const todolists: Array<TodolistType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'}
    // ]
    // const tasks = {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    // }
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    //------------------------------------------Tasks functions-------------------------------------------------
    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, changedTaskTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, changedTaskTitle))
    }
    //------------------------------------------------------------------------------------------------------------

    // -------------------TodoList functions-------------------------------------------------------------------
    const changeTodolistFilter = (todolistID: string,
                                  filterValue: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, filterValue))
    }
    const addTodolist = (todolistTitle: string) => {
        let idForNewTodolist = v1()
        dispatch(addTodolistAC(idForNewTodolist, todolistTitle))
        dispatch(addTodolistTasksArrayAC(idForNewTodolist))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const changeTodolistTitle = (todolistID: string,
                                 todolistTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, todolistTitle))
    }

    return (
        <div className="App">
            <AddItemForm buttonName={'+ create new list'} callBack={(todolistTitle) => addTodolist(todolistTitle)}/>
            {todolists.map((todolist: TodolistType) => {
                let tasksForTodolist = tasks[todolist.id]
                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter(task => task.isDone)
                }

                return (
                    <Todolist key={todolist.id}
                              todolistTitle={todolist.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeTodolistFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              todolistID={todolist.id}
                              removeTodolist={removeTodolist}
                              changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;

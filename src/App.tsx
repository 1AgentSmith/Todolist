import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {addTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC, TasksReducer} from "./reducers/TasksReducer";
import {changeTodolistFilterAC, TodolistReducer} from "./reducers/TodolistReducer";

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
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, todolistDispatch] = useReducer(TodolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, tasksDispatch] = useReducer(TasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
    });

    const removeTask = (todolistID: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todolistID, taskID))
    }

    const addTask = (todolistID: string, title: string) => {
        tasksDispatch(addTaskAC(todolistID, title))
    }

    const changeTodolistFilter = (todolistID: string, filterValue: FilterValuesType) => {
        todolistDispatch(changeTodolistFilterAC(todolistID, filterValue))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        tasksDispatch(ChangeTaskStatusAC(taskID, isDone))
    }

    const changeTaskTitle = (taskID: string, changedTaskTitle: string) => {
        tasksDispatch(ChangeTaskTitleAC(taskID, changedTaskTitle))
    }

    return (
        <div className="App">
            {todolists.map(todolist => {
                //!!!ПОВТОРИТЬ ФИЛЬТРЫ!!!(почему именно здесь пишется условие. Да бы 2 с половиной часа были потрачены не напрасно)
                let tasksForTodolist = tasks[todolist.id]
                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter(task => task.isDone)
                }
                return (
                    <Todolist key={todolist.id}
                              title={todolist.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeTodolistFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              todolistID={todolist.id}
                    />
                )
            })}
        </div>
    );
}

export default App;

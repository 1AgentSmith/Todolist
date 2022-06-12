import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {
    addTaskAC,
    addTodolistTasksArrayAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {AddItemForm} from "./components/AddItemForm";

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

    let [todolists, todolistDispatch] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
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
    //------------------------------------------Tasks functions-------------------------------------------------
    const removeTask = (todolistID: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todolistID, taskID))
    }

    const addTask = (todolistID: string, title: string) => {
        tasksDispatch(addTaskAC(todolistID, title))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        tasksDispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, changedTaskTitle: string) => {
        tasksDispatch(changeTaskTitleAC(todolistID, taskID, changedTaskTitle))
    }
    //------------------------------------------------------------------------------------------------------------

    // -------------------TodoList functions-------------------------------------------------------------------
    const changeTodolistFilter = (todolistID: string,
                                  filterValue: FilterValuesType) => {
        todolistDispatch(changeTodolistFilterAC(todolistID, filterValue))
    }
    const addTodolist = (todolistTitle: string) => {
        let idForNewTodolist = v1()
        todolistDispatch(addTodolistAC(idForNewTodolist, todolistTitle))
        tasksDispatch(addTodolistTasksArrayAC(idForNewTodolist))
    }
    const removeTodolist = (todolistID: string) => {
        todolistDispatch(removeTodolistAC(todolistID))
    }
    const changeTodolistTitle = (todolistID: string,
                                 todolistTitle: string) => {
        todolistDispatch(changeTodolistTitleAC(todolistID, todolistTitle))
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

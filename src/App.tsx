import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {addTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC, TasksReducer} from "./reducers/TasksReducer";
import {changeFilterAC, FilterReducer} from "./reducers/FilterReducer";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, tasksDispatch] = useReducer(TasksReducer, [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        tasksDispatch(removeTaskAC(id))
    }

    function addTask(title: string) {
        tasksDispatch(addTaskAC(title))
    }

    function changeFilter(value: FilterValuesType) {
        filterDispatch(changeFilterAC(value));
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        tasksDispatch(ChangeTaskStatusAC(taskID, isDone))
    }
    const changeTaskTitle = (taskID: string, taskTitle: string)=> {
        tasksDispatch(ChangeTaskTitleAC(taskID, taskTitle))
    }

    let [filter, filterDispatch] = useReducer(FilterReducer, "all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
            />
        </div>
    );
}

export default App;

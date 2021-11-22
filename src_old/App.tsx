import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},

    ])

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: true}
        setTasks([newTask, ...tasks])
    }

    let [filter, setFilter] = useState<FilterValuesType>('All')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        console.log(value)
        setFilter(value)
    }

    if (filter === 'Active') {
        tasks = tasks.filter(f => !f.isDone)
    }
    if (filter === 'Completed') {
        tasks = tasks.filter(f => f.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

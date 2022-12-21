import {
    addTaskAC,
    addTodolistTasksArrayAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, removeTodolistArrayTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TaskStateType} from '../App';
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let newId: string
let startState: TaskStateType
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    newId = v1()

    startState = {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC(todolistId2, '2'))
    expect(endState[todolistId2][1].id).toBe('3')
    expect(endState[todolistId1][1].id).toBe('2')
});

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC(todolistId2, "Bitcoin"))

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][3].id).toBeDefined();
    expect(endState[todolistId2][3].title).toBe('Bitcoin');
    expect(endState[todolistId2][2].title).toBe('tea');
    expect(endState[todolistId2][3].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC(todolistId2, '2', false);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1][1].isDone).toBe(true);
    expect(endState[todolistId2][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC(todolistId2, '2', 'true');

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1][1].title).toBe('JS');
    expect(endState[todolistId2][1].title).toBe('true');
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistTasksArrayAC(newId);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(keys[1]).toBe(todolistId2)
    // @ts-ignore
    expect(keys[2]).toBe(newKey)
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistArrayTasksAC(todolistId2);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId2]).not.toBeDefined();
});

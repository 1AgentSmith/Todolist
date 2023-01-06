// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistReducer
// } from "./todolist-reducer";
// import {v1} from "uuid";
// import {TodolistType} from "../App";
//
// let todolistId1: string
// let todolistId2: string
// let todolistId3: string
// let newId: string
// let startState: Array<TodolistType>
//
// beforeEach(() => {
//     todolistId1 = v1()
//     todolistId2 = v1()
//     todolistId3 = v1()
//     newId = v1()
//
//     startState = [
//         {id: todolistId1, title: 'What`s up!', filter: 'all'},
//         {id: todolistId2, title: 'Hello!', filter: 'all'},
//         {id: todolistId3, title: 'Hi!', filter: 'all'},
//     ]
// })
//
// test('correct todolist should be removed', () => {
//     const endState = todolistReducer(startState, removeTodolistAC(todolistId3))
//     expect(endState.length).toBe(2)
//     expect(endState[3]).toBe(undefined)
//     expect(endState[0].id).toBe(todolistId1)
// })
//
// test('correct todolist should be added', () => {
//     const endState = todolistReducer(startState, addTodolistAC(newId, 'New todolist'))
//
//     expect(endState.length).toBe(4)
//     expect(endState[0].id).toBe(newId)
//     expect(endState[0].title).toBe('New todolist')
//
// })
//
// test('correct todolist should change its name', () => {
//     const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, 'Changed todolist title'));
//
//     expect(endState[0].title).toBe("What`s up!");
//     expect(endState[1].title).toBe('Changed todolist title');
// });
//
// test('correct filter of todolist should be changed', () => {
//     const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1, 'active'))
//
//     expect(endState[0].filter).toBe('active')
// })
//
// test('new array should be added', () => {
//     const endState = todolistReducer(startState, addTodolistAC(newId, 'New todolist'))
//
//     expect(endState[0].id).toBe(newId)
//     expect(endState[0].title).toBe('New todolist')
// })
//
// test('correct todolist Id should be deleted', () => {
//     const endState = todolistReducer(startState, removeTodolistAC(todolistId2))
//
//     expect(endState.length).toBe(2)
// })


import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


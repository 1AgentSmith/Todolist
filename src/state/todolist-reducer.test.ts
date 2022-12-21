import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";
import {TodolistType} from "../App";

let todolistId1: string
let todolistId2: string
let todolistId3: string
let newId: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    todolistId3 = v1()
    newId = v1()

    startState = [
        {id: todolistId1, title: 'What`s up!', filter: 'all'},
        {id: todolistId2, title: 'Hello!', filter: 'all'},
        {id: todolistId3, title: 'Hi!', filter: 'all'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId3))
    expect(endState.length).toBe(2)
    expect(endState[3]).toBe(undefined)
    expect(endState[0].id).toBe(todolistId1)
})

test('correct todolist should be added', () => {
    const endState = todolistReducer(startState, addTodolistAC(newId, 'New todolist'))

    expect(endState.length).toBe(4)
    expect(endState[0].id).toBe(newId)
    expect(endState[0].title).toBe('New todolist')

})

test('correct todolist should change its name', () => {
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, 'Changed todolist title'));

    expect(endState[0].title).toBe("What`s up!");
    expect(endState[1].title).toBe('Changed todolist title');
});

test('correct filter of todolist should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1, 'active'))

    expect(endState[0].filter).toBe('active')
})

test('new array should be added', () => {
    const endState = todolistReducer(startState, addTodolistAC(newId, 'New todolist'))

    expect(endState[0].id).toBe(newId)
    expect(endState[0].title).toBe('New todolist')
})

test('correct todolist Id should be deleted', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId2))

    expect(endState.length).toBe(2)
})
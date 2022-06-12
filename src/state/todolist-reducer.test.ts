import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";
import {TodolistType} from "../App";

test('correct todolist should be removed', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title:'What`s up!', filter: 'all'},
        {id: todolistId2, title:'Hello!', filter: 'all'},
        {id: todolistId3, title:'Hi!', filter: 'all'},
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistId3))
    expect(endState.length).toBe(2)
    expect(endState[3]).toBe(undefined)
    expect(endState[0].id).toBe(todolistId1)

})

test('correct todolist should be added', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title:'What`s up!', filter: 'all'},
        {id: todolistId2, title:'Hello!', filter: 'all'},
    ]

    const endState = todolistReducer(startState, addTodolistAC(todolistId3, 'New todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe(todolistId3)
    expect(endState[0].title).toBe('New todolist')

})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, 'Changed todolist title'));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe('Changed todolist title');
});

test('correct filter of todolist should be changed',()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1, 'active'))

    expect(endState[0].filter).toBe('active')
})

export const todolistId3 = v1();
test('new array should be added',()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, addTodolistAC(todolistId3, 'New todolist'))

    expect(endState[0].id).toBe(todolistId3)
    expect(endState[0].title).toBe('New todolist')
})

test('correct todolist Id should be deleted',()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistId2))

    expect(endState[0].id).toBe(todolistId1)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1]).toBe(undefined)
})
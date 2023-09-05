"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Create the Todo", createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    const updateTodo = TODOS.findIndex((todos) => todos.id === id);
    if (!updateTodo) {
        res.status(404).json({ message: "No todo Find" });
    }
    TODOS[updateTodo] = new todo_1.Todo(TODOS[updateTodo].id, text);
    res.status(201).json({ message: "Todo update", TODOS });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const { id } = req.params;
    const deleteTodo = TODOS.findIndex((todo) => todo.id !== id);
    TODOS.splice(deleteTodo, 1);
    res.status(201).json({ message: "Delete Todo ", todos: TODOS });
};
exports.deleteTodo = deleteTodo;

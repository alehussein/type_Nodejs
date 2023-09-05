import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Create the Todo", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body as {text: string};
  const updateTodo = TODOS.findIndex((todos) => todos.id === id);
  if (!updateTodo) {
    res.status(404).json({ message: "No todo Find" });
  }
  TODOS[updateTodo] = new Todo(TODOS[updateTodo].id, text);
  res.status(201).json({ message: "Todo update", TODOS });
};

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const { id } = req.params;
  const deleteTodo = TODOS.findIndex((todo) => todo.id !== id);
  TODOS.splice(deleteTodo, 1)

  res.status(201).json({ message: "Delete Todo " , todos: TODOS});
};

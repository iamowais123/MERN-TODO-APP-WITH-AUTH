import express from "express";
import { createTodo, deleteTodo, editTodo, getAllTodos, getTodo, toggleTheme } from "../controllers/todoController.js";

const router = express.Router();

// create todo
router.post("/", createTodo);

// getAllTodos
router.get("/", getAllTodos);

// delete todo
router.delete("/:id", deleteTodo);

// edit todo
router.put("/:id", editTodo);

// get todo by id
router.get("/:id", getTodo);

// toggle todo
router.put("/:id/toggle",toggleTheme)

export default router;
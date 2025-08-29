import todos from "../models/todoModel.js";

// 400 -> for bad request
// 404 -> agar resources db me nahi mila
// 403 -> unauthorised access
// 500 -> server error
// 200 -> success

export const createTodo = async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res
      .status(400)
      .json({ message: "todo is required", success: false, data: null });
  }

  const user = req.user;
  if (!user) {
    return res
      .status(404)
      .json({ message: "user does not exist", success: false, data: null });
  }

  try {
    const oneTodo = await todos.insertOne({
      todo,
      userId: user._id,
    });

    return res
      .status(201)
      .json({ message: "todo was saved", success: true, data: oneTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", success: false, data: null });
  }
};

export const getAllTodos = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(400)
      .json({ message: "user does not exists", success: false, data: null });
  }

  const { _id: id } = user;

  try {
    const allTodos = await todos.find({ userId: id });

    return res.status(200).json({
      message: "request succesfull",
      success: true,
      data: allTodos || [],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", success: false, data: null });
  }
};

export const deleteTodo = async (req, res) => {
  console.log("deletdd");
  const user = req.user;

  if (!user) {
    return res
      .status(400)
      .json({ message: "user does not exists", success: false, data: null });
  }

  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "id is required", success: false, data: null });
  }

  try {
    const todo = await todos.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "todo does not exist", success: false, data: null });
    }

    if (todo.userId.toString() === user._id.toString()) {
      await todos.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "succesfully deleted", success: true, data: null });
    }

    return res
      .status(403)
      .json({ message: "you dont have access to this todos" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const editTodo = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(400)
      .json({ message: "user does not exists", success: false, data: null });
  }

  const { newTodo } = req.body;

  if (!newTodo) {
    return res
      .status(400)
      .json({ message: "new todo is requires", success: false, data: null });
  }

  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "id is required", success: false, data: null });
  }

  try {
    const todo = await todos.findById(id);

    if (!todo) {
      return res
        .status(404)
        .json({ message: "todo does not found", success: false, data: null });
    }

    if (todo.userId.toString() === user._id.toString()) {
      todo.todo = newTodo;
      await todo.save(); // this is importnant nahi to database me save nahi hoga
      return res.status(200).json({
        message: "todo updated succesfully",
        success: true,
        data: todo,
      });
    }

    return res.status(403).json({
      message: "you dont have access to change this todo",
      success: false,
      data: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", success: false, data: null });
  }
};

export const getTodo = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(400)
      .json({ message: "user does not exists", success: false, data: null });
  }

  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "id is required", success: false, data: null });
  }

  try {
    const todo = await todos.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "todo does not found", success: false, data: null });
    }

    if (todo.userId.toString() === user._id.toString()) {
      return res.status(200).json({
        message: "you have access to this todo",
        success: true,
        data: todo,
      });
    }
    return res.status(403).json({
      message: "you cant access this todo",
      success: false,
      data: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", success: false, data: null });
  }
};

export const toggleTheme = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Id is required", success: false, data: null });
  }

  try {
    const todo = await todos.findById(id);

    if (!todo) {
      return res
        .status(404)
        .json({ message: "todo does not found", success: false, data: null });
    }

    if (todo.userId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({
          message: "you dont have access to this todo",
          success: false,
          data: null,
        });
    }

    todo.isCompleted = !todo.isCompleted; // flip true-> false
    await todo.save();
    return res
      .status(200)
      .json({ message: "todo updated succesfully", success: true, data: todo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong", success: false, data: null });
  }
};

// always send response in fixed format like

// {
//   "success": true | false,
//   "message": "string",
//   "data": object | array | null
// }

// if request was succesfull

// res.json({
//   message : "",
//   success : true,
//   data : data
// })

// if request was failed

// res.json({
//   message : "",
//   success : false,
//   data : null
// })

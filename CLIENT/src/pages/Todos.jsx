import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const res = await api.get("/user/current");
      setUser(res.data.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    // api call of logout
    try {
      const res = await api.post("/user/logout");
      setIsAuthenticated(false);
      alert("Logout Succesful");
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-white">Todo App</h1>
      <div className="flex items-center gap-4">
        {/* Logged In Button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-white text-purple-600 font-medium px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Logged In
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-4 text-gray-700">
              <p className="font-bold">Name : {user.name}</p>
              <p className="font-bold ">Email : {user.email}</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          className="bg-red-500 text-white font-medium px-4 py-2 rounded-xl shadow hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false); // loading state dikhane ke liye
  const [error, setError] = useState(null); // error ko dikhane ke liye

  const getTodos = async () => {
    // make api call using axios

    // loader ko true karenge start me
    setLoading(true);
    try {
      const res = await api.get("/todos");
      setTodos(res.data.data || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fecth todos");
      console.log(error.response?.data?.message || "Something went wrong");
      setTodos([]); // fallback empty array
    } finally {
      setLoading(false);
    }

    // make api call using fetch

    // try {
    //   const res = await fetch("http://localhost:3000/todos", {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   });
    //   const result = await res.json();
    //   setTodos(result.data);
    // } catch (error) {
    //   console.log("error : ", error);
    // }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    // make api call using axios to save todo in database har qki ye todo ka routes protected hai matlab sirf logged in users hi todo ko create aur access kar sakte hai isliye har request me hame cookies ko send karna hai taki server verify kar paye aur access mil paye

    try {
      const res = await api.post("/todos", { todo });
      getTodos();
      setTodo("");
      console.log(res.data.message);
    } catch (error) {
      console.log("error :", error);
    }

    // make api call using fetch to save todo in database

    // try {
    //   const res = await fetch("http://localhost:3000/todos", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ todo }),
    //     credentials : "include" // isko set karna zaruri hai nahi to cookies send nahi karega fetch
    //   });
    //   const data = await res.json();
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const deleteTodo = async (id) => {
    // make api call using axios

    try {
      const res = await api.delete(`/todos/${id}`);
      getTodos();
      console.log(todos);
      console.log(res);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleEdit = async (id) => {
    // sabse pehle fecth this specific todo by api calling
    try {
      const res = await api.get(`/todos/${id}`); // fetch single todo api call
      getTodos();
      setTodo(res.data.data.todo); // isse ham us todo ka text nikal ke input me show
      setIsEditing(true);
      setEditId(id);
      console.log(res);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/todos/${editId}`, { newTodo: todo }); // PUT request bhejo
      getTodos();
      setTodo("");
      setEditId(null);
      setIsEditing(false);
      getTodos();
      console.log(res);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleTheme = async (id) => {
    // make api call to change isCompleted value
    try {
      const res = await api.put(`/todos/${id}/toggle`);
      const updatedTodo = res.data.data;
      console.log(updatedTodo);
      // update state to reflect changes in ui
      setTodos((prev) => {
        return prev.map((todo) => {
          return todo._id === updatedTodo._id ? updatedTodo : todo;
        });
      });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          My Todos
        </h2>

        {/* Add Todo Input */}
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition cursor-pointer"
            onClick={isEditing ? handleUpdate : addTodo}
            disabled={!todo.trim()} // agar input empty ya sirf spaces h to disable
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {/* fetch todo item and show here */}
          {loading && (
            <h1 className="text-center text-2xl text-blue-400">
              Loading Todos...
            </h1>
          )}
          {error && (
            <h1 className="text-center text-2xl text-red-500">{error}</h1>
          )}
          {!loading && !error && todos.length === 0 && (
            <h1 className="text-center text-2xl text-red-500">
              No Todos are available
            </h1>
          )}
          {!loading &&
            !error &&
            todos.length > 0 &&
            todos.map((todo) => {
              return (
                <li
                  key={todo._id}
                  className="flex items-center justify-between bg-purple-50 px-4 py-3 rounded-xl shadow"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={todo.isCompleted}
                      onChange={() => handleTheme(todo._id)}
                    />
                    <span
                      className={
                        todo.isCompleted ? "line-through text-gray-500" : ""
                      }
                    >
                      {todo.todo}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-yellow-100 rounded-lg hover:bg-yellow-200
                  cursor-pointer"
                      onClick={() => handleEdit(todo._id)}
                    >
                      <Edit className="w-5 h-5 text-yellow-600" />
                    </button>
                    <button
                      className="p-2 bg-red-100 rounded-lg hover:bg-red-200 cursor-pointer"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default function TodoPage({ setIsAuthenticated }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <Todos />
    </div>
  );
}

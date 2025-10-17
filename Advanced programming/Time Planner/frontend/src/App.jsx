import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "lucide-react";

function SortableItem({ task, toggleTask, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
      <button {...listeners} className="text-gray-500 me-2 cursor-move" aria-label="Drag Task">
        <Menu />
      </button>
      <span className={`flex-2 pb-0.5 ${task.completed ? "line-through text-gray-500" : "text-black"}`}>
        {task.title} (Due: {task.deadline})
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => toggleTask(task._id, task.completed)}
          className={`transition-all rounded-full cursor-pointer ${task.completed ? "text-yellow-500" : "text-green-500"}`}
          aria-label={task.completed ? "Mark as Incomplete" : "Mark as Completed"}
        >
          {task.completed ? "↩" : "✔"}
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="text-red-500 hover:text-red-700 transition"
          aria-label="Delete Task"
        >
          🗑
        </button>
      </div>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const appRef = useRef(null);

  useEffect(() => {
    fetchTasks();
    gsap.fromTo(appRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:5000/tasks", { title, deadline: "2025-04-05", completed: false });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task._id === active.id);
      const newIndex = tasks.findIndex((task) => task._id === over.id);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div ref={appRef} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">📌 To-Do List 📌</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 border p-2 rounded-lg focus:ring focus:ring-blue-300"
          />
          <button onClick={addTask} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            ➕ Add
          </button>
        </div>

        <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
          <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
            <ul className="space-y-2">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center">✨ There are no tasks. Add one! ✨</p>
              ) : (
                tasks.map((task) => <SortableItem key={task._id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />)
              )}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;

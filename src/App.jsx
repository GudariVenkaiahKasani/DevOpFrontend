import React, { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask } from "./api";
import Task from "./components/Task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async () => {
    if (!text) return;
    await addTask(text);
    setText("");
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default App;
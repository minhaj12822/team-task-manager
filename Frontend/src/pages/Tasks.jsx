import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}/status`,
      { status },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
    );

    fetchTasks();
  };

  return (
    <div style={styles.page}>
      <h1>Tasks</h1>

      <div style={styles.grid}>
        {tasks.map((task) => (
          <div style={styles.card} key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p><b>Status:</b> {task.status}</p>
            <p><b>Project:</b> {task.project?.name}</p>

            <button style={styles.btn} onClick={() => updateStatus(task.id, "TODO")}>Todo</button>
            <button style={styles.btn} onClick={() => updateStatus(task.id, "IN_PROGRESS")}>In Progress</button>
            <button style={styles.btn} onClick={() => updateStatus(task.id, "COMPLETED")}>Completed</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "40px", background: "#f3f4f6", minHeight: "100vh" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
  card: {
    background: "white",
    padding: "22px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
  },
  btn: {
    marginRight: "8px",
    marginTop: "8px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white"
  }
};

export default Tasks;
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then((res) => setData(res.data));
  }, []);

  return (
    <div style={styles.page}>
      <h1>Dashboard</h1>

      <div style={styles.grid}>
        <Card title="Total Tasks" value={data.totalTasks} />
        <Card title="Completed" value={data.completedTasks} />
        <Card title="Pending" value={data.pendingTasks} />
        <Card title="In Progress" value={data.inProgressTasks} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <h1>{value ?? 0}</h1>
    </div>
  );
}

const styles = {
  page: { padding: "40px", background: "#f3f4f6", minHeight: "100vh" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
  }
};

export default Dashboard;
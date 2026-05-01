import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then((res) => setProjects(res.data));
  }, []);

  return (
    <div style={styles.page}>
      <h1>Projects</h1>

      <div style={styles.grid}>
        {projects.map((project) => (
          <div style={styles.card} key={project.id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <small>ID: {project.id}</small>
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
  }
};

export default Projects;
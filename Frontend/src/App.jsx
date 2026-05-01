import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

function Layout({ children }) {
  return (
    <div>
      <nav style={styles.nav}>
        <h2>Team Task Manager</h2>
        <div>
          <Link style={styles.link} to="/dashboard">Dashboard</Link>
          <Link style={styles.link} to="/projects">Projects</Link>
          <Link style={styles.link} to="/tasks">Tasks</Link>
        </div>
      </nav>
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    padding: "15px 40px",
    background: "#111827",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  link: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default App;
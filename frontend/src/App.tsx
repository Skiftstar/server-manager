import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import Overview from "./routes/overview/Overview";
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <main className="ml-(--sidebar-width) min-h-screen p-6">
        <Routes>
          <Route path="/" element={<Navigate to={"/overview"} replace />} />
          <Route path="/overview" element={<Overview />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

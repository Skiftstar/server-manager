import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import Overview from "./routes/overview/Overview";
import Sidebar from "./components/layout/Sidebar";
import Containers from "./routes/containers/Containers";
import { ConfigProvider } from "./contexts/ConfigContext";
import Services from "./routes/services/Services";
import Topbar from "./components/layout/Topbar";

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Sidebar />
        <main className="ml-(--sidebar-width) h-screen overflow-y-auto flex flex-col">
          <Topbar />
          <Routes>
            <Route path="/" element={<Navigate to={"/overview"} replace />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/containers" element={<Containers />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

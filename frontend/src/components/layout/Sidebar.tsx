import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { NavLink } from "react-router";

const navItems = [
  { to: "/overview", label: "Overview", icon: <MonitorHeartOutlinedIcon /> },
  { to: "/containers", label: "Containers", icon: <ViewInArOutlinedIcon /> },
  { to: "/services", label: "Services", icon: <FolderOpenOutlinedIcon /> },
  { to: "/caddy", label: "Caddy", icon: <WifiOutlinedIcon /> },
  { to: "/cron", label: "Cron", icon: <AccessTimeOutlinedIcon /> },
  { to: "/scripts", label: "Scripts", icon: <DescriptionOutlinedIcon /> },
  { to: "/terminal", label: "Terminal", icon: <TerminalOutlinedIcon /> },
  { to: "/settings", label: "Settings", icon: <SettingsOutlinedIcon /> },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-(--sidebar-width) flex flex-col border-r border-divider">
      <nav className="flex-1 px-2 space-y-1 pt-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-row gap-2 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/30 text-text/72"
                  : "text-text/72 hover:bg-accent-2/30"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

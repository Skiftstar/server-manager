import { NavLink } from "react-router";

const navItems = [
  { to: "/overview", label: "Overview" },
  { to: "/container", label: "Containers" },
  { to: "/services", label: "Services" },
  { to: "/caddy", label: "Caddy" },
  { to: "/cron", label: "Cron" },
  { to: "/scripts", label: "Scripts" },
  { to: "/terminal", label: "Terminal" },
  { to: "/settings", label: "Settings" },
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
              `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/30 text-text/72"
                  : "text-text/72 hover:bg-accent-2/30"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

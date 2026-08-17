import { useLocation } from "react-router";

function Topbar() {
  const location = useLocation();
  const currentRoute = location.pathname.split("/").pop() ?? "";

  return (
    <div className="w-full border-b border-divider p-4">
      <span className="text-text text-xl capitalize">{currentRoute}</span>
    </div>
  );
}

export default Topbar;

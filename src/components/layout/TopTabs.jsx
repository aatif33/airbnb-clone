import { NavLink } from "react-router-dom";

const tabs = [
  { name: "Homes", path: "/" },
  { name: "Experiences", path: "/experiences", badge: "NEW" },
  { name: "Services", path: "/services", badge: "NEW" }
];

export default function TopTabs() {
  return (
    <div className="flex justify-center gap-10 border-b">
      {tabs.map(tab => (
        <NavLink
          key={tab.name}
          to={tab.path}
          end
          className={({ isActive }) =>
            `flex items-center gap-2 py-4 text-sm font-medium
            ${isActive ? "border-b-2 border-black" : "text-gray-500"}`
          }
        >
          {tab.name}
          {tab.badge && (
            <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
              {tab.badge}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
}

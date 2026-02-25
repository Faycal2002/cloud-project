import { NavLink } from "react-router-dom";

function SideMenu() {
  return (
    <div className="w-64 min-w-64 flex-shrink-0 h-screen bg-gray-800 text-white p-4">

      <ul className="mt-4 flex flex-col gap-3 w-full">

        <li>
          <NavLink
            to="/dashboard"
            className="block w-full p-3 rounded font-bold text-left"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#60a5fa" : "transparent"
            })}
          >
            System overview
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/devices"
            className="block w-full p-3 rounded font-bold text-left"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#60a5fa" : "transparent"
            })}
          >
            Devices
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/energy"
            className="block w-full p-3 rounded font-bold text-left"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#60a5fa" : "transparent"
            })}
          >
            Energy analytics
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default SideMenu;
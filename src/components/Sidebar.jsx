import { NavLink } from "react-router-dom";
import { FaUsers, FaFileInvoice, FaUserTie } from "react-icons/fa";
import "../css/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h4 className="sidebar-title">
        Muscat Bullion
      </h4>

      <ul className="sidebar-menu">

        <li>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <FaUsers className="menu-icon" />
            Customers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <FaFileInvoice className="menu-icon" />
            Invoices
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <FaUserTie className="menu-icon" />
            Employees
          </NavLink>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;
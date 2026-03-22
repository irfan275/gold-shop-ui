import { NavLink } from "react-router-dom";
import { FaUsers, FaFileInvoice, FaUserTie,FaCoins ,FaGem  } from "react-icons/fa";
import "../css/Sidebar.css";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
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
            to="/items"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <FaGem   className="menu-icon" />
            Items
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
            to="/purchases"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <FaFileInvoice className="menu-icon" />
            Purchases
          </NavLink>
        </li>

          {user?.role !== "EMPLOYEE" && (
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              "menu-link" + (isActive ? " active" : "")
            }
          >
            <FaUserTie className="menu-icon" />
            Users
          </NavLink>
        </li>)}

      </ul>

    </div>
  );
}

export default Sidebar;
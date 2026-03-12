import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // remove token
    localStorage.removeItem("token");

    // redirect to login
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-info px-3">

      <span className="navbar-brand">Dashboard</span>

      <button
        className="btn btn-outline-danger ms-auto"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;
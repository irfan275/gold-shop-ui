import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
const [name,setName] = useState("")
  const handleLogout = () => {
    // remove token
    localStorage.removeItem("token");

    // redirect to login
    navigate("/login");
  };
  useEffect(() => {
    setName(localStorage.getItem('name'));
  }, [name]);

  return (
 <nav className="navbar navbar-light bg-warning px-3">

  <strong className="navbar-brand">Muscat Bullion</strong>

  <div className="ms-auto d-flex align-items-center">
    <span className="text-white fw-bold me-3">
      Welcome, {name}
    </span>

    <button
      className="btn btn-outline-danger"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>

</nav>
  );
}

export default Navbar;
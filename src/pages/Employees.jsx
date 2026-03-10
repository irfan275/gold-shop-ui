import { useState } from "react";

function Employees() {

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ali",
      email: "ali@test.com",
      role: "Admin"
    },
    {
      id: 2,
      name: "Ahmed",
      email: "ahmed@test.com",
      role: "Employee"
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Employees</h3>

        <button className="btn btn-primary">
          Add Employee
        </button>
      </div>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th width="220">Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((emp) => (
            <tr key={emp.id}>

              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>

              <td>

                <button className="btn btn-sm btn-info">
                  View
                </button>

                <button className="btn btn-sm btn-warning mx-2">
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Employees;
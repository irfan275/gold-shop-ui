import { useState } from "react";

function Customers() {
  return (
    <div>

      <h3>Customers</h3>

      <button className="btn btn-primary mb-3">
        Add Customer
      </button>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Ahmed</td>
            <td>99999999</td>
            <td>
              <button className="btn btn-sm btn-warning">Edit</button>
              <button className="btn btn-sm btn-danger ms-2">Delete</button>
            </td>
          </tr>
        </tbody>

      </table>

    </div>
  );
}

export default Customers;
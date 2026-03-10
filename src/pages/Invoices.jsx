import { useState } from "react";

function Invoices() {

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: "INV-001",
      customer: "Ahmed",
      total: 1200,
      date: "2026-03-10"
    },
    {
      id: 2,
      invoiceNumber: "INV-002",
      customer: "Ali",
      total: 850,
      date: "2026-03-09"
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this invoice?")) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Invoices</h3>

        <button className="btn btn-primary">
          Add Invoice
        </button>
      </div>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th width="220">Actions</th>
          </tr>
        </thead>

        <tbody>

          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.customer}</td>
              <td>${inv.total}</td>
              <td>{inv.date}</td>

              <td>

                <button className="btn btn-sm btn-info">
                  View
                </button>

                <button className="btn btn-sm btn-warning mx-2">
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(inv.id)}
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

export default Invoices;
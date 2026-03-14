import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteInvoice, getInvoices } from "../services/invoiceService";

function Invoices() {
  const navigate=useNavigate();
  const [invoices, setInvoices] = useState([
    {
      id: "",
      invoiceNumber: "",
      customerId: {},
      items:[],
      total: "",
      date: ""
    }
  ]);
  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const response = await getInvoices();
    setInvoices(response.data || []);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this invoice?")) {
      try {
        // Call API to delete
        await deleteInvoice(id); // replace with your API function
    
        // Update local state to remove deleted record
        setInvoices((prev) => prev.filter((inv) => inv._id !== id));
    
        // Show success alert
        alert("Invoice deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete Invoice.");
      }
    }
  };
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};
  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Invoices</h3>

        <button className="btn btn-primary" onClick={() => navigate("/add-invoice")}>
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
            <th>Created By</th>
            <th width="220">Actions</th>
          </tr>
        </thead>

        <tbody>

          {invoices.map((inv) => (
            <tr key={inv._id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.customerId?.name}</td>
              <td>{inv.total}</td>
              <td>{formatDate(inv.updatedAt)}</td>
              <td>{inv.createdBy?.name}</td>

              <td>

                <button className="btn btn-sm btn-info" onClick={() => navigate(`/invoice/view/${inv._id}`)}>
                  View
                </button>

                <button className="btn btn-sm btn-warning mx-2" onClick={() => navigate(`/invoice/edit/${inv._id}`)}>
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(inv._id)}
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
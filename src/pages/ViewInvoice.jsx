import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoiceById } from "../services/invoiceService";

function ViewInvoice() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    const res = await getInvoiceById(id);
    setInvoice(res.data);
  };

  if (!invoice) return <div className="container mt-4">Loading...</div>;

  return (

    <div className="container mt-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between mb-4">
        <h3>Invoice Details</h3>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/invoices")}
        >
          Back
        </button>
      </div>

      {/* CUSTOMER + SHOP */}

      <div className="row mb-4">

        {/* CUSTOMER DETAILS */}
        <div className="col-md-6">
            <h5 className="border-bottom pb-2">Customer Details</h5>

            <div className="">
            <div className="row border-bottom ">
                <div className="col-4 fw-bold bg-info">Name</div>
                <div className="col-8">{invoice.customerId?.name}</div>
            </div>

            <div className="row border-bottom ">
                <div className="col-4 fw-bold bg-info">Phone</div>
                <div className="col-8">{invoice.customerId?.phone}</div>
            </div>

            <div className="row border-bottom ">
                <div className="col-4 fw-bold bg-info">Address</div>
                <div className="col-8">{invoice.customerId?.address}</div>
            </div>
            <div className="row ">
                <div className="col-4 fw-bold bg-info">Civil Id</div>
                <div className="col-8">{invoice.customerId?.civilId}</div>
            </div>
            </div>
        </div>


        {/* SHOP DETAILS */}
        <div className="col-md-6">
            <h5 className="border-bottom pb-2">Shop Details</h5>

            <div className="">
            <div className="row border-bottom ">
                <div className="col-4 fw-bold bg-info">Shop</div>
                <div className="col-8">{invoice.shop?.name}</div>
            </div>

            <div className="row border-bottom ">
                <div className="col-4 fw-bold bg-info">Invoice No</div>
                <div className="col-8">{invoice.invoiceNumber}</div>
            </div>

            <div className="row border-bottom ">
                <div className="col-4 fw-bold bg-info">Date</div>
                <div className="col-8">
                {invoice.invoiceDate}
                </div>
            </div>

            <div className="row ">
                <div className="col-4 fw-bold bg-info">Created By</div>
                <div className="col-8">{invoice.createdBy?.name}</div>
            </div>
            </div>
        </div>

        </div>

      <hr />

      {/* ITEMS TABLE */}

      <table className="table table-bordered">

        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Premium</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>

          {invoice.items.map((item, index) => (

            <tr key={index} className="text-start">
              <td className="p-1 border border-black ">{index+1}</td>
              <td className="p-1 border border-black">{item.itemId?.name}</td>
              <td className="p-1 border border-black">{item.quantity}</td>
              <td className="p-1 border border-black">{item.price}</td>
              <td className="p-1 border border-black">{item.weight}</td>
              <td className="p-1 border border-black">{item.premium}</td>
              <td className="p-1 border border-black">{item.total}</td>
            </tr>

          ))}
        <tr className="text-start">
              <td colSpan="2" className="p-1 border border-black text-start">Sub Total</td>
              <td className="p-1 border border-black">{invoice.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
              <td className="p-1 border border-black">{invoice.items.reduce((sum, i) => sum + i.price, 0)}</td>
              <td className="p-1 border border-black">{invoice.items.reduce((sum, i) => sum + i.weight, 0)}</td>
              <td className="p-1 border border-black">{invoice.items.reduce((sum, i) => sum + i.premium, 0)}</td>
              <td className="p-1 border border-black">{invoice.subTotal}</td>
            </tr>
        </tbody>

      </table>

      <hr />

      {/* TOTAL SECTION */}

      <div className="row justify-content-end">

        <div className="col-md-4">

          <div className="d-flex justify-content-between mb-2">
            <strong className="bg-info">Subtotal:</strong>
            <span>{invoice.subTotal}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="bg-info">Vat:</strong>
            <span>{invoice.vat}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="bg-info">Total:</strong>
            <span>{invoice.total}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <strong className="bg-info">Discount:</strong>
            <span>{invoice.discount}</span>
          </div>

          <div className="d-flex justify-content-between">
            <strong className="bg-info">Grand Total:</strong>
            <span>{invoice.finalTotal}</span>
          </div>

        </div>

      </div>
      <div className="row mb-3 mt-4">
          <strong className="bg-warning">Note:</strong>
          <span>{invoice.notes}</span>
      </div>

    </div>

  );

}

export default ViewInvoice;
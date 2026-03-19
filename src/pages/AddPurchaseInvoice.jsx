import { useState, useEffect } from "react";
import { checkCardExpiry, getCustomers } from "../services/customerService";
import { getItems, searchItems } from "../services/itemService";
import { getShops } from "../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import {createInvoice, updateInvoice,getInvoiceById, getInvoiceNumber } from "../services/purchaseService";


function AddPurchaseInvoice() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  // CUSTOMER STATE
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerResults, setCustomerResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedShop, setSelectedShop] = useState("");
  const [notes, setNotes] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  

  // ITEM STATE
const [allItems, setAllItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
const [itemSearch, setItemSearch] = useState("");
const [selectedItem, setSelectedItem] = useState(null);
const [showDropdown, setShowDropdown] = useState(false);

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("");
  const [premium, setPremium] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [shops, setShops] = useState([]);

  // INVOICE ITEMS
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  // ------------------ CUSTOMER SEARCH ------------------
  useEffect(() => {

    if (customerSearch.length < 5 || selectedCustomer) {
      setCustomerResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await getCustomers(1, 10, customerSearch);
      setCustomerResults(res.data.data || []);
    }, 400);

    return () => clearTimeout(timer);

  }, [customerSearch, selectedCustomer]);
  useEffect(() => {
    fetchShops();
  }, []);
  const fetchShops = async () => {
    const response = await getShops();
    setShops(response.data.data || []);
  };
  // ------------------ Edit Invoice ------------------
  useEffect(() => {

    if (isEditMode) {
      loadInvoice();
    }

  }, [id]);
  const loadInvoice = async () => {

    const res = await getInvoiceById(id);

    const inv = res.data;

    setSelectedCustomer(inv.customerId);
    setCustomerSearch(inv.customerId?.name);

    setSelectedShop(inv.shop?._id);

    setInvoiceItems(inv.items);

    setTotalDiscount(inv.discount);
    setNotes(inv.notes);
    setInvoiceNumber(inv.invoiceNumber);
    setInvoiceDate(inv.invoiceDate);
    setVat(inv.vat);
  };
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "EMPLOYEE") {
    setSelectedShop(user.shopId);
  }
}, []);
useEffect(() => {
  const loadItems = async () => {
    const res = await getItems();
    setAllItems(res.data.data || []);
  };

  loadItems();
}, []);
const handleCustomerSelection = async (c) => {
  try {
    const res = await checkCardExpiry(c._id);

    // success (200)
    setSelectedCustomer(c);
    setCustomerSearch(c.name);
    setCustomerResults([]);

  } catch (err) {
    if (err.response) {
      // backend returned 400
      alert(err.response.data.message || "Invalid card expiry");
    } else {
      alert("Something went wrong");
    }
  }
};
const handleItemSearch = (value) => {

  setItemSearch(value);
  setSelectedItem(null);

  if (!value) {
    setFilteredItems(allItems.slice(0,10));
    return;
  }

  const filtered = allItems.filter(i =>
    i.name.toLowerCase().includes(value.toLowerCase())
  );

  setFilteredItems(filtered.slice(0,10));
};
const handleSelectItem = (item) => {
  setSelectedItem(item);
  setItemSearch(item.name);
  setPrice(item.price);
  setPremium(item.premium);
  setWeight(item.weight);
  setDiscount(0);
  setShowDropdown(false);
  setShowPreview(false);
};
  // ------------------ ADD ITEM ------------------
  const handleAddItem = () => {
    if (!selectedItem || !price || !quantity) {
      alert("Select item and enter price/quantity");
      return;
    }
    const newItem = {
      id: Date.now(),
      itemId: selectedItem,
      //name: selectedItem.name,
      price: Number(price),
      quantity: Number(quantity),
      premium: Number(premium || 0),
      discount: Number(discount || 0),
      weight: Number(weight || 0),
      type:selectedItem.type,
      total: Number(price) * quantity+ Number(premium || 0)-discount,
    };
    setInvoiceItems([...invoiceItems, newItem]);
    setSelectedItem(null);
    setItemSearch("");
    setPrice("");
    setQuantity(1);
    setPremium("");
    setDiscount(0);
    setVat(0);
    setWeight("");
    setShowPreview(false);
  };

  // ------------------ DELETE ITEM ------------------
  const handleDeleteItem = (id) => {
    setInvoiceItems(invoiceItems.filter((i) => i._id !== id));
    setShowPreview(false);
  };

  // ------------------ EDIT ITEM ------------------
  const handleEditItem = (id, field, value) => {
    const updatedItems = invoiceItems.map((i) => {
      if (i.id === id) {
        const updatedItem = { ...i, [field]: Number(value) };
        updatedItem.total = updatedItem.price * updatedItem.quantity + updatedItem.premium;
        return updatedItem;
      }
      return i;
    });
    setInvoiceItems(updatedItems);
    setShowPreview(false);
  };

  // ------------------ TOTALS ------------------
  const subTotal = invoiceItems.reduce((sum, i) => sum + i.total, 0);
  const total = subTotal - Number(vat || 0);
  const finalTotal = total - Number(totalDiscount || 0);

  // ------------------ SAVE INVOICE ------------------
  const handleSaveInvoice = async () => {
    if (!selectedCustomer) return alert("Select customer");
    if (invoiceItems.length === 0) return alert("Add items to invoice");

    const payload = {
      customerId: selectedCustomer._id,
      items: invoiceItems.map((i) => ({
        itemId: i.itemId,
        price: i.price,
        weight: i.weight,
        quantity: i.quantity,
        premium: i.premium,
        discount:i.discount,
        total: i.total,
      })),
      total: total,
      subTotal: subTotal,
      vat: vat,
      finalTotal: finalTotal,
      discount: totalDiscount,
      shop : selectedShop,
      notes:notes,
      invoiceDate:invoiceDate
    };

    if (isEditMode) {

      await updateInvoice(id, payload);
      setInvoiceId(id);
      alert("Invoice updated");

    } else {

      let invoice = await createInvoice(payload);
      setInvoiceId(invoice.data.data._id);
      alert("Invoice created");

    }

    // setSelectedCustomer(null);
    // setCustomerSearch("");
    // setInvoiceItems([]);
    // setTotalDiscount(0);
    setShowPreview(true);
    //navigate("/invoices")
  };
  const getTodayDate = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const [invoiceNumber, setInvoiceNumber] = useState("");
const [invoiceDate, setInvoiceDate] = useState(getTodayDate());
const handleShopChange = async (shopId) => {
  setSelectedShop(shopId);

  if (!shopId) {
    setInvoiceNumber("");
    return;
  }

  try {
    const res = await getInvoiceNumber(shopId); // API call
    setInvoiceNumber(res.data.invoiceNumber);
  } catch (error) {
    console.error("Failed to fetch invoice number", error);
  }
};
const handlePreview = () => {

  const invoiceData = {
    id : invoiceId,
    customerId: selectedCustomer,
    items: invoiceItems.map((i) => ({
      itemId: i.itemId,
      price: i.price,
      quantity: i.quantity,
      weight : i.weight,
      premium: i.premium,
      discount:i.discount,
      total: i.total,
      type:i.type
    })),
    total: total,
    subTotal: subTotal,
    finalTotal: finalTotal,
    vat : vat,
    totalWeight:invoiceItems.reduce((sum, i) => sum + i.weight, 0),
    totalQuantity:invoiceItems.reduce((sum, i) => sum + i.quantity, 0),
    discount: totalDiscount,
    shop : {_id:selectedShop},
    notes:notes,
    invoiceNumber:invoiceNumber,
    invoiceDate:invoiceDate
  };


  navigate("/purchase-invoice/preview", { state: {invoice :invoiceData,show:true }});
};

  return (
    <div className="container mt-4">
      <h3>{isEditMode ? "Edit Invoice" : "Create Invoice"}</h3>
      {invoiceNumber && (
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Invoice Number: </strong> {invoiceNumber}
          </div>
          
        </div>
      )}
      {/* ------------- CUSTOMER SECTION ------------- */}
      <div className="row mb-4">

  {/* CUSTOMER */}

  <div className="col-md-4 position-relative">

    <label className="form-label"><strong>Customer</strong></label>

    <input
      className="form-control"
      placeholder="Search Customer (min 5 chars)"
      value={customerSearch}
      onChange={(e) => setCustomerSearch(e.target.value)}
    />

    {customerResults.length > 0 && (
      <ul
        className="list-group position-absolute w-100 shadow"
        style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
      >

        {customerResults.map((c) => (

          <li
            key={c._id}
            className="list-group-item list-group-item-action"
            onClick={(e) => handleCustomerSelection(c)}
          >
            {c.name}
          </li>

        ))}

      </ul>
    )}

  </div>


  {/* SHOP */}

  <div className="col-md-4">

    <label className="form-label"><strong>Shop</strong></label>

    <select
      className="form-control"
      name="shopId"
      value={selectedShop}
      onChange={(e) => handleShopChange(e.target.value)}
      disabled={JSON.parse(localStorage.getItem("user"))?.role === "EMPLOYEE"}
    >

      <option value="">Select Shop</option>

      {shops.map((shop) => (
        <option key={shop._id} value={shop._id}>
          {shop.name}
        </option>
      ))}

    </select>

  </div>
  <div className="col-md-4">
            <label className="form-label">
              <strong>Invoice Date:</strong>
            </label>

            <input
              type="text"
              className="form-control"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

</div>

{/* CUSTOMER DETAILS */}

{selectedCustomer && (

  <div className="row mb-3">

    <div className="col-md-12">

      <strong>Phone:</strong> {selectedCustomer.phone} &nbsp; | &nbsp;
      <strong>Address:</strong> {selectedCustomer.address}

    </div>

  </div>

)}

      {/* ------------- ITEM SELECTION SECTION ------------- */}
      <div className="row mb-3">
        <div className="col-md-4 position-relative">
          <label className="form-label">Item</label>
          <input
            className="form-control"
            placeholder="Search Item"
            value={itemSearch}
            onFocus={() => {
              setShowDropdown(true);
              setFilteredItems(allItems.slice(0,10));
            }}
            onChange={(e) => handleItemSearch(e.target.value)}
          />
          {showDropdown && filteredItems.length > 0 && (
            <ul className="list-group position-absolute w-100 shadow">

              {filteredItems.map(item => (

                <li
                  key={item._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectItem(item)}
                >
                  {item.name}
                </li>

              ))}

            </ul>
          )}
        </div>
        <div className="col-md-2">
          <label className="form-label">Price</label>
          <input className="form-control" value={price || ''} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Quantity</label>
          <input className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        {/* <div className="col-md-2">
          <label className="form-label">Premium</label>
          <input className="form-control" value={premium} onChange={(e) => setPremium(e.target.value)} />
        </div> */}
        <div className="col-md-2">
          <label className="form-label">Weight</label>
          <input className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div className="col-md-12 mt-2">
          <button className="btn btn-success" onClick={handleAddItem}>Add Item</button>
        </div>
      </div>

      {/* ------------- ITEM LIST TABLE ------------- */}
      <table className="table table-bordered table-hover mb-3">
        <thead className="table-dark">
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Premium</th>
            <th>Weight</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((i) => (
            <tr key={i.id}>
              <td>{i.name?i.name:i.itemId.name}</td>
              <td><input type="number" className="form-control" value={i.price} onChange={(e) => handleEditItem(i.id, "price", e.target.value)} /></td>
              <td><input type="number" className="form-control" value={i.quantity} onChange={(e) => handleEditItem(i.id, "quantity", e.target.value)} /></td>
              <td><input type="number" className="form-control" value={i.premium} onChange={(e) => handleEditItem(i.id, "premium", e.target.value)} /></td>
              <td><input type="number" className="form-control" value={i.weight} onChange={(e) => handleEditItem(i.id, "weight", e.target.value)} /></td>
              <td>{i.total}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(i._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ------------- TOTALS SECTION ------------- */}
      <hr className="my-4" />
        <div className="row justify-content-end mb-4">

          <div className="col-md-4">

            <div className="d-flex justify-content-between mb-2">
              <strong>Total:</strong>
              <span>{subTotal}</span>
            </div>

            {/* <div className="d-flex justify-content-between align-items-center mb-2">
              <strong className="me-2">Vat:</strong>

              <input
                type="number"
                className="form-control"
                style={{ maxWidth: "150px" }}
                value={vat}
                onChange={(e) => setVat(e.target.value)}
              />

            </div> */}

            {/* <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <span>{total}</span>
            </div> */}
            {/* <div className="d-flex justify-content-between align-items-center mb-2">
              <strong className="me-2">Discount:</strong>

              <input
                type="number"
                className="form-control"
                style={{ maxWidth: "150px" }}
                value={totalDiscount}
                onChange={(e) => setTotalDiscount(e.target.value)}
              />

            </div> */}

            <div className="d-flex justify-content-between">
              <strong>Grand Total:</strong>
              <span>{finalTotal}</span>
            </div>

          </div>

        </div>
      <div className="row mb-3">
        <div className="col-md-12 gap-2">

                  <label className="form-label">Note :</label>

                  <textarea
                    className="form-control"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />
            </div>
      </div>
      
      {/* ------------- ACTION BUTTONS ------------- */}
      <div className="d-flex justify-content-end mb-4 gap-2">
        <button
          className="btn btn-primary"
          onClick={handleSaveInvoice}
        >
          {isEditMode ? "Update Invoice" : "Save Invoice"}
        </button>
        <div style={{ cursor: !showPreview ? "not-allowed" : "pointer" }}>
          <button
            className="btn btn-secondary"
            onClick={handlePreview}
            disabled={!showPreview}
            style={{ pointerEvents: !showPreview ? "none" : "auto" }}
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPurchaseInvoice;
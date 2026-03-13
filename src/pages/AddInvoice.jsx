import { useState, useEffect } from "react";
import { getCustomers } from "../services/customerService";
import { getItems, searchItems } from "../services/itemService";
import { createInvoice } from "../services/invoiceService";

function AddInvoice() {
  // CUSTOMER STATE
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerResults, setCustomerResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // ITEM STATE
const [allItems, setAllItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
const [itemSearch, setItemSearch] = useState("");
const [selectedItem, setSelectedItem] = useState(null);
const [showDropdown, setShowDropdown] = useState(false);

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [premium, setPremium] = useState("");

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

  // ------------------ ITEM SEARCH ------------------
// useEffect(() => {

//   if (itemSearch.length < 5 || selectedItem) {
//     setItemResults([]);
//     return;
//   }

//   const timer = setTimeout(async () => {
//     const res = await searchItems(itemSearch);
//     setItemResults(res.data.data || []);
//   }, 400);

//   return () => clearTimeout(timer);

// }, [itemSearch, selectedItem]);
useEffect(() => {
  const loadItems = async () => {
    const res = await getItems();
    setAllItems(res.data || []);
  };

  loadItems();
}, []);
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
  setShowDropdown(false);
};
  // ------------------ ADD ITEM ------------------
  const handleAddItem = () => {
    if (!selectedItem || !price || !quantity) {
      alert("Select item and enter price/quantity");
      return;
    }
    const newItem = {
      id: Date.now(),
      itemId: selectedItem._id,
      name: selectedItem.name,
      price: Number(price),
      quantity: Number(quantity),
      premium: Number(premium || 0),
      total: Number(price) * quantity+ Number(premium || 0),
    };
    setInvoiceItems([...invoiceItems, newItem]);
    setSelectedItem(null);
    setItemSearch("");
    setPrice("");
    setQuantity("");
    setPremium("");
  };

  // ------------------ DELETE ITEM ------------------
  const handleDeleteItem = (id) => {
    setInvoiceItems(invoiceItems.filter((i) => i.id !== id));
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
  };

  // ------------------ TOTALS ------------------
  const subTotal = invoiceItems.reduce((sum, i) => sum + i.total, 0);
  const finalTotal = subTotal - Number(discount || 0);

  // ------------------ SAVE INVOICE ------------------
  const handleSaveInvoice = async () => {
    if (!selectedCustomer) return alert("Select customer");
    if (invoiceItems.length === 0) return alert("Add items to invoice");

    const payload = {
      customerId: selectedCustomer._id,
      items: invoiceItems.map((i) => ({
        itemId: i.itemId,
        price: i.price,
        quantity: i.quantity,
        premium: i.premium,
        total: i.total,
      })),
      total: finalTotal,
      discount: discount,
    };

    await createInvoice(payload);
    alert("Invoice saved");

    setSelectedCustomer(null);
    setCustomerSearch("");
    setInvoiceItems([]);
    setDiscount(0);
  };

  const handlePrint = () => window.print();

  return (
    <div className="container mt-4">
      <h3>Create Invoice</h3>

      {/* ------------- CUSTOMER SECTION ------------- */}
      <div className="row mb-4">
        <div className="col-md-12 position-relative">
          <label className="form-label">Customer</label>
          <input
            className="form-control"
            placeholder="Search Customer (min 5 chars)"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
          />
          {customerResults.length > 0 && (
            <ul className="list-group position-absolute w-100 shadow" style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}>
              {customerResults.map((c) => (
                <li key={c._id} className="list-group-item list-group-item-action"
                  onClick={() => {
                    setSelectedCustomer(c);
                    setCustomerSearch(c.name);
                    setCustomerResults([]);
                  }}>
                  {c.name} 
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedCustomer && (
          <div className="col-md-12 mt-2">
            <strong>Phone:</strong> {selectedCustomer.phone} | <strong>Address:</strong> {selectedCustomer.address}
          </div>
        )}
      </div>

      {/* ------------- ITEM SELECTION SECTION ------------- */}
      <div className="row mb-3">
        <div className="col-md-6 position-relative">
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
          <input className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Quantity</label>
          <input className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Premium</label>
          <input className="form-control" value={premium} onChange={(e) => setPremium(e.target.value)} />
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
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td><input type="number" className="form-control" value={i.price} onChange={(e) => handleEditItem(i.id, "price", e.target.value)} /></td>
              <td><input type="number" className="form-control" value={i.quantity} onChange={(e) => handleEditItem(i.id, "quantity", e.target.value)} /></td>
              <td><input type="number" className="form-control" value={i.premium} onChange={(e) => handleEditItem(i.id, "premium", e.target.value)} /></td>
              <td>{i.total}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(i.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ------------- TOTALS SECTION ------------- */}
      <div className="row mb-4">
        <div className="col-md-3 offset-md-9">
          <label className="form-label">Discount</label>
          <input className="form-control" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
      </div>
      <div className="text-end mb-4">
        <h5>Subtotal: {subTotal}</h5>
        <h5>Discount: {discount}</h5>
        <h4>Grand Total: {finalTotal}</h4>
      </div>

      {/* ------------- ACTION BUTTONS ------------- */}
      <div className="text-end mb-5">
        <button className="btn btn-primary me-2" onClick={handleSaveInvoice}>Save Invoice</button>
        <button className="btn btn-secondary" onClick={handlePrint}>Print Invoice</button>
      </div>
    </div>
  );
}

export default AddInvoice;
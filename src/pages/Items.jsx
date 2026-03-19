import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "../services/itemService";

function Items() {

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    purity: "",
    weight: "",
    price: "",
    premium: "",
    type:"Gold"
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const response = await getItems();
    setItems(response.data.data || []);
  };

  const openAddModal = () => {
    setForm({
      name: "",
      description: "",
      purity: "",
      weight: "",
      price: "",
      premium: "",
      type:"Gold"
    });

    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setForm(item);
    setEditId(item._id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
  e.preventDefault();

  const formElement = e.currentTarget;

  if (!formElement.checkValidity()) {
    e.stopPropagation();
  } else {
    if(editId){
      await updateItem(editId, form);
    }else{
      await createItem(form);
    }

    setShowModal(false);
    loadItems();
  }
  formElement.classList.add("was-validated");
  };

  const handleDelete = async (id) => {

    if(window.confirm("Delete this item?")){
      await deleteItem(id);
      loadItems();
    }

  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">
        <h3>Items</h3>

        <button
          className="btn btn-primary"
          onClick={openAddModal}
        >
          Add Item
        </button>
      </div>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Purity</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Premium</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {items.map((item)=>(
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.purity}</td>
              <td>{item.weight}</td>
              <td>{item.price}</td>
              <td>{item.premium}</td>
              <td>{item.type}</td>
              <td>

                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={()=>openEditModal(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={()=>handleDelete(item._id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {/* Modal */}

      {showModal && (

        <div className="modal show d-block">

          <div className="modal-dialog">

            <div className="modal-content">

              <div className="modal-header">

                <h5>
                  {editId ? "Edit Item" : "Add Item"}
                </h5>

                <button
                  className="btn-close"
                  onClick={()=>setShowModal(false)}
                />

              </div>
<form className="needs-validation" noValidate onSubmit={handleSave}>
              <div className="modal-body">
                
                  <div className="row mb-2">
                    <div className="col-3">
                      <label className="form-label">Name</label>
                    </div>
                    <div className="col-9">
                      <input
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label className="form-label">Description</label>
                    </div>
                    <div className="col-9">
                      <input
                        className="form-control"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-3">
                      <label className="form-label">Item Type</label>
                    </div>

                    <div className="col-9">
                      <select
                        className="form-control"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-3">
                      <label className="form-label">Purity</label>
                    </div>
                    <div className="col-9">
                      <input
                        className="form-control"
                        name="purity"
                        value={form.purity}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label className="form-label">Weight</label>
                    </div>
                    <div className="col-9">
                      <input
                        className="form-control"
                        name="weight"
                        value={form.weight}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label className="form-label">Price</label>
                    </div>
                    <div className="col-9">
                      <input
                        className="form-control"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label className="form-label">Premium</label>
                    </div>
                    <div className="col-9">
                      <input
                        className="form-control"
                        name="premium"
                        value={form.premium}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                </div>
              

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={()=>setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit"
                  className="btn btn-success"
                 // onClick={handleSave}
                >
                  Save
                </button>

              </div>
</form>
            </div>
            

          </div>

        </div>

      )}

    </div>
  );
}

export default Items;
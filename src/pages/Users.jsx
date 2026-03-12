import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser, getShops } from "../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchShops();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data || []);
  };

  const fetchShops = async () => {
    const response = await getShops();
    setShops(response.data || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setForm({});
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setForm(user);
    setEditId(user._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editId) {
        await updateUser(editId, form);
      } else {
        await createUser(form);
      }
      fetchUsers();
      setShowModal(false);
      alert(editId ? "User updated successfully!" : "User created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save user.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(prev => prev.filter(u => u._id !== id));
        alert("User deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="container mt-3">
      <h3>Users</h3>
      <button className="btn btn-primary mb-2" onClick={openAddModal}>Add User</button>

      {/* Users Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Civil ID</th>
            <th>Shop</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.phoneNumber}</td>
              <td>{u.email}</td>
              <td>{u.civilId}</td>
              <td>{u.shopId?.name || "-"}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => openEditModal(u)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? "Edit User" : "Add User"}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                <div className="row mb-2">
                  <div className="col-3"><label>Name</label></div>
                  <div className="col-9"><input className="form-control" name="name" value={form.name || ""} onChange={handleChange} /></div>
                </div>

                <div className="row mb-2">
                  <div className="col-3"><label>Phone</label></div>
                  <div className="col-9"><input className="form-control" name="phoneNumber" value={form.phoneNumber || ""} onChange={handleChange} /></div>
                </div>

                <div className="row mb-2">
                  <div className="col-3"><label>Email</label></div>
                  <div className="col-9"><input className="form-control" name="email" value={form.email || ""} onChange={handleChange} /></div>
                </div>

                <div className="row mb-2">
                  <div className="col-3"><label>Civil ID</label></div>
                  <div className="col-9"><input className="form-control" name="civilId" value={form.civilId || ""} onChange={handleChange} /></div>
                </div>

                <div className="row mb-2">
                  <div className="col-3"><label>Shop</label></div>
                  <div className="col-9">
                    <select className="form-control" name="shopId" value={form.shopId || ""} onChange={handleChange}>
                      <option value="">Select Shop</option>
                      {shops.map(shop => (
                        <option key={shop._id} value={shop._id}>{shop.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Users;

import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";

const API_URL = "http://localhost:5000/user";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submit for both Add and Update
  const handleSubmit = async () => {
    console.log("Submit clicked", { name, email, editId });

    if (!name.trim() || !email.trim()) {
      alert("Enter all details");
      return;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      if (res.ok) {
        alert(editId ? "User updated!" : "User added!");
        fetchUsers();
        handleCloseModal();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Server error. Please try again.");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("User deleted.");
        fetchUsers();
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };
  

  // Open modal (Add or Edit)
  const handleShowModal = (user = null) => {
    if (user) {
      setEditId(user._id);
      setName(user.name);
      setEmail(user.email);
    } else {
      setEditId(null);
      setName("");
      setEmail("");
    }
    setShowModal(true);
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setName("");
    setEmail("");
  };
  




  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Management</h2>

      {/* Add User Button */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => handleShowModal()}>
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="card shadow-lg p-4">
        <h3>User List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleShowModal(user)}
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;




import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, editUser, updateUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    }
  }, [editUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      updateUser(formData);
    } else {
      addUser(formData);
    }
    setFormData({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit">{editUser ? "Update" : "Add"} User</button>
    </form>
  );
};

export default UserForm;

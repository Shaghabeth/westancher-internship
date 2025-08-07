import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, { id: Date.now(), ...user }]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditUser(null);
  };

  const editExistingUser = (user) => {
    setEditUser(user);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React CRUD Form</h2>
      <UserForm addUser={addUser} editUser={editUser} updateUser={updateUser} />
      <UserList users={users} deleteUser={deleteUser} editExistingUser={editExistingUser} />
    </div>
  );
}

export default App;

import React from 'react';

const UserList = ({ users, deleteUser, editExistingUser }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>User List</h3>
      {users.length === 0 && <p>No users added yet.</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> – {user.email}
            <button onClick={() => editExistingUser(user)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

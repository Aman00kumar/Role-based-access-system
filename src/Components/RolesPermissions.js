import React, { useEffect, useState } from 'react';

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/roles')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched roles:', data);
        setRoles(data);
      })
      .catch(error => console.error('Error fetching roles:', error));
  }, []);

  const handleRoleChange = (roleId, updatedPermissions) => {
    fetch(`http://localhost:5001/api/roles/${roleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ permissions: updatedPermissions }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Role updated successfully:', data);
    })
    .catch(error => console.error('Error updating role:', error));
  };

  const handlePermissionChange = (roleId, permission) => {
    const updatedRoles = roles.map(role => {
      if (role.id === roleId) {
        const permissions = role.permissions.includes(permission)
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions };
      }
      return role;
    });
    setRoles(updatedRoles);
  };

  return (
    <div>
      <h1>Manage Roles & Permissions</h1>
      <ul>
        {roles.map(role => (
          <li key={role.id}>
            {role.name} 
            <div>
              {['read', 'write', 'delete'].map(permission => (
                <label key={permission}>
                  <input
                    type="checkbox"
                    checked={role.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(role.id, permission)}
                  />
                  {permission}
                </label>
              ))}
            </div>
            <button onClick={() => handleRoleChange(role.id, role.permissions)}>Update Permissions</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RolesPermissions;


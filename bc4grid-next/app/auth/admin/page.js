'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Table, Loader, Message } from 'semantic-ui-react';

const AdminConsole = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch('/api/auth/users')
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [session]);

  const handleUserPermissionChange = (userId, canUseApp) => {
    // Update user permission on the server
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ canUseApp }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        // Update the local state to reflect the change
        setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (!session) {
    return <Message>You must be logged in to view this page.</Message>;
  }

  return (
    <div>
      <h1>Admin Console</h1>
      {loading ? (
        <Loader active inline='centered' />
      ) : error ? (
        <Message error header='Error' content={error} />
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Can Use App</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.canUseApp ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell>
                  <Button
                    toggle
                    active={user.canUseApp}
                    onClick={() => handleUserPermissionChange(user.id, !user.canUseApp)}
                  >
                    {user.canUseApp ? 'Revoke Access' : 'Grant Access'}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default AdminConsole;

'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Card, Loader, Message, Image } from 'semantic-ui-react'; // Import Image from semantic-ui-react

const AdminConsole = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user?.isAdmin) {
      fetch(`/api/auth/users`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          setUsers(data.users); // Assuming the API returns an object with a 'users' array
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session?.user?.isAdmin]);

  const handleUserApproval = (userId, isApproved) => {
    setLoading(true);
    // Update user approval on the server
    fetch(`/api/auth/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, isVerified: isApproved }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user approval status');
        }
        return response.json();
      })
      .then((data) => {
        // Update the local state to reflect the change
        setUsers(users.map((user) => (user.id === userId ? { ...user, ...data.updatedUser } : user)));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!session) {
    return <Message>You must be logged in to view this page.</Message>;
  }

  if (!session.user.isAdmin) {
    return <Message>You must be an admin to view this page.</Message>;
  }

  return (
    <div>
      <h1>Admin Console</h1>
      {loading ? (
        <Loader active inline='centered' />
      ) : error ? (
        <Message error header='Error' content={error} />
      ) : (
    <Card.Group stackable itemsPerRow={4}>
          {users.map((user) => (
            <Card key={user.id}>
              {/* Add the Image component with the user's image */}             
              <Card.Content>
              {user.image && <Image floated="right" size="tiny" src={user.image} />}
                <Card.Header>{user.name || 'No name provided'}</Card.Header>
                <Card.Meta>Email: {user.email}</Card.Meta>
                <Card.Description>
                  Status: {user.isVerified ? 'Approved' : 'Not Approved'}
                </Card.Description>
                <Card.Description>
                  Account Created: {new Date(user.createdAt).toLocaleString()}
                </Card.Description>
              </Card.Content>
              {!user.isVerified && (
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green' onClick={() => handleUserApproval(user.id, true)}>
                      Approve
                    </Button>
                    <Button basic color='red' onClick={() => handleUserApproval(user.id, false)}>
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              )}
            </Card>
          ))}
        </Card.Group>
      )}
    </div>
  );
};

export default AdminConsole;

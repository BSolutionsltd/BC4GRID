'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { 
  Button, 
  Card, 
  Loader, 
  Message, 
  Image, 
  Segment, 
  Header } from 'semantic-ui-react'; // Import Image from semantic-ui-react

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

  const handleUserRemoval = (userId) => {
    setLoading(true);
    // Send a DELETE request to remove the user
    fetch(`/api/auth/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to remove user');
      }
      return response.json();
    })
    .then((data) => {
      // Update the local state to remove the user
      setUsers(users.filter((user) => user.id !== userId));
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

  // initials avatar
  // Function to generate initials from a name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  // Define the style object for the initials avatar
  const initialsAvatarStyle = {
    float: 'right',
    width: '75px',
    height: '75px',
    borderRadius: '50px',
    backgroundColor: '#1B1C1D',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px', // You can adjust the font size as needed
    fontWeight: 'bold', // Optional: if you want the initials to be bold
  };

  // get list of registered vs verified users
  const approvedUsers = users.filter(user => user.isVerified);
  const registeredUsers = users.filter(user => !user.isVerified);

  return (
<div>
  <Header as="h1" textAlign='center'>Admin Console</Header>
      
      {loading ? (
        <Loader active inline='centered' />
      ) : error ? (
        <Message error header='Error' content={error} />
      ) : (
        <>
        <Segment style={{ marginBottom: '5vh' }}>
        <h2>Approved users</h2>
    <Card.Group stackable>
          {approvedUsers.map((user) => (
            <Card fluid key={user.id}>
              {/* Add the Image component with the user's image */}             
              <Card.Content>
              {user.image ? (
                  <Image floated="right" size="tiny" src={user.image} alt=''/>
                ) : (
                  <div style={initialsAvatarStyle}>
                    {getInitials(user.name || '')}
                  </div>
                )}
                <Card.Header>{user.name || 'No name provided'}</Card.Header>
                <Card.Meta>Email: {user.email}</Card.Meta>
                <Card.Description>
                  Status: {user.isVerified ? 'Approved' : 'Not Approved'}
                </Card.Description>
                <Card.Description>
                  Account Created: {new Date(user.createdAt).toLocaleString()}
                </Card.Description>
              </Card.Content>
              {user.isVerified && (
                <Card.Content extra>
                  <div>                    
                    <Button basic color='red' floated='right' onClick={() => handleUserRemoval(user.id)}>
                      Remove
                    </Button>
                  </div>
                </Card.Content>
              )}
            </Card>
          ))}
        </Card.Group>
        </Segment>

{ registeredUsers && registeredUsers.length > 0 &&
<Segment style={{ marginBottom: '15vh' }}>
    <h2>Users pending for approval</h2>
    <Card.Group stackable>
          {registeredUsers.map((user) => (
            <Card fluid key={user.id}>
              {/* Add the Image component with the user's image */}             
              <Card.Content>
              {user.image ? (
                  <Image floated="right" size="tiny" src={user.image} alt='' />
                ) : (
                  <div style={initialsAvatarStyle}>
                    {getInitials(user.name || '')}
                  </div>
                )}
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
                  <div >                
                    <Button basic color='red' floated='right' onClick={() => handleUserRemoval(user.id)}>
                      Decline
                    </Button>
                    <Button basic color='green' floated='right' onClick={() => handleUserApproval(user.id, true)}>
                      Approve
                    </Button>
                  </div>
                </Card.Content>
              )}
            </Card>
          ))}
        </Card.Group>
        </Segment> }
  </>)}
    </div>
  );
};

export default AdminConsole;

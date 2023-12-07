import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // If an 'id' query parameter is provided, return the profile for that user
    if (req.query.id) {
      const { id } = req.query;

      // Check if the user is requesting their own profile or if they are an admin
      if (session.user.id === id || session.user.isAdmin) {
        const userProfile = await getUserProfileById(id);
        if (userProfile) {
          return res.status(200).json(userProfile);
        } else {
          return res.status(404).json({ message: 'User not found' });
        }
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
    } else {
      // If no 'id' query parameter is provided, and the user is an admin, list all users
      if (session.user.isAdmin) {
        const users = await getAllUsers();
        return res.status(200).json(users);
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }
  } else {
    // Handle other HTTP methods or return 405 Method Not Allowed
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Replace this with your actual database fetching logic
async function getUserProfileById(userId) {
  // Fetch user profile from the database
  // ...
}

async function getAllUsers() {
  // Fetch all users from the database
  // ...
}

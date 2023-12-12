// withAuth.js
import { useSession, signIn } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      // If loading session, return a loading indicator
      if (status === 'loading') {
        // You can implement a loading component here
        return;
      }

      // If no session exists, redirect to the login page
      if (!session) {
        signIn(); // Redirects to the login page
      }
    }, [session, status, router]);

    // If there is a session, render the wrapped component
    if (session) {
      return <WrappedComponent {...props} />;
    }

    // While waiting for session or if no session, return null or a loading indicator
    return null;
  };

  // Assign a display name to the returned component for debugging purposes
  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;

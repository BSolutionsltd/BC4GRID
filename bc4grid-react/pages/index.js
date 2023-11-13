import React, { Component, useContext } from 'react';
import App from '../components/App';
import Footer from '../components/Footer';
import { AuthProvider, AuthContext } from '../components/Auth';
import {Button} from 'semantic-ui-react';


// semantic-ui
const HomePage = () => {
  const context = useContext(AuthContext);

  console.log(context.isLoggedIn);
  
  
  return (
  <>
      <h3>Welcome to the home page!</h3>

    <div>
      {context.isLoggedIn ? (
        <p>User is logged in</p>
      ) : (
        <p>User is not logged in</p>
      )}
      {/* rest of your code */}
    </div>
    </>
  );
};



const IndexPage = () => {
  
  return (

  <AuthProvider>
  <App isIndexPage = {true}>
      <HomePage />
      <Footer />      
    </App>

    </AuthProvider>
  );
};

export default IndexPage;

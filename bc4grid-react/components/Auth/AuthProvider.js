import React, { Component, useState  } from 'react';
import AuthContext from './AuthContext';


//  define global states
class AuthProvider extends Component {
  
  state = {
    isLoggedIn: false,
  };

  logIn = () => {
    this.setState({ isLoggedIn: true });
  };

  logOut = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          logIn: this.logIn,
          logOut: this.logOut,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
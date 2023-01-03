import React, { useState, useEffect } from 'react';
import './Login.css';
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {
  // Use the useState hook to create state variables for the form fields and errors
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Create a function to validate the form
  const validateForm = () => {
    // Set the errors object to an empty object
    setErrors({});

    // Create a new errors object that will be used to update the errors state variable
    const newErrors = {};

    // Validate the username and password fields
    if (username.trim().length === 0) {
      newErrors.username = 'Username is required';
    }
    if (password.trim().length === 0) {
      newErrors.password = 'Password is required';
    }

    // Set the errors state variable to the new errors object
    setErrors(newErrors);

    // Return true if the errors object is empty, false if it is not
    return Object.keys(newErrors).length === 0;
  };

  // Create a function to handle form submissions
  const handleSubmit = event => {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // Validate the form
    const isValid = validateForm();

    // If the form is valid, submit the form
    if (isValid) {
      // Add code here to submit the form
    }
  };

  useEffect(() => {
    function start() {
        gapi.client.init({
            clientId: "79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com",
            scope: ""
        })
    }
    gapi.load('client: auth2', start)
  });
  const onSuccess = e => {
    alert("User signed in")
    console.log(e)
  }

  const onFailure = e => {
    alert("User sign in Failed")
    console.log(e)
  }

  // Render the Login form
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1> LOGIN </h1>
      <label htmlFor="username" className="login-label">Username:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={event => setUsername(event.target.value)}
        className={`login-input ${errors.username ? 'input-error' : ''}`}
      />
      <div className={`error-message ${errors.username ? 'visible' : 'hidden'}`}>
        {errors.username}
      </div>
      <label htmlFor="password" className="login-label">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        className={`login-input ${errors.password ? 'input-error' : ''}`}
      />
      <div className={`error-message ${errors.password ? 'visible' : 'hidden'}`}>
        {errors.password}
      </div>
      <button type="submit" className="login-button">
        Login
      </button>

      <p className="text">Or login using</p>

      <div className="alt-login">
          <div className="google">
              <GoogleLogin className="blue"
                  clientId=""
                  buttonText="Login using Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={false} // alternative is true, which keeps the user signed in
                  // icon={false}    // alt is true, and this puts the google logo on your button, but I don't like it
                  theme="dark"  // alternative is light, which is white
              />
          </div>
      </div>
    </form>
  );
};


export default Login;
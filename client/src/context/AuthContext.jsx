import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { decodeToken } from "../utils/tokenDecoder";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper to clear user data (logout)
  const clearUserData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser({ id: decodedUser.id, username });
      } else {
        clearUserData(); // Token is invalid or expired
      }
    }
  }, []);

  // Function to handle user signup
  const signup = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        { username, password }
      );
      setUser(response.data.user); // Set user from signup response
      // Save token and username to local storage after successful signup
      localStorage.setItem("token", response.data.token); // Save token to local storage
      localStorage.setItem("username", response.data.user.username); // Save username to local storage
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "Signup failed. Please try again."
        );
        throw new Error(error.response.data.message); // Throw the error to be caught in Signup.jsx
      } else {
        setError("Signup failed. Please try again.");
        throw new Error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user login
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { username, password }
      );

      // Set user if login is successful
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token); // Save token to local storage
      localStorage.setItem("username", response.data.user.username); // Save username to local storage

      // Return success to be handled in Login.jsx
      return true; // Indicate successful login
    } catch (error) {
      console.error("Login error:", error);

      // Set appropriate error message for the login page
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }

      // Ensure user is cleared on login failure
      setUser(null);
      throw new Error("Login failed"); // Throw an error to be caught in Login.jsx
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("username"); // Remove username from local storage
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

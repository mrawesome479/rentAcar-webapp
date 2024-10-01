import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();

        // Clear previous messages before attempting to login
        setErrorMessage(''); // Clear any existing error message
        setSuccessMessage(''); // Clear any existing success message

        try {
            // Attempt to log in the user
            await login(username.trim(), password.trim());
            setSuccessMessage('Login successful!'); // Set success message on successful login

            // Redirect to the homepage after a successful login
            navigate('/'); // Change this path to your homepage route
        } catch (error) {
            setErrorMessage(error.message); // Set error message on login failure
        }
    };

    const redirectToSignup = () => {
        navigate('/signup'); // Redirect to the signup page
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Log In</h2>
                {errorMessage && (
                    <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                <div className="text-white text-center mt-4">
                    <p>
                        Don't have an account?{' '}
                        <span
                            onClick={redirectToSignup}
                            className="text-blue-400 hover:text-blue-500 cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

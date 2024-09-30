import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error message
        setSuccessMessage(''); // Clear previous success message

        // Trim username and password
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            setErrorMessage('Username and password are required.');
            return;
        }

        try {
            // Attempt to sign up the user
            await signup(trimmedUsername, trimmedPassword);
            setSuccessMessage('Signup successful!');
        } catch (error) {
            // Display the error message thrown from AuthContext
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>
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
                <form onSubmit={handleSignup}>
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

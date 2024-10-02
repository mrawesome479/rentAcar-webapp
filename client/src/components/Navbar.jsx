import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);

    const toggleMenu = () => setIsOpen(!isOpen);

    const getLinkClassName = (path) => (
        `block p-3 transition duration-300 
        ${location.pathname === path ? 'bg-blue-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
    );

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <nav className="bg-gray-900 p-4 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo on the left */}
                <div className="text-2xl font-bold text-white">
                    <Link to="/fico"><img src="/CarRentHubLogo.png" alt="Car Rental Logo" className="h-10 w-auto" /></Link>
                </div>
                
                {/* Centered Links */}
                <div className="hidden lg:flex flex-grow justify-center space-x-6">
                    <Link to="/" className={getLinkClassName('/')}>Home</Link>
                    <Link to="/book" className={getLinkClassName('/book')}>Book</Link>
                    <Link to="/booked-cars" className={getLinkClassName('/booked-cars')}>Booked Cars</Link>
                    <Link to="/about" className={getLinkClassName('/about')}>About</Link>
                </div>

                {/* Right-side Buttons for Login/Signup or User Info */}
                <div className="hidden lg:flex space-x-4 items-center">
                    {!user ? (
                        <>
                            <Link to="/login" className="border border-white text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700">Login</Link>
                            <Link to="/signup" className="border border-white text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700">Signup</Link>
                        </>
                    ) : (
                        <>
                            <span className="p-3 bg-gray-800 text-white font-semibold cursor-default rounded-lg">Welcome, {user.username}</span>
                            <button onClick={handleLogout} className="block p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300">Logout</button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none" aria-expanded={isOpen}>
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 p-4 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
                <div className="flex flex-col space-y-4">
                    <Link to="/" onClick={() => setIsOpen(false)} className={getLinkClassName('/')}>Home</Link>
                    <Link to="/book" onClick={() => setIsOpen(false)} className={getLinkClassName('/book')}>Book</Link>
                    <Link to="/booked-cars" onClick={() => setIsOpen(false)} className={getLinkClassName('/booked-cars')}>Booked Cars</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className={getLinkClassName('/about')}>About</Link>
                    {!user ? (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className={getLinkClassName('/login')}>Login</Link>
                            <Link to="/signup" onClick={() => setIsOpen(false)} className={getLinkClassName('/signup')}>Signup</Link>
                        </>
                    ) : (
                        <>
                            <span className="p-3 bg-gray-800 text-white font-semibold cursor-default rounded-lg">Welcome, {user.username}</span>
                            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 rounded-lg">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

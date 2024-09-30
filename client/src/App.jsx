import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Admin from './pages/Admin';
import Book from './pages/Book'; 
import BookedCars from './pages/BookedCars';
import About from './pages/About';
import Login from './components/Login'; 
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen"> 
          <Navbar />
          <main className="flex-grow"> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/book" element={<ProtectedRoute><Book /></ProtectedRoute>} />
              <Route path="/booked-cars" element={<ProtectedRoute><BookedCars /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

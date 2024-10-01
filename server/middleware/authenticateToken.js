import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure you import the User model

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) return res.status(401).json({ message: 'Authorization token is missing' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' });

        // Find user by ID to ensure user exists
        try {
            const foundUser = await User.findById(user.id);
            if (!foundUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = foundUser; // Set req.user to the found user
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
};

export default authenticateToken;

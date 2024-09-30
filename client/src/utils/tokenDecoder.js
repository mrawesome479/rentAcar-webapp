import { jwtDecode } from 'jwt-decode'; // Import the jwtDecode function from the library

export const decodeToken = (token) => {
    try {
        const decoded = jwtDecode(token); // Decode the token
        const currentTime = Date.now() / 1000; // Get current time in seconds
        if (decoded.exp < currentTime) {
            return null; // Token is expired
        }
        return decoded; // Return the decoded token if it's valid
    } catch (error) {
        console.error("Token decoding failed:", error);
        return null;
    }
};

// utils/auth.js
export const getUserIdFromRequest = (req) => {
    // Assuming you use JWT, decode it to get the user ID
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId; // Assuming the payload contains userId
    } catch (error) {
        return null; // Handle token verification failure
    }
};


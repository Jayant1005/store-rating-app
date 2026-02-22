const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Look for the token in the Authorization header
    const authHeader = req.headers['authorization'];

    // 2. The header format is "Bearer <token>", so we split it to get just the token
    const token = authHeader && authHeader.split(' ')[1];

    // 3. If no token, kick them out immediately with a 401
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // 4. Verify the token using your secret key from your .env file
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Attach the decoded user payload (id, role, email) to the request object
        req.user = decoded;

        // 6. Move on to the actual route handler
        next();
    } catch (err) {
        // Token is tampered with or expired
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = verifyToken;

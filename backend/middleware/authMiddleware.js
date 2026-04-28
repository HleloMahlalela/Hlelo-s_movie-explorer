// This middleware protects routes that require authentication.
// It checks the request headers for a valid JWT token.
// If the token is valid, it attaches the user to the request
// and allows the request to continue to the route handler.
// If the token is missing or invalid, it returns a 401 error.

const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  // gets the token from the Authorization header
  // the header format is: "Bearer <token>"
  const authHeader = req.headers.authorization

  // checks if the Authorization header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, access denied' })
  }

  // extracts the token by removing the "Bearer " prefix
  const token = authHeader.split(' ')[1]

  try {
    // verifies the token using the JWT secret from .env
    // if valid, decoded contains the user data we stored in the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // attaches the decoded user data to the request object
    // so route handlers can access req.user
    req.user = decoded

    // moves on to the next middleware or route handler
    next()

  } catch (err) {
    // token is invalid or expired
    return res.status(401).json({ message: 'Invalid token, access denied' })
  }
}

module.exports = protect
// Handles user registration and login.
// Passwords are hashed with bcryptjs before storing.
// A JWT token is returned on successful register or login.

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

//generateToken
// creates a JWT token containing the user's id and username.
// the token expires based on JWT_EXPIRES_IN in .env
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
}

// registration
// POST /api/auth/register

// creates a new user account with a hashed password
const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // checks all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // checks if email already exists in the database
    const emailCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // checks if username already exists in the database
    const usernameCheck = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    )

    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken' })
    }

    // hash the password before storing it
    // 10 is the salt rounds — higher is more secure but slower
    const hashedPassword = await bcrypt.hash(password, 10)

    // inserts the new user into the database
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    )

    const newUser = result.rows[0]

    // returns the new user and a JWT token
    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(newUser),
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    })

  } catch (err) {
    console.error('Register error:', err.message)
    res.status(500).json({ message: 'Server error during registration' })
  }
}

// login
// POST /api/auth/login

// verifies user credentials and returns a JWT token
const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // checks all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // finds the user by email
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = result.rows[0]

    // compares the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // returns the user and a JWT token
    res.status(200).json({
      message: 'Login successful',
      token: generateToken(user),
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })

  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ message: 'Server error during login' })
  }
}

module.exports = { register, login }
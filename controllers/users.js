const {loginUser: loginUserQuery } = require('../queries/userQueries');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
    try {
        const userLoggedIn = await loginUserQuery(req.body)

        if (userLoggedIn?.error || !userLoggedIn) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: userLoggedIn.id }, SECRET, { expiresIn: '1h' });
        res.status(200).json({ user: userLoggedIn, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { loginUser };
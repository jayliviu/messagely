const User = require('../models/user');
const Message = require('../models/message');
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require(`../middleware/auth`)
const db = require('../db')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');


/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
**/

router.post(`/login`, async (req, res, next) => {
	try {

		const { username, password } = req.body

		const authenticated = await User.authenticate(username, password)

		if(!authenticated) {
			return next(new expressError(`Incorrect username or password`, 404))
		}

		await User.updateLoginTimestamp(username)

		const user = await User.get(username)

		const payload = {username: user.username}

		const token = jwt.sign(payload, SECRET_KEY)

		return res.json({token})

	} catch(error) {
		return next(error)
	}
})



/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, phone } = req.body;

    // Register new user
    await User.register({ username, password, firstName, lastName, phone });

    // Update last login timestamp
    await User.updateLoginTimestamp(username);

    // Create JWT token payload with the username
    const payload = { username };
    const token = jwt.sign(payload, SECRET_KEY);

    // Return token to user
    return res.json({ token });
    
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
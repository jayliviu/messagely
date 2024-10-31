const User = require('../models/user');
const Message = require('../models/message');
const expressError = require('../expressError')
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require(`../middleware/auth`)
const db = require('../db')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');


/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get(`/`, async(req, res, next) => {

	try {
		const results = await User.all()

		if(results.length === 0) {
			return next(new expressError(`Could not find any users`, 404))
		}

		return res.json({users: results})

	} catch(error) {
		return next(error)
	}
});


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get(`/:username`, ensureLoggedIn, ensureCorrectUser, async(req, res, next)=> {
	try {

		const { username } = req.params

		const user = await User.get(username)

		if(!user) {
			return next(new expressError(`Could not find the user you are looking for`, 404))
		}

		return res.json({user})

	} catch(error) {
		return next(error)
	}
});


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get(`/:username/to`, ensureLoggedIn, ensureCorrectUser, async(req, res, next) => {

	try {
		const {username} = req.params

		const user = await User.get(username)

		if(!user) {
			return next(new expressError(`Could not find user`, 404))
		}

		const to_user_messages = await User.messagesTo(username)

		if(to_user_messages.length === 0) {
			return res.json({messages: []})
		}

		return res.json({messages: to_user_messages})

	} catch(error) {
		return next(error)
	}
});


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/


router.get(`/:username/from`, ensureLoggedIn, ensureCorrectUser, async(req, res, next) => {

	try {
		const {username} = req.params

		const user = await User.get(username)

		if(!user) {
			return next(new expressError(`Could not find user`, 404))
		}

		const from_user_messages = await User.messagesFrom(username)

		if(from_user_messages.length === 0) {
			return res.json({messages: []})
		}

		return res.json({messages: from_user_messages})

	} catch(error) {
		return next(error)
	}

});

module.exports = router


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIzMSIsImlhdCI6MTczMDM1NjQxNn0.KXkRPAPaGg2x04Pv-gbe_ym0K-Qrqq_-NU_lNl3_UhE"
const User = require('../models/user');
const Message = require('../models/message');
const expressError = require('../expressError')
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require(`../middleware/auth`)
const db = require('../db')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id', async (req, res, next) => {
	try {

		const { id } = req.params

		const loggedInUser = req.user.username

		console.log(loggedInUser)

		const message = await Message.get(id)

		if(
			message.from_user.username !== loggedInUser &&
			message.to_user.username !== loggedInUser
		) {
			throw new expressError("Unauthorized: You do not have access to this message", 401);
		}

		return res.json({message})

	} catch(error) {
		return next(error)
	}
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post(`/`, ensureLoggedIn, async(req, res, next) => {
	try {

		const { to_username, body } = req.body

		const from_username = req.user.username

		console.log(from_username)

		const message = await Message.create({from_username, to_username, body})

		if(!message) {
			return next(new expressError(`Could not send you desired message`, 400))
		}

		return res.json({message})

	} catch(error) {
		return next(error)
	}
})

/** POST /:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await Message.get(id);

    if (!message) {
      return next(new expressError(`Message not found`, 404));
    }

    if (req.user.username !== message.to_user.username) {
      return next(new expressError(`Unauthorized: You are not the recipient of this message`, 401));
    }

    const result = await Message.markRead(id);

    return res.json({ message: result });

  } catch (error) {
    return next(error);
  }
});


module.exports = router
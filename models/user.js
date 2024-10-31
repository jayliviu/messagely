/** User class for message.ly */
const db =  require('../db')
const expressError = require('../expressError')
const bcrypt = require('bcrypt')
const { BCRYPT_WORK_FACTOR } = require('../config.js')
const moment = require('moment')

/** User of the site. */

class User {
	
	constructor({username, firstName, lastName, phone, joinAt}) {
		this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
		this.joinAt = joinAt;
  }
	
	static async get(username) { 
	
		const results = await db.query(`
			SELECT * FROM users
			WHERE username = $1
		`, [username])
	
		if(results.rows.length === 0) {
			throw new expressError(`Could not find the user you are looking for`, 404)
		} else {
			return new User(results.rows[0])
		}
	}

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, firstName, lastName, phone}) { 

		const hashed_password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

		const joinAt = moment().format(`YYYY-MM-DD HH:mm:ss`)

		const results = await db.query(`
			INSERT INTO users (username, password, first_name, last_name, phone, join_at)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *
		`, [username, hashed_password, firstName, lastName, phone,  joinAt])
		
		if(results.rows.length === 0) {
			throw new expressError(`Something went wrong during registration`, 404)
		} else {
			return new User(results.rows[0])
		}
	}

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 

		const results = await db.query(`
			SELECT password FROM users WHERE username = $1
		`, [username])

		const user = results.rows[0]

		if(user) {
			if(await bcrypt.compare(password, user.password)) {
				return true
			} else {
				throw new expressError(`Invalid Password`, 401)
			}
		} else {
			throw new expressError(`User not found`, 404)
		}

	}

  /** Update last_login_at for user */



  static async updateLoginTimestamp(username) { 

		const currentTimestamp = moment().format(`YYYY-MM-DD HH:mm:ss`);

		const results = await db.query(`
			UPDATE users
			SET last_login_at = $1
			WHERE username = $2
			RETURNING *
		`, [currentTimestamp, username])

		if(results.rows.length === 0) {
			throw new expressError(`Something went wrong updating the timestamp`, 401)
		} else {
			return true;
		}

	}

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
		const results = await db.query(`
			SELECT * FROM users;	
		`)

		if(results.rows.length === 0) {
			return [];
		} else {
			return results.rows
		}
	}

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
		const results = await db.query(`
			SELECT 
			m.id, 
			m.body, 
			m.sent_at, 
			m.read_at,
			u.username AS to_username,
			u.first_name AS to_first_name,
			u.last_name AS to_last_name,
			u.phone AS to_phone
			FROM 
				messages AS m
			JOIN 
				users AS u ON m.to_username = u.username
			WHERE 
				m.from_username = $1;
		`, [username])

		if(results.rows.length === 0) {
			return [];
		} else {
			return results.rows
		}
	}

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
		const results = await db.query(`
			SELECT
				m.id AS id,
				m.body AS body,
				m.sent_at AS sent_at,
				m.read_at AS read_at,
				u.username AS from_username,
				u.first_name AS from_first_name,
				u.last_name AS from_last_name,
				u.phone AS from_phone
			FROM 
				messages AS m
			JOIN 
				users AS u ON m.from_username = u.username
			WHERE 
				m.to_username = $1;
		`, [username])

		if(results.rows.length === 0) {
			return [];
		} else {
			return results.rows
		}
	}
}


module.exports = User;
const db = require('../models/database.js')
const bcrypt = require('bcrypt')


async function register (req, res) {
    const username = req.body.username
    const password = req.body.password
    
    // Hash user password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    try {
        await db.query(`
            INSERT INTO \`User\` (username, password)
            VALUES (?, ?)
        `, [username, passwordHash])
    } catch (e) {
        return res.json({success: false, message: e.toString()})
    }
    
    // Return result
    return res.json({success: true})
}


async function login (req, res) {
    const username = req.body.username
    const password = req.body.password
    
    console.log(username)
    console.log(password)
    
    // Get all users for this email
    const [users] = await db.query(`
        SELECT * 
        FROM \`User\` 
        WHERE username = ?
    `, [username])
    
    console.log(users)
    
    if (users.length == 0) {
        res.status(401).json({success: false})
        return
    }
    
    // Hash user password
    const match = await bcrypt.compare(password, users[0].password)
    
    // Return error
    return res.status(401).json({success: false})
}


async function logout (req, res) {
    req.session.destroy((err) =>{
        if (err) {
            return res.status(500).json({
                'error': 'Impossible to end the session',
            })
        }
        
		return res.json({'message': 'End of session'})
	})
}

module.exports.register = register
module.exports.login = login
module.exports.logout = logout
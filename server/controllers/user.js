const db = require('../models/database.js');
const bcrypt = require('bcrypt');


function hello (req, res) {
    console.log("Hello Routé !");
    return res.json({ message: 'Hello Routé !' });
}

async function register (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    // Hash user password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    try {
        await db.query(
            `
            INSERT INTO \`User\` (Username, Password)
            VALUES (?, ?)
        `,
            [username, passwordHash]
        );
        console.log('Registration Successful');
        return res.json({ success: true, message: 'Registration Successful' });
    } catch (e) {
        console.error(e);
        console.log('Registration Failed');
        return res.status(500).json({ success: false, message: 'Registration Failed' });
    }
}


async function login (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    const [users] = await db.query(
    `
        SELECT * 
        FROM \`User\` 
        WHERE Username = ?
    `, [username])
    
    console.log(users);
    
    if (users.length == 0) {
        return res.status(401).json({success: false});
       
    }
    
    // Password match
    const match = await bcrypt.compare(password, users[0].password);
    console.log(match);
    if (match) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false });
    }
}


async function logout (req, res) {
    req.session.destroy((err) =>{
        if (err) {
            console.log('Error: Impossible to end the session')
            return res.status(500).json({'Error': 'Impossible to end the session',})
        }
        console.log('End of ession')
		return res.json({'message': 'End of session'})
	})
}

module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;
module.exports.hello = hello;
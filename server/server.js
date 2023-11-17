const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js')
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

const PORT = 3001;

const app = express();

app.use(express.json())
app.use(express.static('public'))
app.use('/', routes.router)

// Create Session
app.use(session({
    store: new FileStore({
        path: './.sessions',
    }),
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

// User State
app.get('/', (req, res) => {
  res.send(`User : ${req.session.connected ? 'Connected' : 'Disconnected'}`);
});


//Connection
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'votre_nom_utilisateur' && password === 'votre_mot_de_passe') {
    req.session.connected = true;
    res.status(200).json({ message: 'Authentication Successful' });
  } else {
    res.status(401).json({ message: 'Authentication Failed' });
  }
});


//Disconnection
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Disconnection Error:', err);
      res.status(500).json({ message: 'Error Logging Out' });
    } else {
      res.status(200).json({ message: 'Logged Out Successfully' });
    }
  });
});


app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});
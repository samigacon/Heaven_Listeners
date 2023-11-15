const express = require("express")

//Controllers



// Access to Admin Routes
function isAuthenticated(req, res, next) {
    if (req.session && req.session.connected) {
        return next();
    } else {
        return res.status(401).json({error: '401 Unauthorized'});
    }
}

// Routes
const router = express.Router()




// Admin Routes



module.exports.router = router
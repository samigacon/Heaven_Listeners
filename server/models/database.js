const mysql2 = require('mysql2/promise');

let pool = mysql2.createPool({
    connectionLimit: 10000,
    host: "db.3wa.io",
    user: "samigacon",
    password: "5afbddad1ea2da1da65c0bcd8006603a",
    database: "samigacon_heaven_listeners",
});

module.exports = pool;
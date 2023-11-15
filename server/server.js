const express = require('express');
const routes = require('./routes/routes.js')
const PORT = 3001;


const app = express();


app.use(express.json()) 


app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((db) => {
    app.set('db', db)
}).catch(err => {console.log(err)});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}))

app.listen(SERVER_PORT, () => console.log(`Server is up and running on port ${SERVER_PORT}, Captain!`));
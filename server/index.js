require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const ctrl = require('./controller');

const app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((db) => {
    app.set('db', db)
    console.log("Database reporting for duty!")
}).catch(err => {console.log(err)});

app.post('/api/auth/register', ctrl.register);
app.post('/api/auth/login', ctrl.login);

app.listen(SERVER_PORT, () => console.log(`Server is up and running on port ${SERVER_PORT}, coach!`));
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user: 'postgres',
        password : 'passwd',
        database : 'facefinder'
    }
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {res.send(database.users);})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})


app.listen(3000, () => {
    console.log('App is running on port 3000')
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> Get = user
/image --> PUT --> user


*/

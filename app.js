require('dotenv').config({path: __dirname + '/.env'})
const axios = require('axios')

const db = require('./db')
const responseHelper = require('./response_helper')

const express = require("express");
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

app.post('/rpg', (req, res) => {
    const command = req.body.text;
    if(command == "list") {
        return db.getPlayers(req, res)
    }
    else if(command == "signup") {
        db.userExists(req.body.user_name).then(userExists => {
            if(userExists.rows[0].count == '0') {
                res.type("application/json")
                res.send(responseHelper.signupResponse)
            }
            else {
                res.send(responseHelper.simpleChannelMessage("You already have a character"))
            }
        });
    }

})

// used to validate slacks stupid ass api thing
app.post('/slack/events', (req, res) => {
    console.log(req.body)
    res.type("text/plain")
    res.send(req.body.challenge)
})

app.post('/menu', (req, res) => {
    const payload = JSON.parse(req.body.payload);
    // console.log(payload)
    username = payload.user.username;
    const selected_char = payload.actions[0].value
    db.signup(username, selected_char).then(userCreated => {
        axios.post(payload.response_url, responseHelper.simpleChannelMessage(`${selected_char} sucks`))
            .then(res => {
                console.log(`statusCode: ${res.status}`)
                // console.log(res)
            })
            .catch(error => {
                console.error(error)
            })
    })
    res.sendStatus(200)
})

module.exports = {
    app
}
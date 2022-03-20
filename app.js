require('dotenv').config({path: __dirname + '/.env'})
const db = require('./db')
const responseHelper = require('./response_helper')
const axios = require('axios')

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
    res.type("application/json")
    const response = responseHelper.signupResponse
    res.send(response)
})

// used to validate slacks stupid ass api thing
app.post('/slack/events', (req, res) => {
    console.log(req.body)
    res.type("text/plain")
    res.send(req.body.challenge)
})

app.post('/menu', (req, res) => {
    const payload = JSON.parse(req.body.payload)
    const selected_char = payload.actions[0].value
    console.log(payload.actions[0].value)
    message = {
            "response_type": "in_channel",
            "text": `${selected_char} sucks`
        }
    axios.post(payload.response_url, message)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
    res.send(200)
})
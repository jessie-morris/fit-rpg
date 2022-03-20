require('dotenv').config({path: __dirname + '/.env'})
const db = require('./db')
const responseHelper = require('./response_helper')
const axios = require('axios')

const url = "https://141f-65-60-175-56.ngrok.io";

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

// app.post('/rpg', db.getPlayers)

async function insertData() {
    const [name, color] = process.argv.slice(2);
    const res = await pool.query(
        "INSERT INTO players (name, color) VALUES ($1, $2)",
        [name, color]
      );
    console.log(`Added a shark with the name ${name}`);
}

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
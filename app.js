require('dotenv').config({path: __dirname + '/.env'})
const axios = require('axios')
const { Pool} = require('pg')

const url = "https://141f-65-60-175-56.ngrok.io";

const pool = new Pool({
  user: 'fitadmin',
  database: 'fit_rpg',
  password: 'fitadmin',
  port: 5432,
  host: 'localhost',
})


const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

app.post('/rpg', (req, res) => {
    res.type("application/json")
    const response = {
        "response_type": "in_channel",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "You've landed on a desolate planet, the only way to survive is to generate heat through exercise. \n  Please choose a character:"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Avatar 1"
                },
                "accessory": {
                    "type": "image",
                    "image_url": `${url}/avatar1.png`,
                    "alt_text": "Anderson"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Avatar 2"
                },
                "accessory": {
                    "type": "image",
                    "image_url": `${url}/avatar2.png`,
                    "alt_text": "Sindel"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Avatar 3"
                },
                "accessory": {
                    "type": "image",
                    "image_url": `${url}/avatar3.png`,
                    "alt_text": "alt text for image"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Avatar 1",
                            "emoji": true
                        },
                        "action_id": "avatar1_selected",
                        "value": "avatar1"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Avatar 2",
                            "emoji": true
                        },
                        "action_id": "avatar2_selected",
                        "value": "avatar2"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Avatar 3",
                            "emoji": true
                        },
                        "action_id": "avatar3_selected",
                        "value": "avatar3",
                    }
                ]
            }
        ]
    }
    res.send(response)
})

function get_users() {

}

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
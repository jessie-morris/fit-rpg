require('dotenv').config({path: __dirname + '/.env'})

const express = require("express")
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

app.post('/rpg', (req, res) => {
    console.log(req.body)
    res.type("application/json")
    const response = {
        "response_type": "in_channel",
        "text": "You fat",
        // "attachments": [
        //     {
        //         "text":"Partly cloudy today and tomorrow"
        //     }
        // ]
    }
    res.send(response)
})


// used to validate slacks stupid ass api thing
// app.post('/slack/events', (req, res) => {
//     console.log(req.body)
//     res.type("text/plain")
//     res.send(req.body.challenge)
// })
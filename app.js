require('dotenv').config({path: __dirname + '/.env'})

const { Pool} = require('pg')

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
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

app.post('/rpg', (req, res) => {
    console.log(req.body)

    pool.query('SELECT * FROM players ORDER BY username ASC', (error, results) => {
        if (error) {
          throw error
        }
        res.type("application/json")
        const response = {
            "response_type": "in_channel",
            "text": JSON.stringify(results.rows),
            "attachments": [
                {
                    "image_url": "https://cdn2.iconfinder.com/data/icons/ninja-element-1/64/Ninja-girl-sword-martial-fighter-512.png"
                }
            ]
        }
        res.send(response)
      })
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
// app.post('/slack/events', (req, res) => {
//     console.log(req.body)
//     res.type("text/plain")
//     res.send(req.body.challenge)
// })
const { Pool} = require('pg')

const url = "https://141f-65-60-175-56.ngrok.io";

const pool = new Pool({
    user: 'fitadmin',
    database: 'fit_rpg',
    password: 'fitadmin',
    port: 5432,
    host: 'localhost',
})

const getPlayers = (req, res) => {
    pool.query('SELECT * FROM players ORDER BY level DESC', (error, results) => {
        if (error) {
            throw error
        }
        var pretty_print = results.rows.map(item => ({text: item.username + ", Level " + item.level}));
        var response = {
            "response_type": "in_channel",
            "text": "The humble explorers",
            "attachments": pretty_print
        };
        res.status(200).json(response)
    })
}

// const getUserByUsername = (request, response) => {
//     const username = request.params.username
  
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
// }

module.exports = {
    getPlayers
}

const {Pool} = require('pg')

const url = "https://141f-65-60-175-56.ngrok.io";

const pool = new Pool({
    user: 'fitadmin',
    database: 'fit_rpg',
    password: 'fitadmin',
    port: 5432,
    host: 'localhost',
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
});

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
    });
}

const signup = async (username) => {
    userExists(username).then(foundUsers => {
        if(foundUsers.rows[0].count == '0') {
            pool.query('INSERT INTO players(username, level) VALUES($1, $2)', [username, 1], (error, results) => {
                if (error) {
                    throw error
                }
                return true;
            });
        }
        else {
            return false;
        }
    }).catch(err => console.error('Error executing query', err.stack))
}

const userExists = (username) => {
    console.log(username)
    return pool.query("SELECT COUNT(*) from players where username = $1", [username]);
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
    getPlayers,
    signup,
    userExists
}

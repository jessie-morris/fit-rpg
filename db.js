
listPlayers = async () => {
    pool.query('SELECT * FROM players ORDER BY username ASC', (error, results) => {
        if (error) {
          throw error
        }
        return results.rows;
    })
}


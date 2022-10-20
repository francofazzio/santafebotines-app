const knex = require('knex')

const configSQLite3 = {
    client: "sqlite3",
    connection: { filename: '../chatdb.sqlite' },
    useNullAsDefault: true
}

const databaseConnection = knex(configSQLite3)

module.exports = databaseConnection
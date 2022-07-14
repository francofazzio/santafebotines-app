const knex = require('knex')
const path = require('path')

const config = {
    client: 'mysql',    
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'santafebotines'
    },
    pool: { min: 0, max: 7 }
}


const configSql3 = {
    client: 'sqlite3',
    connection: {
        fileName : path.join(__dirname, "./DB/santafebotines.sqlite")
    },
    useNullAsDefault : true
}

const dataProduct = knex(config)
const dataMsg = knex(configSql3)


module.exports = { dataMsg  , dataProduct }
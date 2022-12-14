var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : 'localhost',
        user : 'root',
        password : '123456',
        database : 'prescricaodb'
     }
});
module.exports = knex
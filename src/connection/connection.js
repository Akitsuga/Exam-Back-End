const mysql = require('mysql')


const conn = mysql.createConnection({
    user: 'devuser',
    password: 'MySQL123', 
    host: 'localhost', 
    database: 'ujianbackend', 
    port:'3306'
})

module.exports = conn
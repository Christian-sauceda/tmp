const mysql = require('mysql');

const mysqlconnection = mysql.createConnection({
    host: '142.44.161.115',
    user: 'multimedia',
    password: 'Tmp##44.98',
    database: 'tmp-multimedia',
    multipleStatements: true
});

mysqlconnection.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Connected to database');
    }
});

module.exports = mysqlconnection;
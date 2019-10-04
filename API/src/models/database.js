module.exports = app => {
    const host = "localhost";
    const usuario = "root";
    const senha = "";
    const db = "db_quiz";
    const mysql = require("mysql");

    var pool = mysql.createPool({ 
        host : host, 
        user : usuario, 
        password : senha, 
        database : db, 
        connectionLimit : 10
    });

    pool.getConnection(function (err, conn) {
         if (err) 
            return 400;
    });
    return pool;    


};
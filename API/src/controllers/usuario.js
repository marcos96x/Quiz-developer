const database = require("../models/database")()

exports.usuario = (req, res) => {
    let nm_usuario = req.body.nm_usuario
    let score = req.body.score
    let data = new Date()
    let hora = data.getHours()
    let minuto = data.getMinutes()
    let segundo = data.getSeconds()
    let hr_jogada = hora + ":" + minuto + ":" + segundo
    database.query("INSERT INTO tb_usuario VALUES (DEFAULT, ?, ?, ?)", [nm_usuario, hr_jogada, score], (err, rows, fields) => {
        if(err){
            return res.status(403).send({err: err}).end()
        }else{
            return res.status(200).send({msg: "ok"}).end()
        }
    })
}

exports.score = (req, res) => {
    let sql = "SELECT * FROM tb_usuario ORDER BY score_usuario DESC LIMIT 10"
    database.query(sql, (err, rows, fields) => {
        if(err){
            return res.status(403).send({err: err}).end()
        }else{
            return res.status(200).send({ranking: rows}).end()
        }
    })
    
}
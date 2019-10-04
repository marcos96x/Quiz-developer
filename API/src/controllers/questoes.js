const database = require("../models/database")()

exports.questoes = (req, res) => {
    let ids = req.body.id_questoes
    let sql = "SELECT * FROM tb_questao WHERE "
    for(let i = 0; i < ids.length; i++){
        if(i == ids.length - 1){
            sql += "id_questao = " + ids[i] + ";"
        }else{
            sql += "id_questao = " + ids[i] + " OR "
        }
    }
    database.query(sql, (err, rows, fields) => {
        if(err){
            return res.status(403).send({err: err}).end()
        }else{
            return res.status(200).send({questoes: rows})
        }
    })
}
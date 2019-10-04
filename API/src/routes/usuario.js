module.exports = app => {
    const controllerUsuario = require("../controllers/usuario")
    
    app.post("/usuario", controllerUsuario.usuario)
    app.get("/score", controllerUsuario.score)
}
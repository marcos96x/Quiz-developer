module.exports = app => {
    const controllerQuestoes = require("../controllers/questoes")
    
    app.post("/questoes", controllerQuestoes.questoes)
}
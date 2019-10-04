let questao_radio = 1
let tempo
let score = 0 
let id_questoes_aleatoria = []
let questoes
let aleatorio1 = []

$(document).ready(() => {  
    $("#quiz").hide()
    carrega_score()
})

function gera_questoes_aleatorias(){
    let valor = Math.floor(Math.random() * 10 + 1)
    if(id_questoes_aleatoria.indexOf(valor) == -1){
        id_questoes_aleatoria.push(valor)
    }else{
        gera_questoes_aleatorias()
    }

}

function inicia_quiz(){
    id_questoes_aleatoria = []
    $("#score_usuario").html("SCORE: " + score)
    tempo = 16
    $("#index").fadeOut(1200, function(){
        $("#quiz").fadeIn(1000)
    })
    cronometro()    
    for(let i = 0; i < 10; i++)
        gera_questoes_aleatorias()
    //carrega as questões de forma aleatoria
    let url = "http://localhost:3000/questoes"
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({
            id_questoes: id_questoes_aleatoria
        }),
        contentType: "application/json"
    }).done(function(res){
        if(res.err){
            alert(res.err)
        }else{
            questoes = res.questoes
            let indice
            for(let i = 1; i <= 10; i++){                
                indice = id_questoes_aleatoria[i - 1]
                aleatorio1.push(questoes[indice - 1])

            }
            
            //console.log(aleatorio1)
            let perguntas = document.getElementById("perguntas")
            perguntas.innerHTML = `<h4>${aleatorio1[0].pergunta}</h4>
            <p>
                <label>
                    <input class="with-gap" value="1" name="alternativas" type="radio" />
                    <span>${aleatorio1[0].alternativa_1}</span>
                </label>
            </p>
            <p>
                <label>
                    <input class="with-gap" value="2" name="alternativas" type="radio" />
                    <span>${aleatorio1[0].alternativa_2}</span>
                </label>
            </p>
            <p>
                <label>
                    <input class="with-gap" value="3" name="alternativas" type="radio" />
                    <span>${aleatorio1[0].alternativa_3}</span>
                </label>
            </p>
            <p>
                <label>
                    <input class="with-gap" value="4" name="alternativas" type="radio" />
                    <span>${aleatorio1[0].alternativa_4}</span>
                </label>
            </p>`
        }
    })
}

function carrega_score(){
    let url = "http://localhost:3000/score"
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json"
    }).done(function(res){
        if(res.err){
            alert(res.err)
        }else{
            let ranking = res.ranking
            let campo_ranking = document.getElementById("ranking")
            for(let i = 0; i < 10; i++){
                campo_ranking.innerHTML += `<tr>
                        <td>${ranking[i].nm_usuario}</td>
                        <td>${ranking[i].hr_jogada}</td>
                        <td>${ranking[i].score_usuario}</td>
                    </tr>
                    `
            }
        }
    })
}

function insere_usuario(){
    let url = "http://localhost:3000/usuario"
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({
            nm_usuario: $("#nome").val(),
            score: score
        }),
        contentType: "application/JSON"
    }).done(function(res){
        if(res.err){
            alert(res.err)
        }else{
            alert("Até a proxima!")
        }
    })
}

function cronometro(){
    let tmp = document.getElementById("tempo")
    tmp.innerHTML = "Tempo restante em segundos: " + tempo
    setTimeout(function(){
        tempo--
        if(tempo >= 0) {
            cronometro()
        }else{
            erro()
        }
    }, 1000) 
}

function renderiza_questao(){
    // proxima questão
    questao_radio ++
    let atributo_nome = "group" + questao_radio
    let questao = document.getElementsByName(atributo_nome)[0]
    questao.checked = true
    $("#perguntas").fadeOut(300, function(){
        let perguntas = document.getElementById("perguntas")
        perguntas.innerHTML = `<h4>${aleatorio1[questao_radio - 1].pergunta}</h4>
            <p>
                <label>
                    <input class="with-gap" value="1" name="alternativas" type="radio" />
                    <span>${aleatorio1[questao_radio - 1].alternativa_1}</span>
                </label>
            </p>
            <p>
                <label>
                    <input class="with-gap" value="2" name="alternativas" type="radio" />
                    <span>${aleatorio1[questao_radio - 1].alternativa_2}</span>
                </label>
            </p>
            <p>
                <label>
                    <input class="with-gap" value="3" name="alternativas" type="radio" />
                    <span>${aleatorio1[questao_radio - 1].alternativa_3}</span>
                </label>
            </p>
            <p>
                <label>
                    <input class="with-gap" value="4" name="alternativas" type="radio" />
                    <span>${aleatorio1[questao_radio - 1].alternativa_4}</span>
                </label>
            </p>`
        $("#perguntas").fadeIn(300)
    })

    return false
}

function escolha(){  
    let alternativas = document.getElementsByName("alternativas")
    for(let i = 0; i < alternativas.length; i++){
        if(alternativas[i].checked == true){
            alternativas[i].checked = false
            if(alternativas[i].value == aleatorio1[questao_radio - 1].resposta){
                acerto()
            }else{
                erro()
            }           
        }
    }
}
function acerto(){
    score += questao_radio + tempo
    
    $("#score_usuario").html("SCORE: " + score)
    tempo = 16
    if(questao_radio == 10){
        alert("Parabens, "+$("#nome").val()+", voce venceu! Sua pontuação é de " + score + " pontos!")
        alert("Obrigado por participar do nosso quiz!")
        insere_usuario()
        questao_radio = 1
        id_questoes_aleatoria = []
        score = 0
        questoes = null
        let atributo_nome
        for(let i = 2; i < 11; i++){
            atributo_nome = "group" + i
            document.getElementsByName(atributo_nome)[0].checked = false
        }
        $("#quiz").fadeOut(1200)        
        window.location.reload()
        $("#index").show(1000)
    }else{
        renderiza_questao()
    }
    
}
function erro(){
    tempo = 15
    questao_radio = 1
    let atributo_nome
    for(let i = 2; i < 11; i++){
        atributo_nome = "group" + i
        document.getElementsByName(atributo_nome)[0].checked = false
    }
    alert("Que pena, "+$("#nome").val()+", voce perdeu! Seu score é de " + score + " pontos!")
    window.location.reload()
    return false
}
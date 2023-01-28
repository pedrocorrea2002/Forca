const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var teclaApertada = ""
var round = 0

function startGame() {
    document.getElementById('playButton').innerText = "Resetar"

    //* DECLARANDO VARIÁVEIS
    var secretaArray = []
    var ultimaTeclaApertada = ""
    var chances = 5
    teclaApertada = ""

    //* ITENS DO FRONT-END
    const front_valorChances = document.getElementById('tentativas')
    const front_palavraSecreta = document.getElementById('palavra')
    const front_letrasTentadas = document.getElementById('letras_tentadas')
    const front_caixaLetras = document.getElementById('caixa_de_letras')
    const front_mensagem = document.getElementById('mensagem')

    //* ZERANDO CAMPOS DO FRONT
    front_palavraSecreta.innerHTML = ""
    front_letrasTentadas.innerHTML = ""
    front_caixaLetras.innerHTML = ""
    front_mensagem.innerHTML = ""

    //* ADICIONADNO BOTÕES DE LETRAS
    letras.forEach(l => {
        front_caixaLetras.innerHTML += `<button id="botao_${l}" class="letra" onClick='teclaApertada = "${l}"'>${l.toUpperCase()}</button>`
    })

    //* PEGANDO CATEGORIA ESCOLHIDA
    const categoria_palavra = document.getElementById('category').value

    //* PREENCHENDO CHANCES
    front_valorChances.innerText = `Tentativas restantes: ${chances}`

    //* PEGANDO UMA PALAVRA ALEATÓRIO DA CATEGORIA ESCOLHIDA
    const secreta = utils.shuffle(utils.listaCompleta[categoria_palavra])[0]

    //* COLOCANDO ESPAÇOS EM BRANCO NA TELA
    for (y in secreta) {
        secretaArray.push(secreta[y])
        front_palavraSecreta.innerHTML += "<p class='espaco'></p>"
    }

    //* USANDO PARA IDENTIFICAR E ENCERRAR O ROUND QUE NÃO É O ATUAL, EVITANDO QUE O ROUND ANTIGO CONTINUE EM EXECUÇÃO MESMO APÓS TER SIDO INICIADO OUTRO
    round++
    const round_id = round

    //* ENTRANDO EM LOOP PARA "ESCUTAR" SE O JOGADOR APERTAR EM ALGUM BOTÃO
    function loop(round_id) {
        setTimeout(() => {
            console.log(`${teclaApertada} -- ${ultimaTeclaApertada}`)

            if (ultimaTeclaApertada != teclaApertada) {
                ultimaTeclaApertada = teclaApertada
                document.getElementById(`botao_${teclaApertada}`).disabled = true
                document.getElementById(`botao_${teclaApertada}`).className = "letra_disabled"

                utils.input(teclaApertada,secretaArray,secreta)
            }

            if(round_id == round){   
                loop(round_id)
            }else{
                console.log(round_id," finalizado")
            }
        }, 500)
    }

    loop(round_id)
}

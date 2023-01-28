const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var teclaApertada = ""

function startGame() {
    document.getElementById('playButton').innerText = "Resetar"

    //* DECLARANDO VARIÁVEIS
    var secretaArray = []
    var ultimaTeclaApertada = ""
    var chances = 3

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

    function loop() {
        setTimeout(() => {
            console.log(`${teclaApertada} -- ${ultimaTeclaApertada}`)

            if (ultimaTeclaApertada != teclaApertada) {
                document.getElementById(`botao_${teclaApertada}`).disabled = true
                document.getElementById(`botao_${teclaApertada}`).className = "letra_disabled"
                ultimaTeclaApertada = teclaApertada

                utils.input(teclaApertada,secretaArray,secreta)
            }

            loop()
        }, 500)
    }

    loop()
}
//* DECLARANDO VARIÁVEIS
var listaPalavras = utils.shuffle(utils.listaCompleta["animais brasileiros"])
var  secreta = listaPalavras[0]
var digitadas = []
var secretaArray = []
var chances = 3
const letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

//* ITENS DO FRONT-END
const front_valorChances = document.getElementById('tentativas')
const front_palavraSecreta = document.getElementById('palavra')
const front_letrasTentadas = document.getElementById('letras_tentadas')
const front_caixaLetras = document.getElementById('caixa_de_letras')
const front_mensagem = document.getElementById('mensagem')

//* PREENCHENDO CHANCES
front_valorChances.innerText = `Tentativas restantes: ${chances}`

//* COLOCANDO ESPAÇOS EM BRANCO NA TELA
for(y in secreta){  
    secretaArray.push(secreta[y])
    front_palavraSecreta.innerHTML += "<p class='espaco'></p>"
} 

//* ADICIONADNO BOTÕES DE LETRAS
letras.forEach(l => {
    front_caixaLetras.innerHTML += `<button id="botao_${l}" class="letra" onClick='input("${l}")')'>${l.toUpperCase()}</button>`
})


function input(letra){
    document.getElementById(`botao_${letra}`).disabled = true
    document.getElementById(`botao_${letra}`).className = "letra_disabled"

    digitadas.push(letra)

    if(chances == 0){
        front_mensagem.innerText = 'Você não pode mais jogar, deu mole'
        return
    }

    if(letra.size > 1){
        front_mensagem.innerText = 'Você deve informar somente uma letra'
        return
    }

    if(secretaArray.includes(letra)){
        front_mensagem.innerText = 'Você acertou uma letra'
        front_mensagem.style.color = "green"

        front_letrasTentadas.innerText = digitadas.map(x => x.toUpperCase()).join(" - ")
    }else{
        front_mensagem.innerText = 'Você errou uma letra'
        front_mensagem.style.color = "red"

        front_letrasTentadas.innerText = digitadas.map(x => x.toUpperCase()).join(" - ")
        chances -= 1
    }

    let descoberto = ''

    front_palavraSecreta.innerHTML = ""
    for(x in secreta){
        if(digitadas.includes(secreta[x])){
            front_palavraSecreta.innerHTML += `<p class='espaco'>${secreta[x]}</p>`
            descoberto += secreta[x]
        }else{
            front_palavraSecreta.innerHTML += "<p class='espaco'></p>"
            descoberto += "*"
        }
    }

    console.log(`${descoberto} -- ${secreta}`)
    if(descoberto == secreta){
        front_mensagem.innerText = `Você acertou, meus parabéns, a palavra era "${secreta}"`
        front_mensagem.style.color = "green"

        console.log(document.getElementsByClassName("letra"))
        console.log(typeof(document.getElementsByClassName("letra")))

        const todas_letras = Array.prototype.slice.call(document.getElementsByClassName("letra"))
        todas_letras.map(x => x.disabled = true)
        todas_letras.map(x => x.className = "letra_disabled")
        return
    }

    if(chances > 0){
        front_valorChances.innerText = `Tentativas restantes: ${chances}`
    }else{
        front_mensagem.innerText = 'Suas chances acabaram'
        front_mensagem.style.color = "red"
    }
};
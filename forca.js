var listaPalavras = ['arroz','alface','couve','cenoura','batata','atum','alho','cebola']

//* EMBARALHANDO LISTA DE OPÇÕES
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


listaPalavras = shuffle(listaPalavras)

var  secreta = listaPalavras[0]
var digitadas = []
var secretaArray = []
var chances = 3
document.getElementById('tentativas').innerText = `Tentativas restantes: ${chances}`

//* COLOCANDO ESPAÇOS EM BRANCO NA TELA
for(y in secreta){
    secretaArray.push(secreta[y])
    document.getElementById('palavra').innerHTML += "<p class='espaco'></p>"
}

//* ADICIONADNO BOTÕES DE LETRAS
var letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
letras.forEach(l => {
    document.getElementById('caixa_de_letras').innerHTML += `<div class="letra" onClick='input("${l}")')'>${l.toUpperCase()}</div>`
})


function input(letra){
    console.log(letra)

    if(chances == 0){
        console.log('Você não pode mais jogar, deu mole')
        return
    }

    if(letra.size > 1){
        console.log('Você deve informar somente uma letra')
        return
    }

    if(secretaArray.includes(letra)){
        console.log('Você acertou uma letra')
        digitadas.push(letra) 
    }else{
        console.log('Você errou uma letra')
        chances -= 1
    }

    let descoberto = ''

    console.log(secreta.length)

    document.getElementById('palavra').innerHTML = ""
    for(x in secreta){
        if(digitadas.includes(secreta[x])){
            document.getElementById('palavra').innerHTML += `<p class='espaco'>${secreta[x]}</p>`
        }else{
            document.getElementById('palavra').innerHTML += "<p class='espaco'></p>"
        }
    }

    if(descoberto == secreta){
        console.log('Você acertou, meus parabéns, a palavra era ', descoberto)
        return
    }

    if(chances > 0){
        console.log(`A palavra atualmente está como: ${descoberto} e você tem ${chances} chances restantes`)
        document.getElementById('tentativas').innerText = `Tentativas restantes: ${chances}`
    }else{
        console.log('Suas chances acabaram')
    }
};
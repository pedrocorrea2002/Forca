const utils = {};

(function () {
  //* EMBARALHANDO LISTA DE OPÇÕES
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  //* FUNÇÃO QUE PROCESSA A LETRA DIGITADA E DIZ SE ELA EXISTE OU NA PALAVRA SECRETA
  function input(letra,secretaArray,secreta) {
    //* DESATIVANDO BOTÃO ESCOLHIDO
    document.getElementById(`botao_${letra}`).disabled = true
    document.getElementById(`botao_${letra}`).className = "letra_disabled"

    //* PEGANDO NÚMERO DE CHANCES RESTANTE E LETRAS QUE JÁ FORAM DIGITADAS
    var digitadas = document.getElementById('letras_tentadas').textContent
    var chances = document.getElementById('tentativas').textContent
    chances = Number(chances[chances.length - 1]) 

    //* CONVERTENDO LISTA DE LETRAS DIGITADAS EM ARRAY
    if(digitadas != ""){
      digitadas = digitadas.split(" - ")
    }else{
      digitadas = []
    }

    //* ITENS DO FRONT-END
    const front_mensagem = document.getElementById('mensagem')
    const front_letrasTentadas = document.getElementById('letras_tentadas')
    const front_palavraSecreta = document.getElementById('palavra')
    const front_valorChances = document.getElementById('tentativas')

    
    //* VENDO SE O JOGADOR AINDA POSSUI CHANCES
    if (chances == 0) {
      front_mensagem.innerText = 'Você não pode mais jogar, deu mole'
      return
    }

    //* ADICIONANDO LETRA
    digitadas.push(letra)

    //* VENDO SE A LETRA INFORMADA NÃO MANIPULADA PARA SER UMA PALAVRA
    if (letra.size > 1) {
      front_mensagem.innerText = 'Você deve informar somente uma letra'
      return
    }

    //* VERIFICANDO SE A PALAVRA SECRETA POSSUI ESSA LETRA
    if (secretaArray.includes(letra)) {
      front_mensagem.innerText = 'Você acertou uma letra'
      front_mensagem.style.color = "green"

      front_letrasTentadas.innerText = digitadas.join(" - ")
    } else {
      front_mensagem.innerText = 'Você errou uma letra'
      front_mensagem.style.color = "red"

      front_letrasTentadas.innerText = digitadas.join(" - ")
      chances -= 1
    }

    let descoberto = '' //? CONTEM O QUE FOI DESCOBERTO ATÉ ENTÃO

    //* PREENCHENDO ESPAÇOS COM A NOVA LETRA EM SUAS POSIÇÕES, CASO ELA EXISTIR NA PALAVRA SECRETA
    front_palavraSecreta.innerHTML = ""
    for (x in secreta) {
      if (digitadas.includes(secreta[x])) {
        front_palavraSecreta.innerHTML += `<p class='espaco'>${secreta[x]}</p>`
        descoberto += secreta[x]
      } else {
        front_palavraSecreta.innerHTML += "<p class='espaco'></p>"
        descoberto += "*"
      }
    }

    //* VENDO SE A PALAVRA JÁ FOI TODA DESCOBERTA
    if (descoberto == secreta) {
      front_mensagem.innerText = `Você acertou, meus parabéns, a palavra era "${secreta}"`
      front_mensagem.style.color = "green"

      const todas_letras = Array.prototype.slice.call(document.getElementsByClassName("letra"))
      todas_letras.map(x => x.disabled = true)
      todas_letras.map(x => x.className = "letra_disabled")
      return
    }

    //* VENDO SE AINDA EXISTEM CHANCES RESTANTES
    if (chances > 0) {
      front_valorChances.innerText = `Tentativas restantes: ${chances}`
    } else {
      front_mensagem.innerText = 'Suas chances acabaram'
      front_mensagem.style.color = "red"

      const todas_letras = Array.prototype.slice.call(document.getElementsByClassName("letra"))
      todas_letras.map(x => x.disabled = true)
      todas_letras.map(x => x.className = "letra_disabled")

      front_valorChances.innerText = `Tentativas restantes: ${chances}`
    }
  };

  //* LISTA DE CATEGORIAS E PALAVRAS
  const listaCompleta = {
    "alimentos": ['arroz', 'alface', 'couve', 'cenoura', 'batata', 'atum', 'alho', 'cebola'],
    "animais brasileiros": ['jacaranbeva', 'cateto', 'tatu', 'queixada', 'jacare', 'boto', 'tamandua', 'arara'],
    "pokemon": ["magneton","nidoran"," haunter","bulbasaur","jynx","dratini","flaaffy","elekid","slowking","unown","wobbuffet","girafarig","kirlia","medichan","aron","glalie","registeel","banette","shinx","prinplup","turtwig","blissey","canivine","heatran"]
  }

  utils.shuffle = shuffle;
  utils.listaCompleta = listaCompleta;
  utils.input = input;
})()

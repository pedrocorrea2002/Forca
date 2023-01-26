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

  const listaCompleta = {
    "alimentos": ['arroz', 'alface', 'couve', 'cenoura', 'batata', 'atum', 'alho', 'cebola'],
    "animais brasileiros": ['jacaranbeva', 'cateto', 'tatu', 'queixada', 'jacare', 'boto', 'tamandua', 'arara']
  }

  utils.shuffle = shuffle;
  utils.listaCompleta = listaCompleta;
})()

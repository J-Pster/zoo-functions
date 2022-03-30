const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const especieEscolhida = data.species.find((element) => element.name === animal);
  return especieEscolhida.residents.every((element) => element.age >= age);
}

module.exports = getAnimalsOlderThan;

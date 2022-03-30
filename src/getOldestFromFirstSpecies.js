const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const employer = data.employees.find((employ) => employ.id === id);
  const firstSpecieResp = data.species.find((animal) => animal.id === employer.responsibleFor[0]);
  const orderedAnimalsFromSpecie = firstSpecieResp.residents.sort((n1, n2) => n2.age - n1.age);
  const { name, sex, age } = orderedAnimalsFromSpecie[0];
  return [name, sex, age];
}

module.exports = getOldestFromFirstSpecies;

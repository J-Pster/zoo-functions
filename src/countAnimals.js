const data = require('../data/zoo_data');

const findSpecieResidentsByName = (name) => {
  const { residents } = data.species.find((dataAnimal) => dataAnimal.name === name);
  return residents;
};

function countAllAnimals() {
  const result = {};
  data.species.forEach((specie) => {
    result[specie.name] = specie.residents.length;
  });
  return result;
}

function countAnimals(animal) {
  let result = 0;
  if (!animal) {
    return countAllAnimals();
  }

  if (!animal.sex) {
    result = findSpecieResidentsByName(animal.specie).length;
    return result;
  }

  const residents = findSpecieResidentsByName(animal.specie);
  residents.forEach((resident) => {
    if (resident.sex === animal.sex) result += 1;
  });
  return result;
}

module.exports = countAnimals;

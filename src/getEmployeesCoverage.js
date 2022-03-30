const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  const find = data.employees.find((element) => element.firstName === employeeName
  || element.lastName === employeeName);
  if (find !== undefined) return find;
  throw new Error('Informações inválidas');
}

const getEmplyById = (id) => {
  const result = data.employees.find((element) => element.id === id);
  if (result !== undefined) return result;
  throw new Error('Informações inválidas');
};

const verifyIfItsAEmploy = (employBasic) => {
  if (!employBasic) return false;
  const id = Object.prototype.hasOwnProperty.call(employBasic, 'id');
  const name = Object.prototype.hasOwnProperty.call(employBasic, 'name');
  if (id) return getEmplyById(employBasic.id);
  if (name) return getEmployeeByName(employBasic.name);
};

const getSpecies = (id) => {
  const result = data.species.filter((specie) => id.some(((respId) => respId === specie.id)));
  return result;
};

const getSpeciesName = (id) => {
  const result = getSpecies(id);
  return result.map((resultedSpecie) => `${resultedSpecie.name}`);
};

const getSpeciesLocation = (id) => {
  const result = getSpecies(id);
  return result.map((resultedSpecie) => `${resultedSpecie.location}`);
};

const generateEmployInfo = (chose) => ({
  id: chose.id,
  fullName: `${chose.firstName} ${chose.lastName}`,
  species: getSpeciesName(chose.responsibleFor),
  locations: getSpeciesLocation(chose.responsibleFor),
});

const generateAllEmployInfo = () => {
  const result = [];
  data.employees.forEach((employ) => result.push(generateEmployInfo(getEmplyById(employ.id))));
  return result;
};

function getEmployeesCoverage(employBasic) {
  try {
    const chose = verifyIfItsAEmploy(employBasic);
    // Nada
    if (!chose) return generateAllEmployInfo();
    // Funcionario
    return generateEmployInfo(chose);
  } catch (error) {
    throw error.message;
  }
}

module.exports = getEmployeesCoverage;

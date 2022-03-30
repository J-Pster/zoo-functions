const data = require('../data/zoo_data');

const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
const managers = [stephanieId, olaId, burlId];

const getEmplyById = (id) => data.employees.find((element) => element.id === id);
function getResponsibles(employ) {
  return data.employees.filter((emp) => emp.managers.some((man) => man === employ.id));
}

function isManager(id) {
  const employ = getEmplyById(id);
  return managers.some((man) => employ.id === man);
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  const employ = getEmplyById(managerId);
  const responsibleFor = getResponsibles(employ);
  const responsibleNames = [];
  responsibleFor.forEach((elet) => responsibleNames.push(`${elet.firstName} ${elet.lastName}`));
  return responsibleNames;
}

module.exports = { isManager, getRelatedEmployees };

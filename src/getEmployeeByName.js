const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  let result = {};
  const find = data.employees.find((element) => element.firstName === employeeName
  || element.lastName === employeeName);
  if (find !== undefined) result = find;
  return result;
}

module.exports = getEmployeeByName;

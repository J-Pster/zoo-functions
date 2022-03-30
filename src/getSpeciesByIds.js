const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const result = [];
  ids.forEach((id) => result.push(data.species.find((elet) => elet.id === id)));
  return result;
}

module.exports = getSpeciesByIds;

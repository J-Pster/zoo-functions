const data = require('../data/zoo_data');

const filterSpeciesPerRegion = (region, sex) => {
  const result = data.species.filter((species) => species.location === region);
  return result;
};

const getAnimalFromRegion = (region) => {
  const filteredSpecies = filterSpeciesPerRegion(region);
  return filteredSpecies.map((specie) => `${specie.name}`);
};

const getSimpleAnimalMap = () => ({
  NE: getAnimalFromRegion('NE'),
  NW: getAnimalFromRegion('NW'),
  SE: getAnimalFromRegion('SE'),
  SW: getAnimalFromRegion('SW'),
});

const sortNames = (names, sort) => {
  if (sort) return names.sort();
  return names;
};

const getResidentsNames = (residents, sort, sex) => {
  const result = [];
  residents.forEach((res) => {
    if (sex && res.sex === sex) result.push(res.name);
    if (!sex) result.push(res.name);
  });
  return sortNames(result, sort);
};

const getNamedAnimalsFromRegion = (region, sort, sex) => {
  const result = [];
  const filteredSpecies = filterSpeciesPerRegion(region);
  filteredSpecies.forEach((element) => {
    const resultObject = {};
    resultObject[`${element.name}`] = getResidentsNames(element.residents, sort, sex);
    result.push(resultObject);
  });
  return result;
};

const getComplexAnimalMap = (sort, sex) => ({
  NE: getNamedAnimalsFromRegion('NE', sort, sex),
  NW: getNamedAnimalsFromRegion('NW', sort, sex),
  SE: getNamedAnimalsFromRegion('SE', sort, sex),
  SW: getNamedAnimalsFromRegion('SW', sort, sex),
});

const returnSimple = (options) => {
  if (!options) return getSimpleAnimalMap();
  if (!Object.prototype.hasOwnProperty.call(options, 'includeNames')) return getSimpleAnimalMap();
  return false;
};

const returnComplex = (options) => {
  const sorted = Object.prototype.hasOwnProperty.call(options, 'sorted');
  const sex = Object.prototype.hasOwnProperty.call(options, 'sex');
  if (!sorted && sex) return getComplexAnimalMap(false, options.sex);
  if (sorted && !sex) return getComplexAnimalMap(true, false);
  return false;
};

const returnComplexAllNothing = (options) => {
  const sorted = Object.prototype.hasOwnProperty.call(options, 'sorted');
  const sex = Object.prototype.hasOwnProperty.call(options, 'sex');
  if (sorted && sex) return getComplexAnimalMap(true, options.sex);
  return getComplexAnimalMap(false, false);
};

function getAnimalMap(options) {
  const simpleReturn = returnSimple(options);
  if (simpleReturn) return simpleReturn;
  const complexReturn = returnComplex(options);
  if (complexReturn) return complexReturn;
  const complexAllNothingReturn = returnComplexAllNothing(options);
  if (complexAllNothingReturn) return complexAllNothingReturn;
}

module.exports = getAnimalMap;

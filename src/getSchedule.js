const data = require('../data/zoo_data');

const days = Object.keys(data.hours);
const animals = data.species.map((specie) => `${specie.name}`);
const zooClosed = 'The zoo will be closed!';
const mondayClosed = {
  Monday: { officeHour: 'CLOSED', exhibition: zooClosed },
};

const returnOpenFrom = (day) => {
  const result = `Open from ${data.hours[day].open}am until ${data.hours[day].close}pm`;
  return result;
};

const returnAnimals = (day) => {
  const filteredSpecies = data.species.filter((specie) => {
    const isAvali = specie.availability.some((aval) => aval === day);
    return isAvali;
  });
  return filteredSpecies.map((specie) => `${specie.name}`);
};

const getAllSchedule = () => ({
  Tuesday: { officeHour: returnOpenFrom('Tuesday'), exhibition: returnAnimals('Tuesday') },
  Wednesday: { officeHour: returnOpenFrom('Wednesday'), exhibition: returnAnimals('Wednesday') },
  Thursday: { officeHour: returnOpenFrom('Thursday'), exhibition: returnAnimals('Thursday') },
  Friday: { officeHour: returnOpenFrom('Friday'), exhibition: returnAnimals('Friday') },
  Saturday: { officeHour: returnOpenFrom('Saturday'), exhibition: returnAnimals('Saturday') },
  Sunday: { officeHour: returnOpenFrom('Sunday'), exhibition: returnAnimals('Sunday') },
  Monday: { officeHour: 'CLOSED', exhibition: zooClosed },
});

const getDaySchedule = (day) => {
  if (day === 'Monday') return mondayClosed;
  const result = {};
  result[day] = { officeHour: returnOpenFrom(day), exhibition: returnAnimals(day) };
  return result;
};

const getAnimalSchedule = (animal) => {
  const chosedAnimal = data.species.find((specie) => specie.name === animal);
  return chosedAnimal.availability;
};

const verifyIfItsADayOrAnimal = (string) => {
  if (days.some((day) => day === string)) return 'day';
  if (animals.some((animal) => animal === string)) return 'animal';
  return false;
};

function getSchedule(scheduleTarget) {
  const target = verifyIfItsADayOrAnimal(scheduleTarget);
  // Nada
  if (!scheduleTarget) return getAllSchedule();
  // Inválido
  if (!target) return getAllSchedule();
  // Dia
  if (target === 'day') return getDaySchedule(scheduleTarget);
  // Animal
  if (target === 'animal') return getAnimalSchedule(scheduleTarget);
}

module.exports = getSchedule;

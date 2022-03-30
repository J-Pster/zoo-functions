const data = require('../data/zoo_data');

function countEntrants(entrants) {
  let child = 0;
  let adult = 0;
  let senior = 0;

  entrants.forEach((entrant) => {
    if (entrant.age < 18) child += 1;
    if (entrant.age >= 18 && entrant.age < 50) adult += 1;
    if (entrant.age >= 50) senior += 1;
  });

  return { child, adult, senior };
}

const calculatePrices = (numberOfEntrants) => {
  let total = 0;
  if (numberOfEntrants.adult) total += data.prices.adult * numberOfEntrants.adult;
  if (numberOfEntrants.child) total += data.prices.child * numberOfEntrants.child;
  if (numberOfEntrants.senior) total += data.prices.senior * numberOfEntrants.senior;
  return total;
};

function calculateEntry(entrants) {
  if (!entrants || entrants.length === undefined) return 0;
  const numberOfEntrants = countEntrants(entrants);
  return calculatePrices(numberOfEntrants);
}

module.exports = { calculateEntry, countEntrants };

const cities = [
  "Warsaw",
  "Dublin",
  "Tokyo",
  "New York City",
  "Beijing",
  "London",
  "Paris",
  "Seoul",
  "Dubai",
  "Singapore",
];

function cityGenerate(prev) {
  const tempGenerate = cities[Math.round(Math.random() * 9)];
  return tempGenerate !== prev ? tempGenerate : cityGenerate(prev);
}

function dateGener() {
  const month = Math.round(Math.random() * 5) + 6;
  const day = Math.round(Math.random() * 30) + 1;
  return new Date(2023, month, day).toDateString();
}

const data = [];
function generate(amount) {
  for (let i = 0; i < amount; i += 1) {
    const fromCity = cityGenerate();
    data.push({
      from: fromCity,
      to: cityGenerate(fromCity),
      date: dateGener(),
      available_seats: Math.round(Math.random() * 250),
      cost: Math.round(Math.random() * 1000) + 200,
    });
  }
  return data;
}

console.log(JSON.stringify(generate(200)));

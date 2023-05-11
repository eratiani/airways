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
  const month = Math.round(Math.random() * 6) + 5;
  const day = Math.round(Math.random() * 30) + 1;
  return new Date(2023, month, day).toDateString();
}

const data = [];
function generate(amount) {
  for (let i = 0; i < amount; i += 1) {
    const fromCity = cityGenerate();
    const total = Math.round(Math.random() * 250);
    data.push({
      from: fromCity,
      to: cityGenerate(fromCity),
      date: dateGener(),
      total_seats: total,
      available_seats: Math.round(Math.random() * total),
      cost: Math.round(Math.random() * 1000) + 200,
      id: String(i),
    });
  }
  return data;
}

// console.log(JSON.stringify(generate(200)));

const fs = require("fs");
const path = require("path");

fs.readFile(
  path.resolve(__dirname, "../db.json"),
  { encoding: "utf-8" },
  (err, data) => {
    if (err) {
      throw err;
    }
    const users = JSON.parse(data).users;
    writeData(users);
  }
);
const writeData = (users) => {
  fs.writeFile(
    path.resolve(__dirname, "../db.json"),
    JSON.stringify({ users, data: generate(200) }),
    (err) => {
      if (err) {
        throw err;
      }
      console.log("Success");
    }
  );
};

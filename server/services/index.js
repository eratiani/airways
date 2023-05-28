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
  const month = Math.round(Math.random() * 3) + 6;
  const day = Math.round(Math.random() * 30) + 1;
  const hours = Math.round(Math.random() * 23);
  const minutes = Math.round(Math.random() * 59);
  return new Date(2023, month, day, hours, minutes).toISOString();
}

function timeGener() {
  const h = Math.round(Math.random() * 5);
  const mins = Math.round(Math.random() * 59);
  return { h, mins };
}

function arrivGenerate(fromDate) {
  const { h, mins } = timeGener();
  const arrTime =
    new Date(fromDate).getTime() + mins * 60 * 1000 + h * 3600 * 1000;
  return new Date(arrTime);
}

const data = [];
function generate(amount) {
  for (let i = 0; i < amount; i += 1) {
    const fromCity = cityGenerate();
    const total = Math.round(Math.random() * 250);
    const date = dateGener();
    data.push({
      from: fromCity,
      to: cityGenerate(fromCity),
      date,
      total_seats: total,
      available_seats: Math.round(Math.random() * total),
      cost: Math.round(Math.random() * 1000) + 200,
      id: String(i),
      dateArriv: arrivGenerate(date),
    });
  }
  return data;
}

// console.log(JSON.stringify(generate(3)));

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

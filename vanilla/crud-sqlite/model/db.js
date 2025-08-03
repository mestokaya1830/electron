const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const db = new sqlite3.Database(path.resolve(__dirname, 'electron.sqlite'), (err) => {
  if (err) {
    console.error('Not Connected:', err.message);
  } else {
    console.log('Connected');
  }
});

module.exports = db
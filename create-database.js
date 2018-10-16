const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('pets.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users_to_pets (name TEXT, job TEXT, pet TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO users_to_pets VALUES ('Philip', 'professor', 'cat.jpg')");
  db.run("INSERT INTO users_to_pets VALUES ('John', 'student', 'dog.jpg')");
  db.run("INSERT INTO users_to_pets VALUES ('Carol', 'engineer', 'bear.jpg')");

  console.log('successfully created the users_to_pets table in pets.db');

  // print them out to confirm their contents:
  db.each("SELECT name, job, pet FROM users_to_pets", (err, row) => {
    console.log(row.name + ": " + row.job + ' - ' + row.pet);
  });
});

db.close();
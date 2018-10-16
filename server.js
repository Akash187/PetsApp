const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('static_files'));
app.use(bodyParser.urlencoded({ extended: true }));

let db = new sqlite3.Database('pets.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

app.get('/users', (req, res) => {
  console.log('running app.get /users');
  let sql = `SELECT name FROM users_to_pets`;
  let users = [];
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      users.push(row.name);
    });
    res.send(users);
  });
});

app.post('/user', (req, res) => {
  db.run('INSERT INTO users_to_pets VALUES ($name, $job, $pet)',
    {
      $name: req.body.name,
      $job: req.body.job,
      $pet: req.body.pet
    },
    (err) => {
      if(err){
        res.send("Error in app.post(/user)");
      }else{
        res.send("Successfully Saved Data!");
      }
    });
});

app.get('/users/:userid',(req, res) => {
  const nameToLookup = req.params.userid;
  let sql = `SELECT * FROM users_to_pets WHERE name = ?`;
  db.get(sql, [nameToLookup], (err, row) => {
    if (err) {
      throw err;
    }
    else{
      res.send(row);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
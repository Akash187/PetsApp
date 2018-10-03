const express = require('express');
const app = express();

app.use(express.static('static_files'));

const fakeDatabase = {
  'Philip' : {job: 'professor', pet: 'cat.jpg'},
  'John' : {job: 'student', pet: 'dog.jpg'},
  'Carol': {job: 'student', pet: 'bear.jpg'}
};

app.get('/users', (req, res) => {
  console.log('running app.get /users');
  const allUserNames = Object.keys(fakeDatabase);
  res.send(allUserNames);
});

app.get('/users/:userid',(req, res) => {
  const nameToLookup = req.params.userid;
  const val = fakeDatabase[nameToLookup];
  console.log(`${nameToLookup} -> ${val}`);
  if(val){
    res.send(val);
  }else{
    res.send({});
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
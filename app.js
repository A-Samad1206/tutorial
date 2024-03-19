const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

let users = [
  { id: 1, username: 'username1', email: 'one@email.com' },
  { id: 2, username: 'username2', email: 'two@email.com' },
  { id: 3, username: 'username3', email: 'three@email.com' },
  { id: 4, username: 'username4', email: 'four@email.com' },
];

app.set('views', path.join(process.cwd(), 'pages'));
app.set('view engine', 'ejs');

app.get(['/', '/users'], (_req, res) => {
  res.render('index', {
    users,
  });
});

app.post('/users', (req, res) => {
  users.push({ ...req.body, id: users[users.length - 1].id + 1 });
  res.render('index', { users });
});

app.delete('/users/:id', (req, res) => {
  users = users.filter(({ id }) => id != req.params.id);
  res.render('index', { users });
});

app.put('/users/:id', (req, res) => {
  let editedUser = users.find(({ id }) => id == req.params.id);
  editedUser.username = req.body.username;
  editedUser.email = req.body.email;

  users = users.map((user) => (user.id == req.params.id ? editedUser : user));

  res.render('index', { users });
});

app.listen(3000, () => {
  console.log('Listeing on 4000');
});

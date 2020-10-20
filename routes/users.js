const router = require('express').Router();
const readMyFile = require('../utils/read-file.js');
const path = require('path');
const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  readMyFile(usersDataPath)
  .then(data => res.send(data));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readMyFile(usersDataPath)
  .then(data => {
    const user = data.find((user) => user._id === id);
    return user
  })
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Такого пользователя не существует' });
    }
    res.send(user);
  });
});

module.exports = router;
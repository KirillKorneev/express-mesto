const router = require('express').Router();
const path = require('path');
const readMyFile = require('../utils/read-file.js');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  readMyFile(usersDataPath)
    .then((data) => res.send(data));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readMyFile(usersDataPath)
    .then((data) => {
      const user = data.find((per) => per._id === id);
      return user;
    })
    .then((userPer) => {
      if (!userPer) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' })
          .catch(() => res.status(500).send({ message: 'Ошибка чтения' }));
      }
      return res.send(userPer);
    });
});

module.exports = router;

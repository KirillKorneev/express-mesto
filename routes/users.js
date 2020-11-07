const router = require('express').Router();

const User = require('../models/user.js');

router.get('/users', (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения' }));
});

router.get('/users/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .orFail(() => {
      const error = new Error('Нет пользователя с таким id');
      error.statusCode = 404;
      throw error;
    })
    .then((userPer) => {
      res.send(userPer);
      return userPer;
    })
    .catch((err) => {
      if (err.kind === undefined) {
        res.status(err.statusCode).send({ message: err.message });
      } else if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Неправильный id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
});

router.post('/users', (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() => res.status(400).send({ message: 'Ошибка' }));
});

router.patch('/users/me', (req, res) => {
  const { name, about } = req.body;
  const { id } = req.user;
  const opts = { runValidators: true };
  User.findOneAndUpdate({ _id: id }, { name, about }, opts)
    .orFail(() => {
      const error = new Error('Нет пользователя с таким id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
      } else if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Неправильный id' });
      } else {
        res.status(err.statusCode).send({ message: err.message });
      }
    });
});

router.patch('/users/me/avatar', (req, res) => {
  const { avatar } = req.body;
  const { id } = req.user;
  const opts = { runValidators: true };
  User.findOneAndUpdate({ _id: id }, { avatar }, opts)
    .orFail(() => {
      const error = new Error('Нет пользователя с таким id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
      } else if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Неправильный id' });
      } else {
        res.status(err.statusCode).send({ message: err.message });
      }
    });
});

module.exports = router;

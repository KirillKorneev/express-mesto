const router = require('express').Router();

const User = require('../models/user.js');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
      } else {
        res.status(500).send('Ошибка сервера');
      }
    });
};

const getUser = (req, res) => {
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
};

const updateUser = (req, res) => {
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
};

const newUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() => res.status(400).send({ message: 'Ошибка' }));
};

const updateAvatar = (req, res) => {
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
};

module.exports = {
  getUsers, getUser, updateUser, newUser, updateAvatar,
};

const router = require('express').Router();

const User = require('../models/user.js');

router.get('/users', (req, res) => {
  User.find({})
  .then((data) => res.status(200).send(data))
  .catch(err => res.status(400).send(err));
});

router.get('/users/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
  .then((userPer) => {
    if (!userPer) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' })
        .catch(() => res.status(500).send({ message: 'Ошибка чтения' }));
    }
    return res.status(200).send(userPer);
  })
  .catch((err) => res.status(400).send(err));
});

router.post('/users', (req, res) => {
  User.create({...req.body})
  .then((user) =>  {
    res.status(200).send({data: user});
  })
  .catch(() => res.status(500).send({message: "Ошибка"}));
});

router.patch('/users/me', (req, res) => {
  const { name, about } = req.body;
  const { id } = req.user;
  User.findOneAndUpdate({_id: id}, {name: name, about: about})
  .then((user) =>  {
    res.status(200).send({data: user});
  })
  .catch(() => res.status(500).send({message: "Ошибка"}));
});

router.patch('/users/me/avatar', (req, res) => {
  const { avatar } = req.body;
  const { id } = req.user;
  User.findOneAndUpdate({_id: id}, {avatar: avatar})
  .then((user) =>  {
    res.status(200).send({data: user});
  })
  .catch(() => res.status(500).send({message: "Ошибка"}));
});

module.exports = router;

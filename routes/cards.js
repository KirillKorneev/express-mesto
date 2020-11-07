const router = require('express').Router();
const Card = require('../models/card.js');

router.get('/cards', (req, res) => {
  Card.find({})
    .populate('owner')
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения' }));
});

router.post('/cards', (req, res) => {
  const { name, link } = req.body;
  const { id } = req.user;
  Card.create({ name, link, owner: id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Ошибка' }));
});

router.delete('/cards/:id', (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      const error = new Error('Такой карточки не существует');
      error.statusCode = 500;
      throw error;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Неправильный id' });
      } else {
        res.status(err.statusCode).send({ message: err.message });
      }
    });
});

router.put('/cards/:cardId/likes', (req, res) => {
  const { id } = req.user;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: id } },
    { new: true })
    .orFail(() => {
      const error = new Error('Такой карточки не существует');
      error.statusCode = 500;
      throw error;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Неправильный id' });
      } else {
        res.status(err.statusCode).send({ message: err.message });
      }
    });
});

router.delete('/cards/:cardId/likes', (req, res) => {
  const { id } = req.user;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: id } },
    { new: true })
    .orFail(() => {
      const error = new Error('Такой карточки не существует');
      error.statusCode = 500;
      throw error;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Неправильный id' });
      } else {
        res.status(err.statusCode).send({ message: err.message });
      }
    });
});

module.exports = router;

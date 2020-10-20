const router = require('express').Router();
const path = require('path');
const readMyFile = require('../utils/read-file.js');

const usersDataPath = path.join(__dirname, '..', 'data', 'cards.json');
router.get('/cards', (req, res) => {
  readMyFile(usersDataPath)
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения' }));
});

module.exports = router;

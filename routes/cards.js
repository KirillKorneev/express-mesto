const router = require('express').Router();
const readMyFile = require('../utils/read-file.js');
const path = require('path');
const usersDataPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  readMyFile(usersDataPath)
  .then(data => res.send(data));
});

module.exports = router;
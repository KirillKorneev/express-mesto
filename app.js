const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');

const mongoDbUrl = 'mongodb://localhost:27017/mestodb-1';
const mongoConnectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(mongoDbUrl, mongoConnectOptions);

/// Это, наверное, было самое крутое ревью, спасибо и большой респект!!!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    id: '5fa552630eeebf5bd0d73bc7',
  };

  next();
});
app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {});

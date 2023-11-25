require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { register, login, update, getInfo } = require('./controllers/user');
const {
  addOperation,
  getOperation,
  getOperationsList,
  editOperation,
  deleteOperation,
} = require('./controllers/operations');
const {
  addCategory,
  editCategory,
  deleteCategory,
} = require('./controllers/categories');
const {
  addAccount,
  editAccount,
  deleteAccount,
} = require('./controllers/accounts');
const mapUser = require('./helpers/mapUser');
const authenticated = require('./middlewares/authenticated');

const PORT = 7070;
const app = express();
app.use(express.static('../client/build'));

app.use(cookieParser());
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { name, login, email, password } = req.body;

    const { user, token } = await register(name, login, email, password);

    res
      .cookie('token', token, { httpOnly: true })
      .status(201)
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .send({ error: 'Пользователь с таким логином уже существует' });
    } else {
      res
        .status(500)
        .send({ error: error.message || 'Что-то пошло не так...' });
    }
  }
});

app.post('/login', async (req, res) => {
  try {
    const { userLogin, password } = req.body;

    const { user, token } = await login(userLogin, password);

    res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.status(500).send({ error: error.message || 'Что-то пошло не так...' });
  }
});

app.post('/logout', async (req, res) => {
  res.cookie('token', '', { httpOnly: true }).send({});
});

app.use(authenticated);

app.get('/user/:id', async (req, res) => {
  const user = await getInfo(req.params.id);

  res.status(200).send({ data: mapUser(user) });
});

app.patch('/user/:id', async (req, res) => {
  const newUser = await update(req.user.id, req.body);

  res.status(200).send({ user: mapUser(newUser) });
});

app.get('/operations', async (req, res) => {
  const { operations, lastPage } = await getOperationsList(
    req.query.limit,
    req.query.page,
    req.user._id
  );

  res.status(200).send({ data: { lastPage, operations } });
});

app.get('/operations/:id', async (req, res) => {
  const operation = await getOperation(req.params.id);

  res.status(200).send({ data: operation });
});

app.post('/operations', async (req, res) => {
  const newOperation = await addOperation({
    date: new Date().toDateString(),
    sum: req.body.sum,
    account: req.body.account,
    comment: req.body.comment,
    category: req.body.category,
    user: req.user._id,
  });

  res.status(201).send({ data: newOperation });
});

app.patch('/operations/:id', async (req, res) => {
  const updatedOperation = await editOperation(req.params.id, {
    sum: req.body.sum,
    account: req.body.account,
    comment: req.body.comment,
    category: req.body.category,
  });

  res.status(200).send({ data: updatedOperation });
});

app.delete('/operations/:id', async (req, res) => {
  await deleteOperation(req.params.id, req.user._id);

  res.status(200).send({ data: req.params.id, error: null });
});

app.post('/categories', async (req, res) => {
  const newCategory = await addCategory({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).send({ data: newCategory });
});

app.patch('/categories/:id', async (req, res) => {
  const updatedCategory = await editCategory(req.params.id, req.body);

  res.status(200).send({ data: updatedCategory });
});

app.delete('/categories/:id', async (req, res) => {
  await deleteCategory(req.params.id, req.user._id);

  res.status(200).send({ data: req.params.id, error: null });
});

app.post('/accounts', async (req, res) => {
  const newAccount = await addAccount({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).send({ data: newAccount });
});

app.patch('/accounts/:id', async (req, res) => {
  const updatedAccount = await editAccount(req.params.id, req.body);

  res.status(200).send({ data: updatedAccount });
});

app.delete('/accounts/:id', async (req, res) => {
  await deleteAccount(req.params.id, req.user._id);

  res.status(200).send({ data: req.params.id, error: null });
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
  });
});

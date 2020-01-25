require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const CustomError = require('./errors/custom-error');
const messages = require('./variables/messages');

const auth = require('./middlwares/auth');
const customErrors = require('./middlwares/custom-errors');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const limiter = require('./middlwares/limiter');

const { createUser, login } = require('./controllers/users');

const router = require('./routes');

const { userValidator, userCredentialsValidator } = require('./validators/user');

const { PORT = 3000 } = process.env;
const app = express();


mongoose.connect(require('./config/mongo-url'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);


app.post('/signin', userCredentialsValidator, login);

app.post('/signup', userValidator, createUser);

app.use(auth);

app.use(router);

app.use((req, res, next) => {
  next(new CustomError(404, messages.notFound));
});


app.use(errorLogger);

app.use(errors());
app.use(customErrors);

app.listen(PORT);

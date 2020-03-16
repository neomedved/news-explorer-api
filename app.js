require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const customErrors = require('./middlwares/custom-errors');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const limiter = require('./middlwares/limiter');

const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();


mongoose.connect(require('./config/mongo-url'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);


app.use(router);


app.use(errorLogger);

app.use(errors());
app.use(customErrors);

app.listen(PORT);

const router = require('express').Router();

const users = require('./users');
const articles = require('./articles');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlwares/auth');

const { userValidator, userCredentialsValidator } = require('../validators/user');
const CustomError = require('../errors/custom-error');
const messages = require('../variables/messages');


router.post('/signin', userCredentialsValidator, login);

router.post('/signup', userValidator, createUser);

router.use(auth);


router.use('/users', users);
router.use('/articles', articles);


router.use((req, res, next) => {
  next(new CustomError(404, messages.notFound));
});


module.exports = router;

const router = require('express').Router();

const { getArticlesByUserId, createArticle, deleteArticleById } = require('../controllers/articles');
const { articleValidator, idValidator } = require('../validators/article');


router.get('/', getArticlesByUserId);

router.post('/', articleValidator, createArticle);

router.delete('/:articleId', idValidator, deleteArticleById);


module.exports = router;

const Article = require('../models/article');
const CustomError = require('../errors/custom-error');
const messages = require('../variables/messages');

module.exports.getArticlesByUserId = (req, res, next) => {
  const { _id: userId } = req.user;

  Article.find({ owner: userId })
    .then((articles) => res.json(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const { _id: userId } = req.user;

  Article.create({
    keyword, title, text, date, source, link, image, owner: userId,
  })
    .then(() => res.status(201).send(messages.articleCreated))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  const { articleId } = req.params;
  const { _id: userId } = req.user;

  Article.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new CustomError(404, messages.articleNotFound);
      } else if (String(article.owner._id) !== userId) {
        throw new CustomError(403, messages.articleCantBeDeleted);
      } else {
        Article.findByIdAndDelete(articleId)
          .select('-owner')
          .then((articleStillExists) => {
            if (articleStillExists) {
              res.json(articleStillExists);
            } else {
              throw new CustomError(404, messages.articleNotFound);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

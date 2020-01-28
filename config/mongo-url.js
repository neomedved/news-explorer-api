const { NODE_ENV, MONGODB_URI } = process.env;

module.exports = NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://localhost:27017/newsdb';

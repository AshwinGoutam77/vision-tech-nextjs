const { factories } = require('@strapi/strapi');

// deep-populate: returns every image, section and nested field in one request
const deepPopulate = { name: 'global::deep-populate', config: { uid: 'api::article.article' } };

module.exports = factories.createCoreRouter('api::article.article', {
  config: { find: { middlewares: [deepPopulate] }, findOne: { middlewares: [deepPopulate] } },
});

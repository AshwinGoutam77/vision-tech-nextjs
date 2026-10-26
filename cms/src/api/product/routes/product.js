const { factories } = require('@strapi/strapi');

// deep-populate: returns every image, section and nested field in one request
const deepPopulate = { name: 'global::deep-populate', config: { uid: 'api::product.product' } };

module.exports = factories.createCoreRouter('api::product.product', {
  config: { find: { middlewares: [deepPopulate] }, findOne: { middlewares: [deepPopulate] } },
});

const { factories } = require('@strapi/strapi');

// deep-populate: returns every image, section and nested field in one request
const deepPopulate = { name: 'global::deep-populate', config: { uid: 'api::category.category', skip: ['products'] } };

module.exports = factories.createCoreRouter('api::category.category', {
  config: { find: { middlewares: [deepPopulate] }, findOne: { middlewares: [deepPopulate] } },
});

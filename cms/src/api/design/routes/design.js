const { factories } = require('@strapi/strapi');

// deep-populate: returns every image, section and nested field in one request
const deepPopulate = { name: 'global::deep-populate', config: { uid: 'api::design.design' } };

module.exports = factories.createCoreRouter('api::design.design', {
  config: { find: { middlewares: [deepPopulate] } },
});

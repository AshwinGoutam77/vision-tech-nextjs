const { factories } = require('@strapi/strapi');

// deep-populate: returns every image, section and nested field in one request
const deepPopulate = { name: 'global::deep-populate', config: { uid: 'api::global.global' } };

module.exports = factories.createCoreRouter('api::global.global', {
  config: { find: { middlewares: [deepPopulate] } },
});

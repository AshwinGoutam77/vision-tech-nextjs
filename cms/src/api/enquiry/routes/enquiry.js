const { factories } = require('@strapi/strapi');

// Enquiries are only created from the website (public "create" permission) and read in the admin.
module.exports = factories.createCoreRouter('api::enquiry.enquiry', {
  only: ['create'],
});

'use strict';

const seed = require('../data/seed');

module.exports = {
  register() {},

  /**
   * Runs every time Strapi starts:
   *  1. makes sure French exists as a second language
   *  2. lets the website read published content and send enquiries
   *  3. on the very first start, imports the Visiontec content (EN + FR)
   */
  async bootstrap({ strapi }) {
    await ensureLocale(strapi, 'fr', 'French (fr)');
    warnUnmarkedFields(strapi);

    await allowPublic(strapi, [
      ...['page', 'product', 'category', 'partner', 'article', 'event'].flatMap((api) => [
        `api::${api}.${api}.find`,
        `api::${api}.${api}.findOne`,
      ]),
      'api::global.global.find',
      'api::design.design.find',
      'api::enquiry.enquiry.create',
      'plugin::upload.content-api.find',
      'plugin::upload.content-api.findOne',
    ]);

    try {
      await seed(strapi);
    } catch (err) {
      strapi.log.error('Seeding failed:');
      strapi.log.error(err);
    }
  },
};

/**
 * In Strapi, a field inside a translated content type is SHARED between
 * languages unless it is marked "localized". This warns at startup if a
 * field was added without that mark, so EN and FR never overwrite each other.
 */
function warnUnmarkedFields(strapi) {
  for (const [uid, ct] of Object.entries(strapi.contentTypes)) {
    if (!uid.startsWith('api::') || !ct.pluginOptions?.i18n?.localized) continue;
    for (const [name, attr] of Object.entries(ct.attributes)) {
      if (['relation', 'uid'].includes(attr.type) || attr.private || ['createdAt', 'updatedAt', 'publishedAt', 'createdBy', 'updatedBy', 'locale', 'localizations', 'documentId'].includes(name)) continue;
      if (attr.pluginOptions?.i18n?.localized === undefined) {
        strapi.log.warn(`⚠ ${uid} → "${name}" is shared between languages. Mark it localized (true) or shared (false) in its schema.`);
      }
    }
  }
}

async function ensureLocale(strapi, code, name) {
  const exists = await strapi.db.query('plugin::i18n.locale').findOne({ where: { code } });
  if (exists) return;
  const service = strapi.plugin('i18n').service('locales');
  await service.create({ code, name });
  strapi.log.info(`🌐 Added language: ${name}`);
}

async function allowPublic(strapi, actions) {
  const role = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!role) return;

  for (const action of actions) {
    const exists = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: role.id } });
    if (!exists) {
      await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: role.id } });
    }
  }
}

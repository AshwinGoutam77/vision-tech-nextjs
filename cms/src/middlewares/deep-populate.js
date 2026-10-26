'use strict';

/**
 * Builds a "populate everything" query from the content-type schema, so the
 * website gets every section, image and nested field in a single request –
 * including sections/fields you add later in the Content-Type Builder.
 */
const SKIP = new Set(['createdBy', 'updatedBy', 'localizations']);

function mediaOf(strapi, uid) {
  const model = strapi.getModel(uid);
  if (!model) return '*';
  const out = {};
  for (const [name, attr] of Object.entries(model.attributes)) {
    if (attr.type === 'media') out[name] = true;
  }
  return Object.keys(out).length ? out : '*';
}

function build(strapi, uid, depth = 0, skip = []) {
  const model = strapi.getModel(uid);
  if (!model || depth > 6) return '*';
  const out = {};
  for (const [name, attr] of Object.entries(model.attributes)) {
    if (SKIP.has(name) || (depth === 0 && skip.includes(name))) continue;
    if (attr.type === 'media') {
      out[name] = true;
    } else if (attr.type === 'component') {
      const inner = build(strapi, attr.component, depth + 1);
      out[name] = inner === '*' ? true : { populate: inner };
    } else if (attr.type === 'dynamiczone') {
      out[name] = {
        on: Object.fromEntries(attr.components.map((c) => [c, { populate: build(strapi, c, depth + 1) }])),
      };
    } else if (attr.type === 'relation' && attr.target && !attr.target.startsWith('admin::')) {
      const inner = mediaOf(strapi, attr.target);
      out[name] = inner === '*' ? true : { populate: inner };
    }
  }
  return Object.keys(out).length ? out : '*';
}

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (!ctx.query.populate && config.uid) {
      ctx.query.populate = build(strapi, config.uid, 0, config.skip || []);
    }
    await next();
  };
};

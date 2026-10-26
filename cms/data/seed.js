'use strict';

/**
 * Imports the Visiontec content (English + French) on the FIRST start only.
 * After that, everything is managed in the Strapi admin.
 * To re-import from scratch: stop Strapi, delete the cms/.tmp folder, start again.
 */
const fs = require('fs');
const path = require('path');
const { categories, simpleProducts, sentry, partners } = require('./content-catalog');
const { global, articles, events, pages } = require('./content-site');

const ALT = {
  'logo.png': 'Visiontec Systems',
  'fire.jpg': 'Firefighters responding to an incident',
  'work.jpg': 'Security team at work',
  'screening.jpg': 'Event screening',
  'hazmat.jpg': 'Responders in hazmat suits',
};

module.exports = async function seed(strapi) {
  const store = strapi.store({ type: 'plugin', name: 'visiontec' });
  if (await store.get({ key: 'seeded-v2' })) return;

  strapi.log.info('🌱 First start – importing Visiontec content (EN + FR)…');

  /* ---------- images ---------- */
  const img = {};
  for (const file of fs.readdirSync(path.join(__dirname, 'uploads'))) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    img[file] = (await upload(strapi, file, ALT[file] || prettify(file))).id;
  }

  /* ---------- helpers ---------- */
  const docs = (uid) => strapi.documents(uid);

  /** Create the English entry, then add the French locale to the same document. */
  async function bilingual(uid, en, fr, { publish = false } = {}) {
    const doc = await docs(uid).create({ locale: 'en', data: en, ...(publish ? { status: 'published' } : {}) });
    if (fr) {
      await docs(uid).update({ documentId: doc.documentId, locale: 'fr', data: fr });
      if (publish) await docs(uid).publish({ documentId: doc.documentId, locale: 'fr' });
    }
    return doc;
  }

  /* ---------- categories ---------- */
  const cat = {};
  let order = 0;
  async function addCategory(c, parentId) {
    const shared = {
      slug: c.slug,
      image: c.image ? img[c.image] : null,
      heroImage: c.heroImage ? img[c.heroImage] : null,
      sortOrder: order++,
      ...(parentId ? { parent: parentId } : {}),
    };
    const doc = await bilingual('api::category.category', { ...shared, ...c.en }, { ...shared, ...c.fr });
    cat[c.slug] = doc.documentId;
    for (const child of c.children || []) await addCategory(child, doc.documentId);
  }
  for (const c of categories) await addCategory(c);

  /* ---------- products ---------- */
  const prod = {};
  let pOrder = 0;
  const sentryShared = {
    slug: sentry.slug,
    name: sentry.name,
    brand: sentry.brand,
    image: img[sentry.image],
    gallery: sentry.gallery.map((f) => img[f]),
    categories: sentry.categories.map((s) => cat[s]),
    availability: 'onRequest',
    canQuote: true,
    canRent: sentry.canRent,
    featured: sentry.featured,
    showEnquiryForm: true,
    sortOrder: pOrder++,
  };
  prod.sentry = (
    await bilingual(
      'api::product.product',
      { ...sentryShared, ...sentry.en, sections: sentry.en.sections(img) },
      { ...sentryShared, ...sentry.fr, sections: sentry.fr.sections(img) },
      { publish: true },
    )
  ).documentId;

  for (const [slug, name, brand, image, cats, en, fr, featured] of simpleProducts) {
    const shared = {
      slug,
      name,
      brand,
      image: img[image],
      categories: cats.map((s) => cat[s]),
      availability: 'onRequest',
      canQuote: true,
      canRent: false,
      featured: Boolean(featured),
      showEnquiryForm: true,
      sortOrder: pOrder++,
    };
    prod[slug] = (
      await bilingual('api::product.product', { ...shared, shortDescription: en }, { ...shared, shortDescription: fr }, { publish: true })
    ).documentId;
  }

  /* ---------- partners ---------- */
  for (const [i, [name, logo]] of partners.entries()) {
    await docs('api::partner.partner').create({ data: { name, logo: img[logo], sortOrder: i } });
  }

  /* ---------- news & events ---------- */
  for (const [i, a] of articles.entries()) {
    const shared = { image: img[a.image], href: '#', sortOrder: i };
    await bilingual('api::article.article', { ...shared, ...a.en }, { ...shared, ...a.fr });
  }
  for (const [i, e] of events.entries()) {
    await bilingual('api::event.event', { sortOrder: i, ...e.en }, { sortOrder: i, ...e.fr });
  }

  /* ---------- header & footer ---------- */
  const g = { ...global.shared, logo: img['logo.png'] };
  await bilingual('api::global.global', { ...g, ...global.en }, { ...g, ...global.fr });

  /* ---------- design ---------- */
  await docs('api::design.design').create({
    data: {
      accentColor: '#F05A22',
      primaryColor: '#1F8F72',
      glowColor: '#4EE0B1',
      backgroundColor: '#F5F8F7',
      textColor: '#0B1F1B',
      mutedColor: '#566A64',
      cardColor: '#F4F8F7',
      lineColor: '#DCE5E2',
      darkColor: '#0A2A24',
      footerColor: '#030A0E',
      headingFont: 'Sora',
      bodyFont: 'DM_Sans',
      baseFontSize: 17,
      showPreloader: true,
      showCursorGlow: true,
      showProgressBar: true,
      enableAnimations: true,
      currency: 'CAD',
      customCss: '',
    },
  });

  /* ---------- pages ---------- */
  const ids = { featuredProduct: prod['pendar-x10'] };
  for (const [slug, page] of Object.entries(pages)) {
    const build = (l) => ({ title: page[l].title, slug, seo: page[l].seo, sections: page[l].sections(img, ids) });
    await bilingual('api::page.page', build('en'), build('fr'), { publish: true });
  }

  await store.set({ key: 'seeded-v2', value: true });
  strapi.log.info('✅ Visiontec content imported (EN + FR). Open http://localhost:1337/admin');
};

async function upload(strapi, file, alt) {
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name: file } });
  if (existing) return existing;
  const filepath = path.join(__dirname, 'uploads', file);
  const size = fs.statSync(filepath).size;
  const mimetype = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const [uploaded] = await strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: { filepath, originalFileName: file, originalFilename: file, size, mimetype },
      data: { fileInfo: { alternativeText: alt, caption: alt, name: file } },
    });
  return uploaded;
}

function prettify(file) {
  return file
    .replace(/\.(jpe?g|png)$/i, '')
    .replace(/^(product|partner|cat|about|hero|news|sentry)-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

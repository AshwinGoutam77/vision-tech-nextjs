module.exports = ({ env }) => {
  const clientUrl = env('CLIENT_URL', 'http://localhost:3000');
  const previewSecret = env('PREVIEW_SECRET');

  return {
    auth: { secret: env('ADMIN_JWT_SECRET') },
    apiToken: { salt: env('API_TOKEN_SALT') },
    transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
    secrets: { encryptionKey: env('ENCRYPTION_KEY') },
    flags: { nps: false, promoteEE: false },

    // "Open preview" button on pages: shows the real website, including unpublished drafts
    preview: {
      enabled: true,
      config: {
        allowedOrigins: [clientUrl],
        async handler(uid, { documentId, locale, status }) {
          const lang = locale || 'en';
          let path = null;
          if (uid === 'api::page.page') {
            const doc = await strapi.documents(uid).findOne({ documentId, locale: lang, fields: ['slug'] });
            if (doc) path = doc.slug === 'home' ? `/${lang}` : `/${lang}/${doc.slug}`;
          } else if (uid === 'api::product.product') {
            const doc = await strapi.documents(uid).findOne({ documentId, locale: lang, fields: ['slug'] });
            if (doc) path = `/${lang}/product/${doc.slug}`;
          }
          if (!path) return null;
          const q = new URLSearchParams({ secret: previewSecret, path, status });
          return `${clientUrl}/api/preview?${q}`;
        },
      },
    },
  };
};

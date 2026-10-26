# Visiontec Systems – Strapi CMS + Next.js

```
cms/   Strapi 5 – the admin where you manage everything   → http://localhost:1337/admin
web/   Next.js – the website                               → http://localhost:3000
```

## Setup

Requires **Node.js 20 or 22**.

```bash
npm install      # installs both apps and creates all secret keys
npm run dev      # starts Strapi + the website
```

1. Open **http://localhost:1337/admin** and create your admin account.
2. Open **http://localhost:3000** (you're sent to `/en` or `/fr` automatically).

On first start, Strapi imports everything in **English and French**: pages, 7 categories, 14 products, partner logos, news and events.

**Upgrading from the previous version?** Its database has a different structure. Stop the app, run `npm run reset-content`, then `npm run dev`. You'll create the admin account again.

## Pages on the website

| URL | What it is |
| --- | --- |
| `/en`, `/fr` | Homepage |
| `/en/about` | About us: intro, Did you know / History / Associations, partner logos |
| `/en/products` | Shop: top categories + all products with sorting and pages |
| `/en/products/cbrne-detection` | Category with sub-categories (cards) |
| `/en/products/cbrne-detection/chemical-detection-identification` | Product listing: “Showing 1–12 of 15”, sorting, pagination, sibling filters |
| `/en/product/sentry` | Product detail: gallery, specs, sections, enquiry form, related products |
| `/en/quote` | Quote list (like a cart) → sends a quote request |
| `/en/contact`, `/en/rental-form` | Forms saved in Strapi |
| `/en/search?q=…` | Searches products and pages |

## Managing products (like WooCommerce)

| WooCommerce | Strapi |
| --- | --- |
| Products → Add new | **Product → Create new entry** |
| Product categories (with parents) | **Product category**: set *parent* to nest. Image = card, hero image = page header. |
| Product image / gallery | `image`, `gallery` |
| Short / long description | `shortDescription`, `description` |
| Regular / sale price | `price`, `salePrice`, and switch on **showPrice** (otherwise “Price on request”) |
| SKU, stock status | `sku`, `availability` (on request, in stock, out of stock, pre-order) |
| Attributes tab | `specs` (label + value rows) |
| Featured | `featured` (used by “Products grid” set to *featured*) |
| Linked products | `related` (empty = others from the same category) |
| Product page layout | `sections`: add Image + text, Heading + list, Text columns, FAQ, Video… like the Sentry page |
| Add to cart | `canQuote` shows **Add to quote** · `canRent` shows **Rent this** |
| Brochure / download | `brochure` |
| Orders | **Enquiry**: every form and quote request, with status (new, in progress, quoted, closed) and internal notes |

Currency is set in **Design & Colours → currency** (CAD by default).

The quote list works like a WooCommerce cart without payment. Visitors add products, change quantities and submit their details, and the request arrives in **Enquiry** with the product list attached. Online card payment (Stripe) can be added on top of this later.

## Languages (English / French)

- Every page, product, category, menu and footer has an **EN / FR** switch at the top of the editor in Strapi. Edit each language separately; *Fill in from another locale* copies the English as a starting point.
- Images, prices, SKU and stock are shared across languages, so you set them once.
- If something isn't translated yet, the French site shows the English version instead of an empty page.
- The visitor's choice is remembered. Links you type in the CMS (`/about`) automatically go to the visitor's language.
- Interface words (buttons, form labels, “Showing 1–12 of 15”) are in `web/src/lib/i18n.ts`.
- **Adding a language** (e.g. Spanish): add it in Strapi under *Settings → Internationalization*, then add its code and translations in `web/src/lib/i18n.ts` and `web/src/middleware.ts`.

## Other admin areas

- **Page**: any page, built from 24 section types (page header, text, image + text with badge, partner logos, category cards, enquiry form, plus the homepage sections).
- **Header & Footer**: menu (an item can show a dropdown of its own links, or all product categories), CTA, address, phone, email, LinkedIn, footer columns.
- **Partner**: the logo grid on About.
- **Design & Colours**: colours, fonts, effects, currency, custom CSS.
- **Content-Type Builder**: add fields, collections or section types yourself. New section types show up on the site automatically with a generic layout.

## Images imported from your screenshots

Product photos, category photos, partner logos and About images were cut from the screenshots of the current site, so they're **low resolution**. Replace them in the **Media Library** with the originals; everything using them updates.

Product descriptions marked *“Contact us for specifications, pricing and rental availability”* are placeholders. The Sentry page is complete, as on the current site.

## Forms and spam

Forms post to the website's `/api/enquiry`, which checks them, filters bots with a hidden field, and saves them in Strapi. For extra protection you can create a Strapi API token with *create* access to Enquiry, set it as `STRAPI_API_TOKEN` in `web/.env.local`, and remove the public *create* permission (Settings → Users & Permissions → Public).

## Going live

- **Strapi**: Railway, Render, DigitalOcean, a VPS or Strapi Cloud, with a persistent disk (or Postgres in `cms/config/database.js`).
- **Website**: Vercel, Netlify or the same server.
- Set `NEXT_PUBLIC_STRAPI_URL` (web) and `CLIENT_URL` (cms) to the real addresses. Keep `PREVIEW_SECRET` identical in both.

```bash
npm run build && npm start
```

## Troubleshooting

- **`next: command not found` / `husky: command not found`**: run `npm install --ignore-scripts` inside `web`.
- **Start content over**: `npm run reset-content`, then `npm run dev`.
- **Images missing on the site**: check `NEXT_PUBLIC_STRAPI_URL` in `web/.env.local`.
- **“Can't reach the CMS”**: Strapi is still starting; refresh after a few seconds.
# vision-tech-nextjs

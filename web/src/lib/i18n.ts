/**
 * Languages + the small interface texts that aren't page content
 * (buttons, form labels, “Showing 1–12 of 15”). Page content itself is
 * translated in Strapi. To add a language: add it in Strapi (Settings →
 * Internationalization), add its code to LOCALES and a dictionary below.
 */
export const LOCALES = ['en', 'fr'] as const
export type Lang = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Lang = 'en'
export const LOCALE_NAMES: Record<Lang, string> = { en: 'English', fr: 'Français' }

export const isLang = (v: unknown): v is Lang => LOCALES.includes(v as Lang)
export const asLang = (v: unknown): Lang => (isLang(v) ? v : DEFAULT_LOCALE)

/** Prefix internal links with the language: "/about" → "/fr/about". */
export function lh(lang: Lang, href?: string | null): string {
  if (!href) return '#'
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (LOCALES.some((l) => href === `/${l}` || href.startsWith(`/${l}/`) || href.startsWith(`/${l}#`))) return href
  if (href === '/') return `/${lang}`
  if (href.startsWith('/#')) return `/${lang}${href.slice(1)}`
  return `/${lang}${href}`
}

const en = {
  home: 'Home',
  products: 'Products',
  allProducts: 'All products',
  learnMore: 'Learn more',
  viewProducts: 'View products',
  search: 'Search',
  searchPlaceholder: 'Search products and pages…',
  searchResultsFor: 'Results for',
  noResults: 'Nothing found. Try another word.',
  menu: 'Menu',
  close: 'Close',
  language: 'Language',
  showing: (from: number, to: number, total: number) =>
    total === 0 ? 'No products yet' : total === 1 ? 'Showing the single result' : `Showing ${from}–${to} of ${total} results`,
  sortBy: 'Sort by',
  sortDefault: 'Default order',
  sortName: 'Name A–Z',
  sortNewest: 'Newest',
  previous: 'Previous',
  next: 'Next',
  noProducts: 'No products in this category yet.',
  subcategories: 'Categories',
  brand: 'Brand',
  sku: 'SKU',
  overview: 'Overview',
  specifications: 'Specifications',
  related: 'Related products',
  availability: { onRequest: 'Available on request', inStock: 'In stock', outOfStock: 'Out of stock', preorder: 'Pre-order' } as Record<string, string>,
  priceOnRequest: 'Price on request',
  sale: 'Sale',
  addToQuote: 'Add to quote',
  inQuote: 'In your quote ✓',
  rent: 'Rent this',
  brochure: 'Download brochure',
  getInTouch: 'Get in touch',
  enquiryHeading: (name: string) => `Interested in the ${name}?`,
  enquiryText: 'Tell us about your requirements and our consultants will help you choose the right solution for your operations.',
  quote: 'Quote',
  quoteTitle: 'Your quote request',
  quoteSubtitle: 'Add products from the catalogue, then send the list to our team for pricing.',
  quoteEmpty: 'Your quote list is empty.',
  quantity: 'Qty',
  remove: 'Remove',
  sendQuote: 'Send quote request',
  continueBrowsing: 'Continue browsing',
  form: {
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    startDate: 'Start date',
    endDate: 'End date',
    submit: 'Send message',
    sending: 'Sending…',
    thanks: 'Thank you – we’ll be in touch shortly.',
    error: 'Something went wrong. Please try again or call us.',
    required: 'Please fill in your name and email.',
  },
  contactDetails: 'Contact details',
  call: 'Call',
  emailUs: 'Email',
  previewOn: 'Draft preview is on. Click to exit.',
  cmsDownTitle: 'Can’t reach the CMS.',
  cmsDownText: 'The website couldn’t load content from Strapi. Make sure it is running (npm run dev from the project folder).',
  notFoundTitle: 'This page doesn’t exist.',
  notFoundText: 'It may have been moved or unpublished.',
  backHome: 'Back to home',
}

type Dict = typeof en

const fr: Dict = {
  home: 'Accueil',
  products: 'Produits',
  allProducts: 'Tous les produits',
  learnMore: 'En savoir plus',
  viewProducts: 'Voir les produits',
  search: 'Recherche',
  searchPlaceholder: 'Rechercher des produits et des pages…',
  searchResultsFor: 'Résultats pour',
  noResults: 'Aucun résultat. Essayez un autre mot.',
  menu: 'Menu',
  close: 'Fermer',
  language: 'Langue',
  showing: (from, to, total) =>
    total === 0 ? 'Aucun produit pour le moment' : total === 1 ? 'Un seul résultat' : `Résultats ${from} à ${to} sur ${total}`,
  sortBy: 'Trier par',
  sortDefault: 'Ordre par défaut',
  sortName: 'Nom A–Z',
  sortNewest: 'Plus récents',
  previous: 'Précédent',
  next: 'Suivant',
  noProducts: 'Aucun produit dans cette catégorie pour le moment.',
  subcategories: 'Catégories',
  brand: 'Marque',
  sku: 'UGS',
  overview: 'Aperçu',
  specifications: 'Caractéristiques',
  related: 'Produits connexes',
  availability: { onRequest: 'Disponible sur demande', inStock: 'En stock', outOfStock: 'Rupture de stock', preorder: 'Précommande' },
  priceOnRequest: 'Prix sur demande',
  sale: 'Promo',
  addToQuote: 'Ajouter à la soumission',
  inQuote: 'Dans votre soumission ✓',
  rent: 'Louer',
  brochure: 'Télécharger la brochure',
  getInTouch: 'Nous joindre',
  enquiryHeading: (name) => `Le ${name} vous intéresse?`,
  enquiryText: 'Décrivez vos besoins et nos conseillers vous aideront à choisir la solution adaptée à vos opérations.',
  quote: 'Soumission',
  quoteTitle: 'Votre demande de soumission',
  quoteSubtitle: 'Ajoutez des produits du catalogue, puis envoyez la liste à notre équipe pour obtenir les prix.',
  quoteEmpty: 'Votre liste est vide.',
  quantity: 'Qté',
  remove: 'Retirer',
  sendQuote: 'Envoyer la demande',
  continueBrowsing: 'Continuer à magasiner',
  form: {
    name: 'Nom',
    company: 'Entreprise',
    email: 'Courriel',
    phone: 'Téléphone',
    message: 'Message',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    submit: 'Envoyer le message',
    sending: 'Envoi…',
    thanks: 'Merci – nous vous répondrons sous peu.',
    error: 'Une erreur est survenue. Veuillez réessayer ou nous appeler.',
    required: 'Veuillez indiquer votre nom et votre courriel.',
  },
  contactDetails: 'Coordonnées',
  call: 'Téléphone',
  emailUs: 'Courriel',
  previewOn: 'Aperçu des brouillons activé. Cliquez pour quitter.',
  cmsDownTitle: 'Impossible de joindre le CMS.',
  cmsDownText: 'Le site n’a pas pu charger le contenu de Strapi. Vérifiez qu’il est lancé (npm run dev depuis le dossier du projet).',
  notFoundTitle: 'Cette page n’existe pas.',
  notFoundText: 'Elle a peut-être été déplacée ou dépubliée.',
  backHome: 'Retour à l’accueil',
}

const DICTS: Record<Lang, Dict> = { en, fr }
export const dict = (lang: Lang): Dict => DICTS[lang] ?? en
export type { Dict }

'use strict';
/** Header/footer, pages and news imported on first start (English + French). */

const { p, t } = require('./content-catalog');

const link = (label, href) => ({ label, href });
const set = (anchor = '', background = 'default') => ({ background, spacing: 'default', anchor, hidden: false, textColor: 'dark' });
const a = (url, text) => ({ type: 'link', url, children: [t(text)] });

/* ------------------------------ Header & Footer ------------------------------ */
const global = {
  shared: {
    phone: '905-702-8901',
    email: '',
    linkedin: '', // add your LinkedIn URL in Header & Footer
  },
  en: {
    siteName: 'Visiontec Systems',
    navItems: [
      { label: 'Products', href: '/products', showProductCategories: true, children: [] },
      { label: 'About us', href: '/about', showProductCategories: false, children: [] },
      { label: 'News & events', href: '/#news', showProductCategories: false, children: [] },
      { label: 'Contact', href: '/contact', showProductCategories: false, children: [link('Contact us', '/contact'), link('Rental form', '/rental-form'), link('Support', '/contact')] },
    ],
    navCta: link('Request a quote', '/quote'),
    address: 'Visiontec Systems\n247 Armstrong Avenue, Unit 1\nGeorgetown, ON L7G 4X6\nCanada',
    footerColumns: [
      { heading: 'Products', links: [link('CBRNE detection', '/products/cbrne-detection'), link('Chemical detection', '/products/cbrne-detection/chemical-detection-identification'), link('All products', '/products')] },
      { heading: 'Industries we serve', links: [link('CBRN & HazMat', '/products/cbrne-detection'), link('Infrastructure protection', '/#solutions'), link('Equipment rental', '/rental-form')] },
      { heading: 'Company', links: [link('About us', '/about'), link('News & events', '/#news'), link('Contact', '/contact')] },
    ],
    copyright: '© 2026 Visiontec Systems. All rights reserved.',
    backToTop: 'Back to top',
  },
  fr: {
    siteName: 'Visiontec Systems',
    navItems: [
      { label: 'Produits', href: '/products', showProductCategories: true, children: [] },
      { label: 'À propos', href: '/about', showProductCategories: false, children: [] },
      { label: 'Nouvelles et événements', href: '/#news', showProductCategories: false, children: [] },
      { label: 'Contact', href: '/contact', showProductCategories: false, children: [link('Nous joindre', '/contact'), link('Formulaire de location', '/rental-form'), link('Soutien', '/contact')] },
    ],
    navCta: link('Demander une soumission', '/quote'),
    address: 'Visiontec Systems\n247, avenue Armstrong, unité 1\nGeorgetown (Ontario) L7G 4X6\nCanada',
    footerColumns: [
      { heading: 'Produits', links: [link('Détection CBRNE', '/products/cbrne-detection'), link('Détection chimique', '/products/cbrne-detection/chemical-detection-identification'), link('Tous les produits', '/products')] },
      { heading: 'Secteurs desservis', links: [link('CBRN et matières dangereuses', '/products/cbrne-detection'), link('Protection des infrastructures', '/#solutions'), link('Location d’équipement', '/rental-form')] },
      { heading: 'Entreprise', links: [link('À propos', '/about'), link('Nouvelles et événements', '/#news'), link('Contact', '/contact')] },
    ],
    copyright: '© 2026 Visiontec Systems. Tous droits réservés.',
    backToTop: 'Haut de page',
  },
};

/* ------------------------------ News & events ------------------------------ */
const articles = [
  {
    image: 'news-lithium.jpg',
    en: { title: 'How to detect the hidden danger of lithium-ion battery fires', excerpt: 'Lithium-ion battery fires are a growing public safety concern.', linkLabel: 'Read more' },
    fr: { title: 'Comment détecter le danger caché des incendies de batteries lithium-ion', excerpt: 'Les incendies de batteries lithium-ion sont une préoccupation croissante pour la sécurité publique.', linkLabel: 'Lire la suite' },
  },
  {
    image: 'news-events.jpg',
    en: { title: '5 factors to keep in mind when renting security equipment for public events', excerpt: 'Set your attendee screening procedure early.', linkLabel: 'Read more' },
    fr: { title: '5 facteurs à considérer pour louer de l’équipement de sécurité pour un événement public', excerpt: 'Établissez tôt votre procédure de contrôle des participants.', linkLabel: 'Lire la suite' },
  },
  {
    image: 'news-naval.jpg',
    en: { title: 'Shielding the seas: why we need to protect naval vessels from CBRN threats', excerpt: 'Naval platforms are often deployed to dangerous environments.', linkLabel: 'Read more' },
    fr: { title: 'Protéger les mers : pourquoi protéger les navires contre les menaces CBRN', excerpt: 'Les plateformes navales sont souvent déployées dans des environnements dangereux.', linkLabel: 'Lire la suite' },
  },
];

const events = [
  {
    en: { date: 'May 27 to 28', description: "CANSEC, Canada's leading defence, security and emerging technology event. EY Centre, Ottawa, Ont." },
    fr: { date: '27 et 28 mai', description: 'CANSEC, le principal salon canadien de la défense, de la sécurité et des technologies émergentes. Centre EY, Ottawa (Ontario).' },
  },
  {
    en: { date: 'July 14 to 16, 2026', description: "Maritime and Arctic Security and Safety Conference. St. John's Convention Centre, Newfoundland." },
    fr: { date: '14 au 16 juillet 2026', description: 'Conférence sur la sûreté et la sécurité maritimes et arctiques. Centre des congrès de St. John’s (Terre-Neuve).' },
  },
  {
    en: { date: 'From October 6, 2026', description: 'DEFSEC Atlantic. Halifax Convention Centre, Halifax, Nova Scotia.' },
    fr: { date: 'À partir du 6 octobre 2026', description: 'DEFSEC Atlantic. Centre des congrès d’Halifax (Nouvelle-Écosse).' },
  },
];

/* ------------------------------ Pages ------------------------------ */
/** Each page: (img, ids) => sections, for 'en' and 'fr'. ids.featuredProduct = documentId */
const pages = {
  home: {
    en: {
      title: 'Home',
      seo: { metaTitle: 'Visiontec Systems', metaDescription: 'The most advanced CBRNE detection technology – to buy or rent, with expert guidance.' },
      sections: (img, ids) => [
        {
          __component: 'blocks.hero',
          background: img['hazmat.jpg'],
          badge: 'New',
          pillText: 'Explore our latest detection products',
          pillHref: '/products',
          titleLine1: 'The most advanced CBRNE',
          titleLine2: 'detection technology.',
          subtitle: 'Detect, identify, protect. Equipment for detection, identification, measurement and surveillance, to buy or rent, with expert guidance from our team.',
          primaryCta: link('View products', '/products'),
          secondaryCta: link('Talk to an expert', '#contact'),
          showGrid: true,
          tileCommunity: { label: 'Keep my community safe', image: img['fire.jpg'] },
          signalTitle: 'Live threat signal',
          tileCbrne: { label: 'CBRNE detection', image: img['hazmat.jpg'] },
          tilePremises: { label: 'Keep my premises safe', image: img['work.jpg'] },
          featuredLabel: 'Featured product',
          featuredLinkLabel: 'Learn more',
          featuredProduct: ids.featuredProduct,
          features: ['Complete CBRNE range', 'Buy or rent', 'Expert guidance', 'Event screening'].map((text) => ({ text })),
          settings: set(),
        },
        { __component: 'blocks.statement', text: 'When you need to be ready for the unimaginable, you need chemical, biological, radiological, nuclear and explosive equipment that delivers superior threat protection.', settings: set() },
        {
          __component: 'blocks.solutions',
          tag: 'Solutions',
          heading: 'Protection built around where you work.',
          items: [
            { title: 'Keep my community safe', text: 'The entire spectrum of CBRNE products for detection, identification, measurement and surveillance.', cta: link('View products', '/products/cbrne-detection'), image: img['fire.jpg'] },
            { title: 'Keep my premises safe', text: 'Integrated security solutions that protect people and critical infrastructure, from body scanners to x-ray systems.', cta: link('View products', '/products'), image: img['work.jpg'] },
            { title: 'Screen my event', text: 'Rent screening or detection equipment for a temporary event, from international summits to entertainment venues.', cta: link('Rental form', '/rental-form'), image: img['screening.jpg'] },
          ],
          settings: set('solutions'),
        },
        {
          __component: 'blocks.spectrum',
          tag: 'The full spectrum',
          heading: 'Every CBRNE threat. One partner.',
          intro: 'Hover to explore what we detect.',
          items: [
            { letter: 'C', name: 'Chemical', text: 'Detect and identify toxic agents and hazardous chemicals.', image: img['hazmat.jpg'], position: '12% 50%' },
            { letter: 'B', name: 'Biological', text: 'Equipment to spot and characterize biological threats.', image: img['work.jpg'] },
            { letter: 'R', name: 'Radiological', text: 'Measure radiation and locate radioactive sources.', image: img['screening.jpg'] },
            { letter: 'N', name: 'Nuclear', text: 'Monitoring for nuclear material threats.', image: img['hazmat.jpg'], position: '88% 50%' },
            { letter: 'E', name: 'Explosive', text: 'Find explosives and banned items at checkpoints.', image: img['fire.jpg'] },
          ],
          settings: set('spectrum'),
        },
        {
          __component: 'blocks.marquee',
          row1: ['Detect', 'Identify', 'Protect', 'Screen'].map((word) => ({ word })),
          row2: ['Chemical', 'Biological', 'Radiological', 'Nuclear', 'Explosive'].map((word) => ({ word })),
          settings: set(),
        },
        { __component: 'blocks.products', tag: 'Products', heading: 'Discover our latest products.', intro: 'Innovative tools for detection, identification, screening and surveillance.', mode: 'featured', count: 3, settings: set('products') },
        { __component: 'blocks.banner', heading: 'Reduce CBRNE threats with the most advanced technology.', text: 'All the products you need to protect your team and facilities from a variety of threats.', cta: link('Contact us', '/contact'), image: img['hazmat.jpg'], settings: set() },
        {
          __component: 'blocks.steps',
          tag: 'How it works',
          heading: 'From first call to field-ready.',
          steps: [
            { title: 'Assess', text: 'We learn your threats, site and team.' },
            { title: 'Recommend', text: 'We match proven equipment to your needs.' },
            { title: 'Deploy', text: 'Equipment is delivered and ready to use.' },
            { title: 'Support', text: 'Our team stays available after delivery.' },
          ],
          settings: set('how'),
        },
        { __component: 'blocks.news', tag: 'News and events', heading: 'Insights from the field.', postsLimit: 3, showEvents: true, settings: set('news') },
        { __component: 'blocks.contact', heading: 'Be ready for the unimaginable.', text: 'Tell us what you need to protect. Our team will guide you to the right equipment, to buy or to rent.', buttons: [link('Contact Visiontec', '/contact'), link('Rental form', '/rental-form')], settings: set('contact') },
      ],
    },
    fr: {
      title: 'Accueil',
      seo: { metaTitle: 'Visiontec Systems', metaDescription: 'La technologie de détection CBRNE la plus avancée – à l’achat ou en location, avec l’accompagnement de nos experts.' },
      sections: (img, ids) => [
        {
          __component: 'blocks.hero',
          background: img['hazmat.jpg'],
          badge: 'Nouveau',
          pillText: 'Découvrez nos derniers produits de détection',
          pillHref: '/products',
          titleLine1: 'La technologie de détection',
          titleLine2: 'CBRNE la plus avancée.',
          subtitle: 'Détecter, identifier, protéger. Des équipements de détection, d’identification, de mesure et de surveillance, à l’achat ou en location, avec l’accompagnement de notre équipe.',
          primaryCta: link('Voir les produits', '/products'),
          secondaryCta: link('Parler à un expert', '#contact'),
          showGrid: true,
          tileCommunity: { label: 'Protéger ma collectivité', image: img['fire.jpg'] },
          signalTitle: 'Signal de menace en direct',
          tileCbrne: { label: 'Détection CBRNE', image: img['hazmat.jpg'] },
          tilePremises: { label: 'Protéger mes installations', image: img['work.jpg'] },
          featuredLabel: 'Produit vedette',
          featuredLinkLabel: 'En savoir plus',
          featuredProduct: ids.featuredProduct,
          features: ['Gamme CBRNE complète', 'Achat ou location', 'Conseils d’experts', 'Contrôle lors d’événements'].map((text) => ({ text })),
          settings: set(),
        },
        { __component: 'blocks.statement', text: 'Pour être prêt à faire face à l’inimaginable, il vous faut des équipements chimiques, biologiques, radiologiques, nucléaires et explosifs qui offrent une protection supérieure contre les menaces.', settings: set() },
        {
          __component: 'blocks.solutions',
          tag: 'Solutions',
          heading: 'Une protection adaptée à votre milieu.',
          items: [
            { title: 'Protéger ma collectivité', text: 'Toute la gamme de produits CBRNE pour la détection, l’identification, la mesure et la surveillance.', cta: link('Voir les produits', '/products/cbrne-detection'), image: img['fire.jpg'] },
            { title: 'Protéger mes installations', text: 'Des solutions de sécurité intégrées qui protègent les personnes et les infrastructures essentielles, des scanners corporels aux systèmes à rayons X.', cta: link('Voir les produits', '/products'), image: img['work.jpg'] },
            { title: 'Contrôler mon événement', text: 'Louez de l’équipement de contrôle ou de détection pour un événement temporaire, des sommets internationaux aux salles de spectacle.', cta: link('Formulaire de location', '/rental-form'), image: img['screening.jpg'] },
          ],
          settings: set('solutions'),
        },
        {
          __component: 'blocks.spectrum',
          tag: 'Tout le spectre',
          heading: 'Toutes les menaces CBRNE. Un seul partenaire.',
          intro: 'Survolez pour découvrir ce que nous détectons.',
          items: [
            { letter: 'C', name: 'Chimique', text: 'Détecter et identifier les agents toxiques et les produits chimiques dangereux.', image: img['hazmat.jpg'], position: '12% 50%' },
            { letter: 'B', name: 'Biologique', text: 'Des équipements pour repérer et caractériser les menaces biologiques.', image: img['work.jpg'] },
            { letter: 'R', name: 'Radiologique', text: 'Mesurer les rayonnements et localiser les sources radioactives.', image: img['screening.jpg'] },
            { letter: 'N', name: 'Nucléaire', text: 'Surveillance des menaces liées aux matières nucléaires.', image: img['hazmat.jpg'], position: '88% 50%' },
            { letter: 'E', name: 'Explosif', text: 'Repérer les explosifs et les articles interdits aux points de contrôle.', image: img['fire.jpg'] },
          ],
          settings: set('spectrum'),
        },
        {
          __component: 'blocks.marquee',
          row1: ['Détecter', 'Identifier', 'Protéger', 'Contrôler'].map((word) => ({ word })),
          row2: ['Chimique', 'Biologique', 'Radiologique', 'Nucléaire', 'Explosif'].map((word) => ({ word })),
          settings: set(),
        },
        { __component: 'blocks.products', tag: 'Produits', heading: 'Découvrez nos derniers produits.', intro: 'Des outils novateurs pour la détection, l’identification, le contrôle et la surveillance.', mode: 'featured', count: 3, settings: set('products') },
        { __component: 'blocks.banner', heading: 'Réduisez les menaces CBRNE grâce à la technologie la plus avancée.', text: 'Tous les produits dont vous avez besoin pour protéger votre équipe et vos installations contre diverses menaces.', cta: link('Nous joindre', '/contact'), image: img['hazmat.jpg'], settings: set() },
        {
          __component: 'blocks.steps',
          tag: 'Notre démarche',
          heading: 'Du premier appel au terrain.',
          steps: [
            { title: 'Évaluer', text: 'Nous apprenons à connaître vos menaces, votre site et votre équipe.' },
            { title: 'Recommander', text: 'Nous choisissons l’équipement éprouvé adapté à vos besoins.' },
            { title: 'Déployer', text: 'L’équipement est livré et prêt à l’emploi.' },
            { title: 'Soutenir', text: 'Notre équipe reste disponible après la livraison.' },
          ],
          settings: set('how'),
        },
        { __component: 'blocks.news', tag: 'Nouvelles et événements', heading: 'Perspectives du terrain.', postsLimit: 3, showEvents: true, settings: set('news') },
        { __component: 'blocks.contact', heading: 'Soyez prêt à faire face à l’inimaginable.', text: 'Dites-nous ce que vous devez protéger. Notre équipe vous guidera vers l’équipement adapté, à l’achat ou en location.', buttons: [link('Joindre Visiontec', '/contact'), link('Formulaire de location', '/rental-form')], settings: set('contact') },
      ],
    },
  },

  about: {
    en: {
      title: 'About us',
      seo: { metaDescription: 'Visiontec Systems is a value-added Canadian supplier of front-line security and CBRNE technologies, products and services.' },
      sections: (img) => [
        { __component: 'blocks.page-header', title: 'About us', subtitle: 'From installation to training, you can rely on us.', image: img['about-cansec.jpg'], showBreadcrumb: true },
        {
          __component: 'blocks.rich-text',
          heading: 'The foundation of a good working relationship is trust',
          body: [
            p(t('Visiontec Systems is a value-added Canadian supplier that specializes in providing front-line security and CBRNE (chemical, biological, radiological, nuclear and explosive) technologies, products and services.')),
            p(t('Our customers trust us to mitigate their risk with security solutions and services they can rely on. We are a one-stop shop representing select international manufacturers with best of breed security products. We take the time to learn your needs so we can recommend or respond with the right solution – from one product to an entire turn-key security system.')),
            p(t('In addition to keeping up with regulatory requirements and industry standards, we support our customers with a complete suite of professional services. Visiontec Systems makes sure your security system is up to date, installed properly and running optimally. And if you should need any repair or service, you know you can count on us – any time.')),
            p(t('From installation to training, you can rely on us.', { bold: true })),
          ],
          align: 'center',
          width: 'wide',
          settings: set(),
        },
        {
          __component: 'blocks.image-text',
          heading: 'Did you know?',
          badge: 'CANSEC',
          body: [
            p(t('Visiontec Systems was selected to provide security equipment at this year’s CANSEC, Canada’s largest defence show. We provided the '), a('https://www.defenceandsecurity.ca', 'Canadian Association of Defence and Security Industries (CADSI)'), t(' with the OPENGATE system as the first step in their security screening process to get attendees into the show as efficiently and safely as possible.')),
            p(t('Previously, Visiontec had been selected to provide security screening and detection equipment for the international G7 Summit in Charlevoix, Quebec, from June 8–9, 2018. Visiontec was present onsite from May 24 to June 11, providing equipment, installation, training and other services.')),
          ],
          image: img['about-cansec.jpg'],
          imagePosition: 'left',
          settings: set(),
        },
        {
          __component: 'blocks.image-text',
          heading: 'Our history',
          badge: 'Our founder',
          body: [
            p(t('With unmatched depth of knowledge in the security screening and CBRNE field, Colleen Rodi, the founder of Visiontec Systems, created a customer-focused, multi-disciplined team that prides itself on delivering and supporting industry-leading solutions to a broad customer base.')),
            p(t('Colleen understood her customers, knew the industry and drew upon her deep experience and extensive resources to reliably supply the best products with the lowest cost of ownership to Visiontec’s clientele. Today, Visiontec continues to carry that legacy forward in her honour as we represent her intent and your best interest.')),
          ],
          image: img['about-founder.jpg'],
          imagePosition: 'right',
          settings: set(),
        },
        {
          __component: 'blocks.image-text',
          heading: 'Our associations',
          badge: 'Proudly Canadian',
          body: [
            p(t('Visiontec is a member of the '), a('https://www.defenceandsecurity.ca', 'Canadian Association of Defence and Security Industries'), t(' (CADSI) and is registered with the Canadian government Controlled Goods Program.')),
            p(t('As well, Visiontec is a member of the '), a('https://www.cfib-fcei.ca', 'Canadian Federation of Independent Business'), t(' (CFIB).')),
            p(t('Visiontec proudly supports various organizations related to veterans, including the WOR Association and AVANETS.')),
          ],
          image: img['about-canada.jpg'],
          imagePosition: 'left',
          settings: set(),
        },
        { __component: 'blocks.partners', tag: 'Our partners', heading: 'Best-of-breed manufacturers.', intro: 'Visiontec offers you only the best security products on the market. We are proud to represent manufacturers whose products meet the latest standards and offer innovative solutions to security challenges.', settings: set('partners', 'white') },
        { __component: 'blocks.contact', heading: 'Let’s talk about what you need to protect.', text: 'Our team will guide you to the right equipment, to buy or to rent.', buttons: [link('Contact us', '/contact'), link('View products', '/products')], settings: set() },
      ],
    },
    fr: {
      title: 'À propos',
      seo: { metaDescription: 'Visiontec Systems est un fournisseur canadien à valeur ajoutée de technologies, produits et services de sécurité de première ligne et CBRNE.' },
      sections: (img) => [
        { __component: 'blocks.page-header', title: 'À propos', subtitle: 'De l’installation à la formation, vous pouvez compter sur nous.', image: img['about-cansec.jpg'], showBreadcrumb: true },
        {
          __component: 'blocks.rich-text',
          heading: 'La confiance est le fondement d’une bonne relation de travail',
          body: [
            p(t('Visiontec Systems est un fournisseur canadien à valeur ajoutée spécialisé dans les technologies, produits et services de sécurité de première ligne et CBRNE (chimique, biologique, radiologique, nucléaire et explosif).')),
            p(t('Nos clients nous font confiance pour réduire leurs risques grâce à des solutions et des services de sécurité fiables. Nous sommes un guichet unique représentant des fabricants internationaux choisis pour la qualité de leurs produits. Nous prenons le temps de comprendre vos besoins afin de recommander la bonne solution – d’un seul produit à un système de sécurité clé en main.')),
            p(t('En plus de suivre les exigences réglementaires et les normes de l’industrie, nous offrons à nos clients une gamme complète de services professionnels. Visiontec Systems veille à ce que votre système de sécurité soit à jour, bien installé et performant. Et si vous avez besoin d’une réparation ou d’un entretien, vous pouvez compter sur nous – en tout temps.')),
            p(t('De l’installation à la formation, vous pouvez compter sur nous.', { bold: true })),
          ],
          align: 'center',
          width: 'wide',
          settings: set(),
        },
        {
          __component: 'blocks.image-text',
          heading: 'Le saviez-vous?',
          badge: 'CANSEC',
          body: [
            p(t('Visiontec Systems a été choisie pour fournir l’équipement de sécurité du salon CANSEC de cette année, le plus grand salon de la défense au Canada. Nous avons fourni à l’'), a('https://www.defenceandsecurity.ca', 'Association des industries canadiennes de défense et de sécurité (AICDS)'), t(' le système OPENGATE comme première étape du contrôle de sécurité, afin d’accueillir les participants de façon efficace et sécuritaire.')),
            p(t('Auparavant, Visiontec avait été choisie pour fournir l’équipement de contrôle et de détection du Sommet international du G7 à Charlevoix (Québec), les 8 et 9 juin 2018. Visiontec était présente sur place du 24 mai au 11 juin pour l’équipement, l’installation, la formation et d’autres services.')),
          ],
          image: img['about-cansec.jpg'],
          imagePosition: 'left',
          settings: set(),
        },
        {
          __component: 'blocks.image-text',
          heading: 'Notre histoire',
          badge: 'Notre fondatrice',
          body: [
            p(t('Forte d’une connaissance inégalée du contrôle de sécurité et du domaine CBRNE, Colleen Rodi, fondatrice de Visiontec Systems, a bâti une équipe multidisciplinaire axée sur le client, fière de fournir et de soutenir des solutions de premier plan auprès d’une vaste clientèle.')),
            p(t('Colleen comprenait ses clients, connaissait l’industrie et s’appuyait sur sa grande expérience pour offrir les meilleurs produits au plus faible coût total de possession. Aujourd’hui, Visiontec poursuit cet héritage en son honneur, dans le respect de sa vision et de vos intérêts.')),
          ],
          image: img['about-founder.jpg'],
          imagePosition: 'right',
          settings: set(),
        },
        {
          __component: 'blocks.image-text',
          heading: 'Nos associations',
          badge: 'Fièrement canadienne',
          body: [
            p(t('Visiontec est membre de l’'), a('https://www.defenceandsecurity.ca', 'Association des industries canadiennes de défense et de sécurité'), t(' (AICDS) et est inscrite au Programme des marchandises contrôlées du gouvernement du Canada.')),
            p(t('Visiontec est également membre de la '), a('https://www.cfib-fcei.ca', 'Fédération canadienne de l’entreprise indépendante'), t(' (FCEI).')),
            p(t('Visiontec soutient fièrement diverses organisations liées aux anciens combattants, dont la WOR Association et AVANETS.')),
          ],
          image: img['about-canada.jpg'],
          imagePosition: 'left',
          settings: set(),
        },
        { __component: 'blocks.partners', tag: 'Nos partenaires', heading: 'Des fabricants de premier plan.', intro: 'Visiontec vous offre uniquement les meilleurs produits de sécurité sur le marché. Nous sommes fiers de représenter des fabricants dont les produits respectent les normes les plus récentes et offrent des solutions novatrices.', settings: set('partners', 'white') },
        { __component: 'blocks.contact', heading: 'Parlons de ce que vous devez protéger.', text: 'Notre équipe vous guidera vers l’équipement adapté, à l’achat ou en location.', buttons: [link('Nous joindre', '/contact'), link('Voir les produits', '/products')], settings: set() },
      ],
    },
  },

  contact: {
    en: {
      title: 'Contact',
      sections: (img) => [
        { __component: 'blocks.page-header', title: 'Contact us', subtitle: 'Tell us what you need to protect. We usually reply within one business day.', image: img['work.jpg'], showBreadcrumb: true },
        { __component: 'blocks.enquiry-form', tag: 'Get in touch', heading: 'Talk to our team.', body: [p(t('Questions about a product, a quote, support or training? Send us a message and the right person will get back to you.'))], formType: 'contact', showContactDetails: true, showCompany: true, showPhone: true, showDates: false, submitLabel: 'Send message', successMessage: 'Thank you – we’ll be in touch shortly.', settings: set('enquiry') },
      ],
    },
    fr: {
      title: 'Contact',
      sections: (img) => [
        { __component: 'blocks.page-header', title: 'Nous joindre', subtitle: 'Dites-nous ce que vous devez protéger. Nous répondons habituellement en un jour ouvrable.', image: img['work.jpg'], showBreadcrumb: true },
        { __component: 'blocks.enquiry-form', tag: 'Écrivez-nous', heading: 'Parlez à notre équipe.', body: [p(t('Une question sur un produit, une soumission, le soutien ou la formation? Envoyez-nous un message et la bonne personne vous répondra.'))], formType: 'contact', showContactDetails: true, showCompany: true, showPhone: true, showDates: false, submitLabel: 'Envoyer le message', successMessage: 'Merci – nous vous répondrons sous peu.', settings: set('enquiry') },
      ],
    },
  },

  'rental-form': {
    en: {
      title: 'Rental form',
      sections: (img) => [
        { __component: 'blocks.page-header', title: 'Equipment rental', subtitle: 'Screening and detection equipment for summits, venues and temporary events.', image: img['screening.jpg'], showBreadcrumb: true },
        { __component: 'blocks.enquiry-form', tag: 'Rental request', heading: 'Tell us about your event.', body: [p(t('Share your dates, venue and the equipment you have in mind. We’ll confirm availability and send a rental quote.'))], formType: 'rental', showContactDetails: true, showCompany: true, showPhone: true, showDates: true, submitLabel: 'Send rental request', successMessage: 'Thank you – we’ll confirm availability shortly.', settings: set('enquiry') },
      ],
    },
    fr: {
      title: 'Formulaire de location',
      sections: (img) => [
        { __component: 'blocks.page-header', title: 'Location d’équipement', subtitle: 'Équipement de contrôle et de détection pour sommets, salles et événements temporaires.', image: img['screening.jpg'], showBreadcrumb: true },
        { __component: 'blocks.enquiry-form', tag: 'Demande de location', heading: 'Parlez-nous de votre événement.', body: [p(t('Indiquez vos dates, le lieu et l’équipement envisagé. Nous confirmerons la disponibilité et vous enverrons une soumission.'))], formType: 'rental', showContactDetails: true, showCompany: true, showPhone: true, showDates: true, submitLabel: 'Envoyer la demande', successMessage: 'Merci – nous confirmerons la disponibilité sous peu.', settings: set('enquiry') },
      ],
    },
  },
};

module.exports = { global, articles, events, pages };

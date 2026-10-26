'use strict';
/**
 * Product catalogue imported on first start (English + French).
 * Product summaries marked TODO are placeholders – replace them in the admin.
 */

const p = (...children) => ({ type: 'paragraph', children });
const t = (text, extra = {}) => ({ type: 'text', text, ...extra });

const categories = [
  {
    slug: 'cbrne-detection',
    image: 'hazmat.jpg',
    heroImage: 'hero-cbrne.jpg',
    en: { name: 'CBRNE Detection', description: 'Equipment for the detection, identification, measurement and surveillance of chemical, biological, radiological, nuclear and explosive threats.' },
    fr: { name: 'Détection CBRNE', description: 'Équipements de détection, d’identification, de mesure et de surveillance des menaces chimiques, biologiques, radiologiques, nucléaires et explosives.' },
    children: [
      {
        slug: 'chemical-detection-identification',
        image: 'cat-chemical.jpg',
        heroImage: 'hero-chemical.jpg',
        en: { name: 'Chemical Detection & Identification', description: 'Visiontec provides chemical detection & identification products that reliably protect your team from a variety of chemical threats, including drugs, CWAs, TICs and more.' },
        fr: { name: 'Détection et identification chimiques', description: 'Visiontec propose des produits de détection et d’identification chimiques qui protègent votre équipe contre diverses menaces chimiques, notamment les drogues, les agents de guerre chimique, les produits chimiques industriels toxiques et plus encore.' },
      },
      {
        slug: 'biological-detection-identification',
        image: 'cat-biological.jpg',
        en: { name: 'Biological Detection & Identification', description: 'Equipment to spot and characterize biological threats.' },
        fr: { name: 'Détection et identification biologiques', description: 'Des équipements pour repérer et caractériser les menaces biologiques.' },
      },
      {
        slug: 'radiation-detection-identification',
        image: 'cat-radiation.jpg',
        en: { name: 'Radiation Detection and Identification', description: 'Measure radiation and locate radioactive sources.' },
        fr: { name: 'Détection et identification des rayonnements', description: 'Mesurez les rayonnements et localisez les sources radioactives.' },
      },
      {
        slug: 'explosives-detection-identification',
        image: 'cat-explosives.jpg',
        en: { name: 'Explosives Detection and Identification', description: 'Find explosives and banned items at checkpoints and in the field.' },
        fr: { name: 'Détection et identification des explosifs', description: 'Repérez les explosifs et les articles interdits aux points de contrôle et sur le terrain.' },
      },
      {
        slug: 'unmanned-ground-systems',
        image: 'cat-ugs.jpg',
        en: { name: 'Unmanned Ground Systems', description: 'Robotic platforms that keep responders out of harm’s way.' },
        fr: { name: 'Systèmes terrestres sans pilote', description: 'Des plateformes robotisées qui tiennent les intervenants à l’écart du danger.' },
      },
      {
        slug: 'unmanned-air-systems',
        image: 'cat-uas.jpg',
        en: { name: 'Unmanned Air Systems', description: 'Aerial platforms and payloads for mapping and situational awareness.' },
        fr: { name: 'Systèmes aériens sans pilote', description: 'Plateformes et charges utiles aériennes pour la cartographie et la connaissance de la situation.' },
      },
    ],
  },
];

const TODO_EN = 'Chemical detection & identification. Contact us for specifications, pricing and rental availability.';
const TODO_FR = 'Détection et identification chimiques. Contactez-nous pour les caractéristiques, les prix et la location.';

const CHEM = 'chemical-detection-identification';
const EXPL = 'explosives-detection-identification';

/** [slug, name, brand, image, categories, en summary, fr summary, featured] */
const simpleProducts = [
  ['tr10-warden', 'TR10 Warden', 'Scentroid', 'product-tr10-warden.jpg', [CHEM], TODO_EN, TODO_FR],
  ['tr10-h-warden', 'TR10-H Warden', 'Scentroid', 'product-tr10h-warden.jpg', [CHEM], TODO_EN, TODO_FR],
  ['vipir', 'VIPIR', '', 'product-vipir.jpg', [CHEM], TODO_EN, TODO_FR],
  ['xplorir', 'XplorIR', '', 'product-xplorir.jpg', [CHEM], 'Portable chemical identification for the field.', 'Identification chimique portable pour le terrain.', true],
  ['mx908', 'MX908', '908 Devices', 'product-mx908.jpg', [CHEM, EXPL], 'Handheld mass spectrometry for trace chemical and explosive threats.', 'Spectrométrie de masse portative pour les menaces chimiques et explosives à l’état de traces.'],
  ['protectir', 'ProtectIR', '', 'product-protectir.jpg', [CHEM], TODO_EN, TODO_FR],
  ['threatid', 'ThreatID', '', 'product-threatid.jpg', [CHEM], TODO_EN, TODO_FR],
  ['ap4c', 'AP4C', 'Proengin', 'product-ap4c.jpg', [CHEM], 'Portable flame-spectrometry chemical detector.', 'Détecteur chimique portatif à spectrométrie de flamme.'],
  ['ap4c-v', 'AP4C-V', 'Proengin', 'product-ap4c-v.jpg', [CHEM], 'Vehicle-mounted version of the AP4C chemical detector.', 'Version embarquée sur véhicule du détecteur chimique AP4C.'],
  ['ap4c-f', 'AP4C-F', 'Proengin', 'product-ap4c-f.jpg', [CHEM], 'Fixed-site version of the AP4C chemical detector.', 'Version pour site fixe du détecteur chimique AP4C.'],
  ['griffin-g510', 'Griffin G510', 'Teledyne FLIR', 'product-griffin-g510.jpg', [CHEM], 'Portable GC-MS for confident identification in the field.', 'GC-MS portable pour une identification fiable sur le terrain.'],
  ['pendar-x10', 'Pendar X10', 'Pendar Technologies', 'pendar-x10.jpg', [CHEM, EXPL], 'Handheld identification from a safe distance.', 'Identification portative à distance sécuritaire.', true],
  ['hovermap-st', 'HoverMap ST', 'Emesent', 'hovermap-st.jpg', ['unmanned-air-systems'], 'Fast situational mapping for responders.', 'Cartographie rapide de la situation pour les intervenants.', true],
];

/* ---------- Sentry: full detail page, as on the current website ---------- */
const sentry = {
  slug: 'sentry',
  name: 'Sentry',
  brand: 'Scentroid',
  image: 'product-sentry.jpg',
  gallery: ['sentry-hero.jpg', 'sentry-field.jpg', 'sentry-firefighter.jpg', 'sentry-tablet.jpg'],
  categories: [CHEM],
  featured: false,
  canRent: true,
  en: {
    tagline: 'Sentry Chemical Threat Detection System',
    shortDescription:
      'The Sentry is a multi-sensor air monitoring system designed for rapid detection of chemical warfare agents, toxic industrial chemicals, combustion byproducts, and radiological hazards.',
    description: [
      p(t('Sentry provides real-time situational awareness in environments where airborne contaminants pose immediate risk to personnel, infrastructure, and surrounding populations.')),
      p(t('Designed, built, & supported in Canada. Contact us to learn more about the Sentry.')),
    ],
    specs: [
      { label: 'Manufacturer', value: 'Scentroid' },
      { label: 'Made in', value: 'Canada' },
      { label: 'Deployment', value: 'Portable, tripod or wall-mounted' },
      { label: 'Detects', value: 'CWAs, TICs, VOCs, particulates, gamma radiation' },
    ],
    sections: (img) => [
      {
        __component: 'blocks.rich-text',
        heading: 'Real-time hazard identification',
        body: [
          p(t('The Sentry is a chemical threat detection system designed to identify airborne toxic chemicals, industrial hazards, and chemical threats in real time. Using advanced multi-sensor technology and mobile deployment platforms, it supports rapid response in emergency, industrial, and high-risk environments.')),
        ],
        align: 'center',
        width: 'narrow',
      },
      {
        __component: 'blocks.image-text',
        heading: 'Integrated multi-sensor monitoring platform',
        body: [p(t('The Sentry Chemical Threat Detection System combines several complementary sensing technologies to provide broad-spectrum detection of airborne contaminants. Each sensor type is optimized for the detection of specific chemical classes while operating simultaneously to produce a unified environmental assessment.'))],
        image: img['sentry-field.jpg'],
        imagePosition: 'right',
      },
      {
        __component: 'blocks.image-text',
        heading: 'Customizable solutions for every environment',
        body: [p(t('The Sentry platform is designed to be highly adaptable, allowing each unit to be customized to match the specific requirements of the deployment site. Systems can be equipped with direct sampling probes for targeted gas measurements, mounted on tripods for rapid field deployment, or wall-mounted for continuous fixed monitoring in industrial facilities.'))],
        image: img['sentry-firefighter.jpg'],
        imagePosition: 'left',
      },
      {
        __component: 'blocks.image-text',
        heading: 'Environmental intelligence and data integration',
        body: [p(t('Sentry provides continuous environmental monitoring with real-time data transmission to centralized monitoring platforms. Sensors are integrated with environmental modeling software to support plume analysis and situational awareness.'))],
        image: img['sentry-tablet.jpg'],
        imagePosition: 'right',
      },
      {
        __component: 'blocks.split-list',
        heading: 'Broad range of supported sensing technologies',
        buttons: [{ label: 'Explore the brochure', href: '#enquiry' }],
        items: [
          { title: 'Electrochemical sensors (EC)', text: 'Highly selective sensors for specific toxic gases including hydrogen sulfide, chlorine, ammonia, nitrogen dioxide and hydrogen cyanide.' },
          { title: 'Photoionization detection (PID)', text: 'Broadband volatile organic compound detection using ultraviolet ionization.' },
          { title: 'Electro-polymer sensors', text: 'Specialized sensors designed to detect highly toxic hydride gases such as arsine.' },
          { title: 'Thermal fractionation – PID (TF-PID)', text: 'Selective chemical analysis capable of identifying nerve and blister agents at trace concentrations.' },
          { title: 'Laser particle counters', text: 'Optical monitoring of airborne particulate concentrations (PM1, PM2.5, PM10).' },
          { title: 'Radiation detection', text: 'Gamma radiation monitoring for detection of radiological dispersal events.' },
        ],
      },
      {
        __component: 'blocks.columns',
        heading: 'AI-driven predictive intelligence',
        columns: [
          { heading: 'Advanced dispersion modeling', body: [p(t('Integrates real-time local weather data (wind speed, direction, temperature) with TR9+ readings to generate accurate plume models instantly.'))] },
          { heading: 'Predictive forecasting', body: [p(t('Fast-forward the model to see the predicted path of the toxic cloud over the next hour, so areas can be evacuated before the gas arrives.'))] },
          { heading: 'Automated alarms & dynamic geo-fencing', body: [p(t('If the predictive model indicates the plume will cross into a defined critical zone, SIMS3 automatically triggers pre-set alarm protocols to field units.'))] },
          { heading: 'Instant flash reports', body: [p(t('Upon a critical detection event, SIMS3 compiles data into a standardized Flash Report summarizing chemical type, plume trajectory and at-risk sectors.'))] },
        ],
        settings: { background: 'tint', spacing: 'default', textColor: 'dark', hidden: false },
      },
    ],
  },
  fr: {
    tagline: 'Système de détection des menaces chimiques Sentry',
    shortDescription:
      'Le Sentry est un système de surveillance de l’air multicapteur conçu pour la détection rapide des agents de guerre chimique, des produits chimiques industriels toxiques, des sous-produits de combustion et des dangers radiologiques.',
    description: [
      p(t('Le Sentry offre une connaissance de la situation en temps réel dans les environnements où les contaminants atmosphériques représentent un risque immédiat pour le personnel, les infrastructures et les populations environnantes.')),
      p(t('Conçu, fabriqué et soutenu au Canada. Contactez-nous pour en savoir plus sur le Sentry.')),
    ],
    specs: [
      { label: 'Fabricant', value: 'Scentroid' },
      { label: 'Fabriqué au', value: 'Canada' },
      { label: 'Déploiement', value: 'Portatif, sur trépied ou mural' },
      { label: 'Détecte', value: 'Agents chimiques, TIC, COV, particules, rayonnement gamma' },
    ],
    sections: (img) => [
      {
        __component: 'blocks.rich-text',
        heading: 'Identification des dangers en temps réel',
        body: [
          p(t('Le Sentry est un système de détection des menaces chimiques conçu pour identifier en temps réel les produits chimiques toxiques en suspension dans l’air, les dangers industriels et les menaces chimiques. Grâce à une technologie multicapteur avancée et à des plateformes de déploiement mobiles, il soutient une intervention rapide dans les environnements d’urgence, industriels et à haut risque.')),
        ],
        align: 'center',
        width: 'narrow',
      },
      {
        __component: 'blocks.image-text',
        heading: 'Plateforme de surveillance multicapteur intégrée',
        body: [p(t('Le système Sentry combine plusieurs technologies de détection complémentaires pour une détection à large spectre des contaminants atmosphériques. Chaque type de capteur est optimisé pour une classe chimique précise et fonctionne simultanément avec les autres pour produire une évaluation environnementale unifiée.'))],
        image: img['sentry-field.jpg'],
        imagePosition: 'right',
      },
      {
        __component: 'blocks.image-text',
        heading: 'Des solutions adaptées à chaque environnement',
        body: [p(t('La plateforme Sentry est conçue pour être très adaptable : chaque unité peut être configurée selon les exigences du site. Les systèmes peuvent recevoir des sondes d’échantillonnage direct, être montés sur trépied pour un déploiement rapide ou fixés au mur pour une surveillance continue dans les installations industrielles.'))],
        image: img['sentry-firefighter.jpg'],
        imagePosition: 'left',
      },
      {
        __component: 'blocks.image-text',
        heading: 'Intelligence environnementale et intégration des données',
        body: [p(t('Le Sentry assure une surveillance environnementale continue avec transmission des données en temps réel vers des plateformes centralisées. Les capteurs sont intégrés à un logiciel de modélisation environnementale pour l’analyse des panaches et la connaissance de la situation.'))],
        image: img['sentry-tablet.jpg'],
        imagePosition: 'right',
      },
      {
        __component: 'blocks.split-list',
        heading: 'Un large éventail de technologies de détection',
        buttons: [{ label: 'Consulter la brochure', href: '#enquiry' }],
        items: [
          { title: 'Capteurs électrochimiques (EC)', text: 'Capteurs très sélectifs pour des gaz toxiques précis, dont le sulfure d’hydrogène, le chlore, l’ammoniac, le dioxyde d’azote et le cyanure d’hydrogène.' },
          { title: 'Détection par photoionisation (PID)', text: 'Détection à large bande des composés organiques volatils par ionisation ultraviolette.' },
          { title: 'Capteurs électropolymères', text: 'Capteurs spécialisés pour les gaz hydrures très toxiques comme l’arsine.' },
          { title: 'Fractionnement thermique – PID (TF-PID)', text: 'Analyse chimique sélective capable d’identifier les agents neurotoxiques et vésicants à l’état de traces.' },
          { title: 'Compteurs de particules laser', text: 'Surveillance optique des concentrations de particules en suspension (PM1, PM2.5, PM10).' },
          { title: 'Détection des rayonnements', text: 'Surveillance du rayonnement gamma pour détecter les dispersions radiologiques.' },
        ],
      },
      {
        __component: 'blocks.columns',
        heading: 'Intelligence prédictive alimentée par l’IA',
        columns: [
          { heading: 'Modélisation avancée de la dispersion', body: [p(t('Combine les données météo locales en temps réel (vitesse et direction du vent, température) aux lectures du TR9+ pour générer instantanément des modèles de panache précis.'))] },
          { heading: 'Prévisions', body: [p(t('Faites avancer le modèle pour voir la trajectoire prévue du nuage toxique au cours de la prochaine heure et évacuer les zones avant l’arrivée du gaz.'))] },
          { heading: 'Alarmes automatiques et géorepérage dynamique', body: [p(t('Si le modèle prévoit que le panache atteindra une zone critique définie, SIMS3 déclenche automatiquement les protocoles d’alarme prédéfinis vers les équipes sur le terrain.'))] },
          { heading: 'Rapports éclair instantanés', body: [p(t('Lors d’une détection critique, SIMS3 compile les données dans un rapport éclair normalisé résumant le type de produit chimique, la trajectoire du panache et les secteurs à risque.'))] },
        ],
        settings: { background: 'tint', spacing: 'default', textColor: 'dark', hidden: false },
      },
    ],
  },
};

const partners = [
  ['Agility Technologies', 'partner-agility.png'],
  ['OPEC CBRNe', 'partner-opec.png'],
  ['CEIA', 'partner-ceia.png'],
  ['Leidos', 'partner-leidos.png'],
  ['Morphix Technologies', 'partner-morphix.png'],
  ['OD Security', 'partner-od-security.png'],
  ['Pendar Technologies', 'partner-pendar.png'],
  ['Proengin', 'partner-proengin.png'],
  ['908 Devices', 'partner-908devices.png'],
  ['ScanTech', 'partner-scantech.png'],
  ['Teledyne FLIR', 'partner-teledyne-flir.png'],
  ['ARC X-Ray Center', 'partner-arc-xray.png'],
  ['Hovermap', 'partner-hovermap.png'],
  ['Scentroid', 'partner-scentroid.png'],
];

module.exports = { categories, simpleProducts, sentry, partners, p, t };

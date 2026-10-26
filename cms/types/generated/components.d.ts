import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_banner';
  info: {
    description: '';
    displayName: 'Image banner';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', false>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    text: Schema.Attribute.Text;
  };
}

export interface BlocksCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_cards';
  info: {
    description: '';
    displayName: 'Cards grid';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 2;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'elements.card', true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksCategories extends Struct.ComponentSchema {
  collectionName: 'components_blocks_categories';
  info: {
    description: '';
    displayName: 'Category cards';
  };
  attributes: {
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    parent: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksColumns extends Struct.ComponentSchema {
  collectionName: 'components_blocks_columns';
  info: {
    description: '';
    displayName: 'Text columns';
  };
  attributes: {
    columns: Schema.Attribute.Component<'elements.text-column', true>;
    heading: Schema.Attribute.String;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksContact extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact';
  info: {
    description: '';
    displayName: 'Closing call-to-action';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.link', true>;
    heading: Schema.Attribute.String;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    text: Schema.Attribute.Text;
  };
}

export interface BlocksCustomHtml extends Struct.ComponentSchema {
  collectionName: 'components_blocks_custom_html';
  info: {
    description: '';
    displayName: 'Custom HTML / embed';
  };
  attributes: {
    code: Schema.Attribute.Text;
    contained: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
  };
}

export interface BlocksEnquiryForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_enquiry_form';
  info: {
    description: '';
    displayName: 'Enquiry form';
  };
  attributes: {
    body: Schema.Attribute.Blocks;
    formType: Schema.Attribute.Enumeration<
      ['contact', 'quote', 'rental', 'support']
    > &
      Schema.Attribute.DefaultTo<'contact'>;
    heading: Schema.Attribute.String;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    showCompany: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    showContactDetails: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    showDates: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    showPhone: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    submitLabel: Schema.Attribute.String;
    successMessage: Schema.Attribute.String;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faq';
  info: {
    description: '';
    displayName: 'FAQ';
  };
  attributes: {
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'elements.faq-item', true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksGallery extends Struct.ComponentSchema {
  collectionName: 'components_blocks_gallery';
  info: {
    description: '';
    displayName: 'Image gallery';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 2;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    heading: Schema.Attribute.String;
    images: Schema.Attribute.Component<'elements.gallery-item', true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero';
  info: {
    description: '';
    displayName: 'Hero (animated)';
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    badge: Schema.Attribute.String;
    featuredLabel: Schema.Attribute.String;
    featuredLinkLabel: Schema.Attribute.String;
    featuredProduct: Schema.Attribute.Relation<
      'oneToOne',
      'api::product.product'
    >;
    features: Schema.Attribute.Component<'elements.feature', true>;
    pillHref: Schema.Attribute.String;
    pillText: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<'shared.link', false>;
    secondaryCta: Schema.Attribute.Component<'shared.link', false>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    showGrid: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    signalTitle: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    tileCbrne: Schema.Attribute.Component<'elements.hero-tile', false>;
    tileCommunity: Schema.Attribute.Component<'elements.hero-tile', false>;
    tilePremises: Schema.Attribute.Component<'elements.hero-tile', false>;
    titleLine1: Schema.Attribute.String;
    titleLine2: Schema.Attribute.String;
  };
}

export interface BlocksImageText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_text';
  info: {
    description: '';
    displayName: 'Image + text';
  };
  attributes: {
    badge: Schema.Attribute.String;
    body: Schema.Attribute.Blocks;
    buttons: Schema.Attribute.Component<'shared.link', true>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imagePosition: Schema.Attribute.Enumeration<['right', 'left']> &
      Schema.Attribute.DefaultTo<'right'>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksMarquee extends Struct.ComponentSchema {
  collectionName: 'components_blocks_marquee';
  info: {
    description: '';
    displayName: 'Scrolling words';
  };
  attributes: {
    row1: Schema.Attribute.Component<'elements.word', true>;
    row2: Schema.Attribute.Component<'elements.word', true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
  };
}

export interface BlocksNews extends Struct.ComponentSchema {
  collectionName: 'components_blocks_news';
  info: {
    description: '';
    displayName: 'News & events';
  };
  attributes: {
    heading: Schema.Attribute.String;
    postsLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    showEvents: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksPageHeader extends Struct.ComponentSchema {
  collectionName: 'components_blocks_page_header';
  info: {
    description: '';
    displayName: 'Page header';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    showBreadcrumb: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksPartners extends Struct.ComponentSchema {
  collectionName: 'components_blocks_partners';
  info: {
    description: '';
    displayName: 'Partner logos';
  };
  attributes: {
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksProducts extends Struct.ComponentSchema {
  collectionName: 'components_blocks_products';
  info: {
    description: '';
    displayName: 'Products grid';
  };
  attributes: {
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
    count: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 24;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    mode: Schema.Attribute.Enumeration<
      ['all', 'featured', 'category', 'selected']
    > &
      Schema.Attribute.DefaultTo<'all'>;
    selected: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_text';
  info: {
    description: '';
    displayName: 'Text';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'center']> &
      Schema.Attribute.DefaultTo<'left'>;
    body: Schema.Attribute.Blocks;
    buttons: Schema.Attribute.Component<'shared.link', true>;
    heading: Schema.Attribute.String;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
    width: Schema.Attribute.Enumeration<['narrow', 'wide']> &
      Schema.Attribute.DefaultTo<'narrow'>;
  };
}

export interface BlocksSolutions extends Struct.ComponentSchema {
  collectionName: 'components_blocks_solutions';
  info: {
    description: '';
    displayName: 'Stacked cards';
  };
  attributes: {
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'elements.solution-item', true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksSpectrum extends Struct.ComponentSchema {
  collectionName: 'components_blocks_spectrum';
  info: {
    description: '';
    displayName: 'Expanding panels';
  };
  attributes: {
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'elements.spectrum-item', true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksSplitList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_split_list';
  info: {
    description: '';
    displayName: 'Heading + list';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.link', true>;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'elements.list-item', true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksStatement extends Struct.ComponentSchema {
  collectionName: 'components_blocks_statement';
  info: {
    description: '';
    displayName: 'Statement (word highlight)';
  };
  attributes: {
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    text: Schema.Attribute.Text;
  };
}

export interface BlocksStats extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stats';
  info: {
    description: '';
    displayName: 'Numbers / stats';
  };
  attributes: {
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'elements.stat', true>;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksSteps extends Struct.ComponentSchema {
  collectionName: 'components_blocks_steps';
  info: {
    description: '';
    displayName: 'Numbered steps';
  };
  attributes: {
    heading: Schema.Attribute.String;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    steps: Schema.Attribute.Component<'elements.step', true>;
    tag: Schema.Attribute.String;
  };
}

export interface BlocksVideo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_video';
  info: {
    description: '';
    displayName: 'Video';
  };
  attributes: {
    heading: Schema.Attribute.String;
    settings: Schema.Attribute.Component<'shared.section-settings', false>;
    tag: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_card';
  info: {
    description: '';
    displayName: 'Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_faq_item';
  info: {
    description: '';
    displayName: 'FAQ item';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface ElementsFeature extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature';
  info: {
    description: '';
    displayName: 'Feature';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface ElementsFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_column';
  info: {
    description: '';
    displayName: 'Footer column';
  };
  attributes: {
    heading: Schema.Attribute.String;
    links: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface ElementsGalleryItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_gallery_item';
  info: {
    description: '';
    displayName: 'Gallery image';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ElementsHeroTile extends Struct.ComponentSchema {
  collectionName: 'components_elements_hero_tile';
  info: {
    description: '';
    displayName: 'Hero tile';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
  };
}

export interface ElementsListItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_list_item';
  info: {
    description: '';
    displayName: 'List item';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsNavItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_nav_item';
  info: {
    description: 'Top menu link. Add children for a dropdown, or tick \u201Cshow product categories\u201D.';
    displayName: 'Menu item';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.link', true>;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    showProductCategories: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ElementsSolutionItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_solution_item';
  info: {
    description: '';
    displayName: 'Stacked card';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', false>;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsSpec extends Struct.ComponentSchema {
  collectionName: 'components_elements_spec';
  info: {
    description: '';
    displayName: 'Specification';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ElementsSpectrumItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_spectrum_item';
  info: {
    description: '';
    displayName: 'Panel';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    letter: Schema.Attribute.String;
    name: Schema.Attribute.String;
    position: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface ElementsStat extends Struct.ComponentSchema {
  collectionName: 'components_elements_stat';
  info: {
    description: '';
    displayName: 'Stat';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ElementsStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_step';
  info: {
    description: '';
    displayName: 'Step';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsTextColumn extends Struct.ComponentSchema {
  collectionName: 'components_elements_text_column';
  info: {
    description: '';
    displayName: 'Text column';
  };
  attributes: {
    body: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
  };
}

export interface ElementsWord extends Struct.ComponentSchema {
  collectionName: 'components_elements_word';
  info: {
    description: '';
    displayName: 'Word';
  };
  attributes: {
    word: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_link';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedSectionSettings extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_settings';
  info: {
    description: 'Background, spacing, #anchor and hide toggle';
    displayName: 'Section design';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['default', 'page', 'white', 'tint', 'dark', 'custom']
    > &
      Schema.Attribute.DefaultTo<'default'>;
    customColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<
        'plugin::color-picker.color',
        {
          format: 'hex';
        }
      >;
    hidden: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    spacing: Schema.Attribute.Enumeration<
      ['default', 'none', 'sm', 'md', 'lg']
    > &
      Schema.Attribute.DefaultTo<'default'>;
    textColor: Schema.Attribute.Enumeration<['dark', 'light']> &
      Schema.Attribute.DefaultTo<'dark'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo';
  info: {
    description: '';
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blocks.banner': BlocksBanner;
      'blocks.cards': BlocksCards;
      'blocks.categories': BlocksCategories;
      'blocks.columns': BlocksColumns;
      'blocks.contact': BlocksContact;
      'blocks.custom-html': BlocksCustomHtml;
      'blocks.enquiry-form': BlocksEnquiryForm;
      'blocks.faq': BlocksFaq;
      'blocks.gallery': BlocksGallery;
      'blocks.hero': BlocksHero;
      'blocks.image-text': BlocksImageText;
      'blocks.marquee': BlocksMarquee;
      'blocks.news': BlocksNews;
      'blocks.page-header': BlocksPageHeader;
      'blocks.partners': BlocksPartners;
      'blocks.products': BlocksProducts;
      'blocks.rich-text': BlocksRichText;
      'blocks.solutions': BlocksSolutions;
      'blocks.spectrum': BlocksSpectrum;
      'blocks.split-list': BlocksSplitList;
      'blocks.statement': BlocksStatement;
      'blocks.stats': BlocksStats;
      'blocks.steps': BlocksSteps;
      'blocks.video': BlocksVideo;
      'elements.card': ElementsCard;
      'elements.faq-item': ElementsFaqItem;
      'elements.feature': ElementsFeature;
      'elements.footer-column': ElementsFooterColumn;
      'elements.gallery-item': ElementsGalleryItem;
      'elements.hero-tile': ElementsHeroTile;
      'elements.list-item': ElementsListItem;
      'elements.nav-item': ElementsNavItem;
      'elements.solution-item': ElementsSolutionItem;
      'elements.spec': ElementsSpec;
      'elements.spectrum-item': ElementsSpectrumItem;
      'elements.stat': ElementsStat;
      'elements.step': ElementsStep;
      'elements.text-column': ElementsTextColumn;
      'elements.word': ElementsWord;
      'shared.link': SharedLink;
      'shared.section-settings': SharedSectionSettings;
      'shared.seo': SharedSeo;
    }
  }
}

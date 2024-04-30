// basic API answer types
export type WidgetContent = {
  widgetId: string;
  content: string;
};

export type ApiResponse = {
  value: {
    title: string;
    metaDescription: string;
    metaKeywords: string;
    alternateLinks: AlternateLink;
    widgets: Widget[];
  };
};

export type WidgetId = {
  widgetId: string;
};

// Accordions
export type AccordionButton = {
  title: string;
  url: string;
  iconSrc?: string;
  iconAlt?: string;
};

export type VignetteAccordionItem = {
  preTitle?: string;
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  desc?: string; 
  secondaryIconSrc?: string;
  secondaryIconAlt?: string;
  buttons: AccordionButton[];
};

export type VignetteAccordion = {
  vignetteTypes: VignetteAccordionItem[];
};

export type Item = {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  desc?: string;
};

export type MainAccordion = {
  pageTitle?: string;
  mainTitle?: string;
  items: Item[];
};

// News (news.vue)
export type TopNewsItem = {
  id: string;
  src?: string;
  alt?: string;
  title: string;
  desc: string;
  buttonText?: string;
  buttonIconSrc?: string;
  buttonTitle?: string;
  url: string;
};

export type TopNews = {
  mainTitle?: string;
  pageTitle?: string;
  items: TopNewsItem[];
};

export type TopNewsContent = {
  topNews: TopNews;
};

export type NewsWidget = {
  widgetId: string;
  widgetType: string;
  content: TopNewsContent;
};


// Menu (menu.vue)
export type MenuLogo = {
  src: string;
  alt: string;
  title: string;
};

export type MenuItem = {
  title: string;
  url: string;
};

export type LanguageSelectionItem = {
  title: string;
  code: string;
  imgSrc: string;
  alt: string;
};

export type MenuWidgetContent = {
  siteUrl: string;
  logo: MenuLogo;
  menu: MenuItem[];
  langArrowSrc: string;
  languageSelection: LanguageSelectionItem[];
};

export type MenuWidget = {
logo: any;
menu: any;
siteUrl: string | undefined;
languageSelection: any;
  widgetId: string;
  widgetType: string;
  content: string;
};

// purchaseflow widget (purchaseFlow.vue)
export type Step = {
  stepIcon: string;
  stepIconAlt: string;
  description: string;
};

export type FlowContent = {
  mainTitle: string;
  mainSvgSrc: string;
  mainSvgAlt: string;
  buttonText: string;
  buttonUrl: string;
  items: Step[];
};

// simple widgets
export type Widget = {
  widgetId: string;
  widgetType: string;
  section: string;
  content: string;
  pageTitle: string;
};


// footer.vue 

export type FooterLogo = {
  src: string;
  alt: string;
  title: string;
};

export type FooterMenuItem = {
  title: string;
  url: string;
};

export type AppLink = {
  android: string;
  iOS: string;
};

export type AppImage = {
  androidSrc: string;
  iOSSrc: string;
  androidAlt: string;
  iosAlt: string;
};

export type PaymentOption = {
  title: string;
  url: string;
  src: string;
};

export type SocialMedia = {
  platform: string;
  url: string;
  src: string;
  id: string;
};

export type FooterWidgetContent = {
  siteUrl: string;
  newsTitle: string;
  aboutTitle: string;
  sitesTitle: string;
  socialMediaTitle: string;
  footerLogo: FooterLogo;
  description: string;
  menu: FooterMenuItem[];
  topNewsLinks: FooterMenuItem[];
  about: FooterMenuItem[];
  appLinks: AppLink;
  appImages: AppImage;
  paymentOptions: PaymentOption[];
  socialMedia: SocialMedia[];
  copyRight: string;
};

export type FooterWidget = {
  widgetId: string;
  widgetType: string;
  content: FooterWidgetContent;
};

export type AlternateLink = {
  ro: string;
  de: string;
  sk: string;
  en: string;
};
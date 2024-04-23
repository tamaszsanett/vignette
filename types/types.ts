// basic API answer types
export type WidgetContent = {
  widgetId: string;
  content: string;
};

export type ApiResponse = {
  value: {
    widgets: Widget[];
  };
};

export type WidgetId = {
  widgetId: string;
};

// FAQ (faq.vue)
export type AccordionItem = {
  title: string;
  desc: string;
};

export type AccordionContent = {
  mainIconSrc?: string;
  mainIconAlt?: string;
  mainTitle?: string;
  content: AccordionItem[];
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
  mainTitle: string;
  items: TopNewsItem[];
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
  url: string;
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
[x: string]: any;
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
};

// Accordion another version (vignetteAccordion.vue)
export type Button = {
  title: string;
  iconSrc: string;
  iconAlt: string;
  url: string;
};

export type VignetteAccordionItem = {
  preTitle?: string;
  secondaryIconSrc?: string;
  secondaryIconAlt?: string;
  title: string;
  desc?: string;
  buttons: Button[];
};

export type VignetteAccordionContent = {
  content: VignetteAccordionItem[];
};

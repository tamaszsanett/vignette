export const apiEndpoints = {
  test: {
    widgets:
      "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri",
    vignetteEndpoint: "https://test-gw.voxpay.hu/Webshop.Vignette",
    webshopEndpoint: "https://test-gw.voxpay.hu/Webshop.Common",
    gtm: "GTM-NJKJX3PX",
    gtag: "G-X1MZEJ9MFM",
    redirectUrl: "https://new-hungary-vignette.voxpay.hu/"
  },
  prod: {
    widgets:
      "https://gw.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri",
    vignetteEndpoint: "https://gw.voxpay.hu/Webshop.Vignette",
    webshopEndpoint: "https://gw.voxpay.hu/Webshop.Common",
    gtm: "GTM-NJKJX3PX",
    gtag: "G-X1MZEJ9MFM",
    redirectUrl: "https://hungary-vignette.eu/"
  },
};

// outsourcing vars
export const routeConfig = {
  HOME: {
    url: '/',
  },
  SHOP: {
    url: '/shop',
  },
  AD_SHOP: {
    url: '/shop/ad/:adId',
    realUrl: adId => `/shop/ad/${adId}`,
  },
  ABOUT: {
    url: '/about-us',
  },
  CONTACT: {
    url: '/contact',
  },
  REGISTER: {
    url: '/register',
  },
  LOGIN: {
    url: '/login',
  },
  USER_ACTIVATE: {
    url: '/user-activate/:id',
    realUrl: id => `/user-activate/${id}`,
  },
};

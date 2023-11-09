const path = require('path');

module.exports = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    // ns: ['common'],
    // defaultNs: 'common',
  },
  localePath: path.resolve('./src/i18n'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

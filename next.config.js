const { i18n } = require('./next-i18next.config');
const runtimeCaching = require('next-pwa/cache');
const withPreconstruct = require('@preconstruct/next');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  // swcMinify: true,
});

module.exports = withPreconstruct(
  withPWA({
    i18n,
    staticPageGenerationTimeout: 20000,
  })
);

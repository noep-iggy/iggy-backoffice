/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires, no-undef */

const { i18n } = require('./next-i18next.config');

const settings = {
  i18n,
  staticPageGenerationTimeout: 20000,
  output: 'standalone',
  // https://github.com/vercel/next.js/issues/48748#issuecomment-1578374105
  modularizeImports: {
    '@heroicons/react/outline/?(((\\w*)?/?)*)': {
      transform: '@heroicons/react/outline/{{ matches.[1] }}/{{member}}',
    },
    '@heroicons/react/solid/?(((\\w*)?/?)*)': {
      transform: '@heroicons/react/solid/{{ matches.[1] }}/{{member}}',
    },
  },
};

module.exports = settings;

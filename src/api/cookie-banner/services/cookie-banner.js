'use strict';

/**
 * cookie-banner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cookie-banner.cookie-banner');

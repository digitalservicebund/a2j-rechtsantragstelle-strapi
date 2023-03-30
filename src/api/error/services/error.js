'use strict';

/**
 * error service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::error.error');

'use strict';

/**
 * error controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::error.error');

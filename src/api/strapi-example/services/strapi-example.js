'use strict';

/**
 * strapi-example service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::strapi-example.strapi-example');

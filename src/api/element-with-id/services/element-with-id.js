'use strict';

/**
 * element-with-id service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::element-with-id.element-with-id');

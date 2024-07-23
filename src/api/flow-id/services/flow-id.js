'use strict';

/**
 * flow-id service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flow-id.flow-id');

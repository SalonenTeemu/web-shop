const responseUtils = require('../utils/responseUtils.js');

// read products at startup
const data = {
  products: require('../products.json').map(product => ({...product })),
};

/**
 * Send all products as JSON
 *
 * @param {http.ServerResponse} response
 */
const getAllProducts = response => {
  // TODO: 10.2 Implement this
  responseUtils.sendJson(response, data.products);
};

module.exports = { getAllProducts };

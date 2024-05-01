const { getCredentials } = require('../utils/requestUtils.js');
const User = require('../models/user.js');

/**
 * Get current user based on the request headers
 *
 * @param {http.IncomingMessage} request
 * @returns {Object|null} current authenticated user or null if not yet authenticated
 */
const getCurrentUser = async request => {
  const credentials = getCredentials(request);

  if (credentials) {
    const [email, password] = credentials;

    try {
      const user = await User.findOne({ email: email }).exec();

      if (user) {
        const passwordMatch = await user.checkPassword(password);

        if (passwordMatch) {
          return user;
        }
      }
    } catch (error) {
      return null;
    }
  }

  return null;
};

module.exports = { getCurrentUser };
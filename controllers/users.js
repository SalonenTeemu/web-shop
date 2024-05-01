const responseUtils = require('../utils/responseUtils.js');
const User = require('../models/user.js');

/**
 * Send all users as JSON
 *
 * @param {http.ServerResponse} response
 */
const getAllUsers = async response => {
  // TODO: 10.2 Implement this
  responseUtils.sendJson(response, await User.find({}));
};

/**
 * Delete user and send deleted user as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 */
const deleteUser = async(response, userId, currentUser) => {
  // TODO: 10.2 Implement this
  try {
    const user = await User.findById(userId);
    if (user) {
      if (currentUser._id === userId) {
        responseUtils.badRequest(response, "Bad request");
        return;
      }
      const deleted = await User.findOneAndDelete({ _id: userId });
      if (deleted) {
        responseUtils.sendJson(response, deleted);
      } else {
      responseUtils.notFound(response);
      }
    } else {
      responseUtils.notFound(response);
    }
  } catch (error) {
    responseUtils.internalServerError(response);
  }
};

/**
 * Update user and send updated user as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 * @param {Object} userData JSON data from request body
 */
const updateUser = async(response, userId, currentUser, userData) => {
  // TODO: 10.2 Implement this
  try {
    const user = await User.findById(userId);
    if (user) {
      if (currentUser._id === userId) {
        responseUtils.badRequest(response, "Bad request");
        return;
      }
      user.role = userData.role;
      await user.save();
      responseUtils.sendJson(response, user);
    } else {
      responseUtils.notFound(response);
    }
  } catch (error) {
    responseUtils.badRequest(response, "Bad request");
  }
};

/**
 * Send user data as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 */
const viewUser = async(response, userId, currentUser) => {
  // TODO: 10.2 Implement this
  try {
    const user = await User.findById(userId);
    if (user) {
      responseUtils.sendJson(response, user);
    } else {
      responseUtils.notFound(response);
    }
  } catch (error) {
    responseUtils.internalServerError(response);
  }
};

/**
 * Register new user and send created user back as JSON
 *
 * @param {http.ServerResponse} response
 * @param {Object} userData JSON data from request body
 */
const registerUser = async(response, userData) => {
  // TODO: 10.2 Implement this
  userData.role = 'customer';
  try {
    const user = new User(userData);
    await user.save();
    responseUtils.createdResource(response, user);
  } catch (error) {
    responseUtils.badRequest(response, "Bad request");
  }
};

module.exports = { getAllUsers, registerUser, deleteUser, viewUser, updateUser };

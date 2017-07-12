'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  /**
   * Returns all users
   * @returns {*} all users in json
   */
  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  /**
   * Adds a user to the list of users
   * @param user User to be added
   */
  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  /**
   * Returns a user by id
   * @param id Id of the user
   * @returns {*} User with the id
   */
  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  /**
   * Returns a user by email
   * @param email Email of the user
   * @returns {*} User with the email
   */
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  /**
   * Removes a user from the json
   * @param user User to be removed
   */
  removeUser(user) {
    this.store.remove(this.collection, user);
    this.store.save();
  },
};

module.exports = userStore;

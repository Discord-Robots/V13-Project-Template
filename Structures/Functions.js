const { owners } = require("../config.json");

module.exports = class Funtions {
  constructor(client) {
    this.client = client;
  }

  isOwner(member) {
    return owners.includes(member);
  }
};

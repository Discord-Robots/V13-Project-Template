const { Schema, model } = require("mongoose");

module.exports = model(
  "Guild",
  new Schema({
    gID: { type: String },
    gName: { type: String },
    modC: { type: String, default: "" },
    verifiedRole: { type: String, default: "" },
    welcomeC: { type: String, default: "" },
    introC: { type: String, default: "" },
  }),
  "Guild"
);

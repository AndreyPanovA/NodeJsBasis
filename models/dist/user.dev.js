"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var userSchema = Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      count: {
        type: Number,
        required: true,
        "default": 1
      },
      courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
      }
    }]
  }
});
module.exports = model("User", userSchema);
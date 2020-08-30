"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

userSchema.methods.addToCart = function (course) {
  var clonedItems = _toConsumableArray(this.cart.items);

  var idx = clonedItems.findIndex(function (el) {
    return el.courseId.toString() === course._id.toString();
  });

  if (idx >= 0) {
    clonedItems[idx].count++;
  } else {
    clonedItems.push({
      courseId: course._id,
      count: 1
    });
  }

  var newCart = {
    items: clonedItems
  };
  this.cart = newCart;
  return this.save();
};

module.exports = model("User", userSchema);
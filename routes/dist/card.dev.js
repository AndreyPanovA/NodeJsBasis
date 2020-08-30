"use strict";

var _require = require("express"),
    Router = _require.Router;

var router = Router(); // const Card = require("../models/card")

var Course = require("../models/course");

router.post("/add", function _callee(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.body.id));

        case 2:
          course = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(req.user.addToCart(course));

        case 5:
          // 
          res.redirect("/card");

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
router["delete"]("/remove/:id", function _callee2(req, res) {
  var card;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Card.remove(req.params.id));

        case 2:
          card = _context2.sent;
          res.status(200).json(card);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/", function _callee3(req, res) {
  var card;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Card.fetch());

        case 2:
          card = _context3.sent;
          res.render("card", {
            title: "Basket",
            isCard: true,
            courses: card.courses,
            price: card.price
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require("express"),
    Router = _require.Router;

var Course = require("../models/course");

var router = Router();
router.get("/", function (req, res) {
  res.render("add", {
    title: "Новый курс",
    isAdd: true
  });
});
router.post("/", function _callee(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(_typeof(req.body), req.body); // const course = new Course(req.body.title, req.body.price, req.body.img)

          course = new Course({
            title: req.body.title,
            price: req.body.price,
            img: req.body.img,
            userId: req.user
          });
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(course.save());

        case 5:
          res.redirect("/");
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
});
module.exports = router;
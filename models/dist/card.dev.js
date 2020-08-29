"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var path = require("path");

var fs = require("fs");

var p = path.join(path.dirname(process.mainModule.filename), "data", "card.json");

var Card =
/*#__PURE__*/
function () {
  function Card() {
    _classCallCheck(this, Card);
  }

  _createClass(Card, null, [{
    key: "add",
    value: function add(course) {
      var card, idx, candidate;
      return regeneratorRuntime.async(function add$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(Card.fetch());

            case 2:
              card = _context.sent;
              idx = null;
              card.courses.forEach(function (element, index) {
                if (element.id === course.id) {
                  idx = index;
                }
              }); // let index = card.courses.findIndex((el) => el.id === course.id)

              candidate = card.courses[idx];

              if (candidate) {
                // Курс уже есть
                candidate.count++;
                card.courses[idx] = candidate;
              } else {
                course.count = 1;
                card.courses.push(course); // Нужно добавить
              }

              card.price += +course.price;
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                fs.writeFile(p, JSON.stringify(card), function (err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              }));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "fetch",
    value: function fetch() {
      return regeneratorRuntime.async(function fetch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                fs.readFile(p, "utf-8", function (err, content) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(JSON.parse(content));
                  }
                });
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "remove",
    value: function remove(id) {
      var card, idx, course;
      return regeneratorRuntime.async(function remove$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(Card.fetch());

            case 2:
              card = _context3.sent;
              idx = card.courses.findIndex(function (el) {
                return el.id === id;
              });
              course = card.courses[idx];

              if (course.count == 1) {
                // Удалить
                card.courses = card.courses.filter(function (el) {
                  return el.id !== id;
                });
              } else {
                course.count--;
              }

              card.price -= course.price;
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                fs.writeFile(p, JSON.stringify(card), function (err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(card);
                  }
                });
              }));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return Card;
}();

module.exports = Card;
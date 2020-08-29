"use strict";

var _require = require("express"),
    Router = _require.Router;

var Course = require("../models/course");

var router = Router();
router.get("/", function _callee(req, res) {
  var courses;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Course.find());

        case 2:
          courses = _context.sent;
          res.render("courses", {
            title: "Курсы",
            isCourses: true,
            courses: courses
          }); // res.status(200).sendFile(path.join(__dirname, "views", "about.html"))

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/:id/edit", function _callee2(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id));

        case 2:
          course = _context2.sent;

          if (req.query.allow) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.redirect("/"));

        case 7:
          res.render("course-edit", {
            title: "\u041A\u0443\u0440\u0441 ".concat(course.title),
            isCourses: true,
            course: course
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/:id", function _callee3(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id));

        case 2:
          course = _context3.sent;
          res.render("course", {
            layout: "empty",
            title: "\u041A\u0443\u0440\u0441 ".concat(course.title),
            isCourses: true,
            course: course
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post("/edit", function _callee4(req, res) {
  var id, course;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // const course = await Course.update(req.body)
          id = req.body.id;
          delete req.body.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Course.findByIdAndUpdate(id, req.body));

        case 4:
          course = _context4.sent;
          res.redirect("/courses");

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // mongoDB

router.post("/remove", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Course.deleteOne({
            _id: req.body.id
          }));

        case 3:
          res.redirect("/courses");
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;
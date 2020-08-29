"use strict";

var express = require("express");

var path = require("path");

var mongoose = require("mongoose"); // const exphbs = require("express-handlebars")


var Handlebars = require("handlebars");

var expressHandlebars = require('express-handlebars');

var _require = require('@handlebars/allow-prototype-access'),
    allowInsecurePrototypeAccess = _require.allowInsecurePrototypeAccess;

var app = express(); // routes

var homeRoutes = require("./routes/home");

var addRoutes = require("./routes/add");

var coursesRoutes = require("./routes/courses");

var cardRoutes = require("./routes/card"); // routes
// Models


var User = require("./models/user"); // midleware for User


app.use(function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById("5f4ac413165b9b8a3f21c0b3"));

        case 3:
          user = _context.sent;
          req.user = user;
          next();
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // const hbs = expressHandlebars.create({
//     defaultLayout: "main", // дефолтная папка
//     extname: "hbs"
// })
// app.engine("hbs", hbs.engine) // регистрация hbs, что он вообще есть

app.engine('hbs', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: "main",
  // дефолтная папка
  extname: "hbs"
}));
app.set("views", path.join(__dirname, "views")); // нужная папка

app.set('view engine', 'hbs'); // регистрация hbs,начинаем с ним работать

app.use(express["static"]("public")); // чтобы видели стили из папки public
// Добаваляем, чтобы получить объект с данными из формы в req.body

app.use(express.urlencoded({
  extended: true
})); // Добаваляем, чтобы получить объект с данными из формы в req.body
// 
// app.get("/", (req, res) => {
//     res.render("index", {
//         title: "Главная страница",
//         isHome: true
//     })
//     // res.status(200).sendFile(path.join(__dirname, "views", "index.html"))
// })

app.use("/", homeRoutes); // app.get("/courses", (req, res) => {
//     res.render("courses", {
//         title: "Курсы",
//         isCourses: true
//     })
//     // res.status(200).sendFile(path.join(__dirname, "views", "about.html"))
// })

app.use("/courses", coursesRoutes); // app.get("/add", (req, res) => {
//     res.render("add", {
//         title: "Новый курс",
//         isAdd: true
//     })
// })

app.use("/add", addRoutes);
app.use("/card", cardRoutes);
var PORT = process.env.PORT || 5000;

function start() {
  var url, candidate, user;
  return regeneratorRuntime.async(function start$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          url = "mongodb+srv://panovAndrey:12345@cluster0.ia9xh.mongodb.net/shop"; // const url = "mongodb+srv://panovAndrey:12345@cluster0.ia9xh.mongodb.net/<dbname>?retryWrites=true&w=majority"

          _context2.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne());

        case 6:
          candidate = _context2.sent;

          if (candidate) {
            _context2.next = 11;
            break;
          }

          user = new User({
            email: "panov3107@mail.ru",
            name: "Andrey",
            cart: {
              items: []
            }
          });
          _context2.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          app.listen(PORT, function () {
            console.log("Server is running on port: ", PORT);
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

start();
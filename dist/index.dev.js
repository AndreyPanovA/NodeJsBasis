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


var hbs = expressHandlebars.create({
  defaultLayout: "main",
  // дефолтная папка
  extname: "hbs"
}); // app.engine("hbs", hbs.engine) // регистрация hbs, что он вообще есть

app.engine('hbs', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
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
  var url;
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          url = "mongodb+srv://panovAndrey:12345@cluster0.ia9xh.mongodb.net/shop"; // const url = "mongodb+srv://panovAndrey:12345@cluster0.ia9xh.mongodb.net/<dbname>?retryWrites=true&w=majority"

          _context.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 4:
          app.listen(PORT, function () {
            console.log("Server is running on port: ", PORT);
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

start();
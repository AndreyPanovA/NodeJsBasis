"use strict";

var express = require("express");

var path = require("path");

var exphbs = require("express-handlebars");

var app = express(); // routes

var homeRoutes = require("./routes/home");

var addRoutes = require("./routes/add");

var coursesRoutes = require("./routes/courses");

var cardRoutes = require("./routes/card"); // routes


var hbs = exphbs.create({
  defaultLayout: "main",
  // дефолтная папка
  extname: "hbs"
});
app.engine("hbs", hbs.engine); // регистрация hbs, что он вообще есть

app.set("view engine", "hbs"); // регистрация hbs,начинаем с ним работать

app.set("views", "views"); // нужная папка

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
app.listen(PORT, function () {
  console.log("Server is running on port: ", PORT);
});
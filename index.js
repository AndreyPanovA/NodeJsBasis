const express = require("express")
const path = require("path")
const exphbs = require("express-handlebars")
const app = express()

const hbs = exphbs.create({
    defaultLayout: "main", // дефолтная папка
    extname: "hbs"
})
app.engine("hbs", hbs.engine) // регистрация hbs, что он вообще есть
app.set("view engine", "hbs") // регистрация hbs,начинаем с ним работать
app.set("views", "views") // нужная папка

app.use(express.static("public")) // чтобы видели стили из папки public

// 
app.get("/", (req, res) => {
    res.render("index", {
        title: "Главная страница",
        isHome: true
    })
    // res.status(200).sendFile(path.join(__dirname, "views", "index.html"))
})
app.get("/courses", (req, res) => {
    res.render("courses", {
        title: "Курсы",
        isCourses: true
    })
    // res.status(200).sendFile(path.join(__dirname, "views", "about.html"))
})
app.get("/add", (req, res) => {
    res.render("add", {
        title: "Новый курс",
        isAdd: true
    })
})



const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})


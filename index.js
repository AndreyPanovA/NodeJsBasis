const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
// const exphbs = require("express-handlebars")
const Handlebars = require("handlebars")
const expressHandlebars = require('express-handlebars');
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access')
const app = express()
// routes
const homeRoutes = require("./routes/home")
const addRoutes = require("./routes/add")
const coursesRoutes = require("./routes/courses")
const cardRoutes = require("./routes/card")
// routes
// Models
const User = require("./models/user")
// midleware for User
app.use(async (req, res, next) => {
    try {
        const user = await User.findById("5f4ac413165b9b8a3f21c0b3")
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }


})


// const hbs = expressHandlebars.create({
//     defaultLayout: "main", // дефолтная папка
//     extname: "hbs"
// })
// app.engine("hbs", hbs.engine) // регистрация hbs, что он вообще есть

app.engine('hbs', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main", // дефолтная папка
    extname: "hbs"
}));

app.set("views", path.join(__dirname, "views")) // нужная папка
app.set('view engine', 'hbs'); // регистрация hbs,начинаем с ним работать

app.use(express.static("public")) // чтобы видели стили из папки public
// Добаваляем, чтобы получить объект с данными из формы в req.body
app.use(express.urlencoded({
    extended: true
}))
// Добаваляем, чтобы получить объект с данными из формы в req.body
// 
// app.get("/", (req, res) => {
//     res.render("index", {
//         title: "Главная страница",
//         isHome: true
//     })
//     // res.status(200).sendFile(path.join(__dirname, "views", "index.html"))
// })
app.use("/", homeRoutes)
// app.get("/courses", (req, res) => {
//     res.render("courses", {
//         title: "Курсы",
//         isCourses: true
//     })
//     // res.status(200).sendFile(path.join(__dirname, "views", "about.html"))
// })
app.use("/courses", coursesRoutes)
// app.get("/add", (req, res) => {
//     res.render("add", {
//         title: "Новый курс",
//         isAdd: true
//     })
// })

app.use("/add", addRoutes)
app.use("/card", cardRoutes)


const PORT = process.env.PORT || 5000

async function start() {
    try {
        const url = "mongodb+srv://panovAndrey:12345@cluster0.ia9xh.mongodb.net/shop"
        // const url = "mongodb+srv://panovAndrey:12345@cluster0.ia9xh.mongodb.net/<dbname>?retryWrites=true&w=majority"
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User({
                email: "panov3107@mail.ru",
                name: "Andrey",
                cart: {
                    items: []
                }
            })
            await user.save()

        }
        app.listen(PORT, () => {
            console.log("Server is running on port: ", PORT)
        })

    } catch (e) {
        console.log(e)

    }

}
start()
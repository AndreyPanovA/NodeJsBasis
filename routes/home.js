const { Router } = require("express")
const router = Router()


router.get("/", (req, res) => {
    res.render("index", {
        title: "Главная страница",
        isHome: true
    })
    // res.status(200).sendFile(path.join(__dirname, "views", "index.html"))
})
module.exports = router
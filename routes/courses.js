const { Router } = require("express")
const router = Router()
router.get("/", (req, res) => {
    res.render("courses", {
        title: "Курсы",
        isCourses: true
    })
    // res.status(200).sendFile(path.join(__dirname, "views", "about.html"))
})
module.exports = router
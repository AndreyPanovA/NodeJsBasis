const { Router } = require("express")
const Course = require("../models/course")
const router = Router()
router.get("/", async (req, res) => {
    const courses = await Course.getAll()
    res.render("courses", {
        title: "Курсы",
        isCourses: true,
        courses
    })
    // res.status(200).sendFile(path.join(__dirname, "views", "about.html"))
})
module.exports = router
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
router.get("/:id", async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render("course", {
        title: `Курс ${course.title}`,
        isCourses: true,
        course

    })
})
module.exports = router
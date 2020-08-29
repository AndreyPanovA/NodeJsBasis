const {
    Router
} = require("express")
const Course = require("../models/course")
const router = Router()
router.get("/", async (req, res) => {
    // const courses = await Course.getAll()
    // const courses = await Course.find()
    const courses = await Course.find().populate("userId", "email name").select("price title img") // тоже самое, только если вытягивать конкретные поля 
    res.render("courses", {
        title: "Курсы",
        isCourses: true,
        courses
    })
    // res.status(200).sendFile(path.join(__dirname, "views", "about.html"))
})
router.get("/:id/edit", async (req, res) => {
    // const course = await Course.getById(req.params.id)
    const course = await Course.findById(req.params.id)
    if (!req.query.allow) {
        return res.redirect("/")
    } else {
        res.render("course-edit", {
            title: `Курс ${course.title}`,
            isCourses: true,
            course
        })
    }

})
router.get("/:id", async (req, res) => {
    // const course = await Course.getById(req.params.id)
    const course = await Course.findById(req.params.id)
    res.render("course", {
        layout: "empty",
        title: `Курс ${course.title}`,
        isCourses: true,
        course
    })
})
router.post("/edit", async (req, res) => {
    // const course = await Course.update(req.body)
    const {
        id
    } = req.body
    delete req.body.id
    const course = await Course.findByIdAndUpdate(id, req.body)
    res.redirect("/courses")
})
// mongoDB
router.post("/remove", async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id
        })
        res.redirect("/courses")
    } catch (e) {
        console.log(e)

    }


})
module.exports = router
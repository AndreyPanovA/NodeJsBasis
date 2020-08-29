const {
    Router
} = require("express")
const Course = require("../models/course")
const router = Router()

router.get("/", (req, res) => {
    res.render("add", {
        title: "Новый курс",
        isAdd: true
    })
})
router.post("/", async (req, res) => {
    console.log(typeof req.body, req.body)
    // const course = new Course(req.body.title, req.body.price, req.body.img)
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    })
    try {
        await course.save()
        res.redirect("/")

    } catch (e) {
        console.log(e)
    }

})
module.exports = router
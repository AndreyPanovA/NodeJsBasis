const {
    Router
} = require("express")
const router = Router()
// const Card = require("../models/card")

const Course = require("../models/course")


function mapCartItems(cart) {
    return cart.items.map(el => ({
        ...el.courseId._doc,
        count: el.count,

    }))

}
router.post("/add", async (req, res) => {
    // const course = await Course.getById(req.body.id)
    const course = await Course.findById(req.body.id)
    // await Card.add(course)
    await req.user.addToCart(course)
    // 
    res.redirect("/card")

})
router.delete("/remove/:id", async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})
router.get("/", async (req, res) => {
    // const card = await Card.fetch()
    const user = await req.user.populate("cart.items.courseId")
    const courses = mapCartItems(user.cart)
    console.log(user.cart.items[0].courseId._doc)
    res.render("card", {
        title: "Basket",
        isCard: true,
        courses: courses,
        price: 0
    })
})
module.exports = router
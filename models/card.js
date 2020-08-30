const path = require("path")
const fs = require("fs")
const p = path.join(path.dirname(process.mainModule.filename), "data", "card.json")
class Cart {
    constructor() {

    }
    static async add(course) {
        const card = await Cart.fetch()
        let idx = null
        card.courses.forEach((element, index) => {
            if (element.id === course.id) {
                idx = index
            }
        });

        // let index = card.courses.findIndex((el) => el.id === course.id)

        const candidate = card.courses[idx]
        if (candidate) {
            // Курс уже есть
            candidate.count++
            card.courses[idx] = candidate
        } else {
            course.count = 1
            card.courses.push(course)
            // Нужно добавить
        }
        card.price += +course.price
        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, "utf-8", (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
    static async remove(id) {
        const cart = await Cart.fetch()
        let idx = cart.courses.findIndex((el) => el.id === id)
        const course = cart.courses[idx]
        if (course.count == 1) {
            // Удалить
            cart.courses = cart.courses.filter(el => {
                return el.id !== id;
            });

        } else {
            course.count--
        }
        cart.price -= course.price
        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })


    }
}
module.exports = Cart
const path = require("path")
const fs = require("fs")
const p = path.join(path.dirname(process.mainModule.filename), "data", "card.json")
class Card {
    constructor() {

    }
    static async add(course) {
        const card = await Card.fetch()
        let idx = null
        card.courses.forEach((element, index) => {
            if (element.id === course.id) { idx = index }
        });
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
            fs.writeFile(p, JSON.stringify(card), (err) => {
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
}
module.exports = Card
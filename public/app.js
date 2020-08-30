toCurrency = (price) => {
    return new Intl.NumberFormat("ru-RU", {
        currency: "rub",
        style: "currency"
    }).format(price)

}

document.querySelectorAll(".price").forEach(node => {
    node.textContent = toCurrency(node.textContent)
})
const $card = document.querySelector("#card")
if ($card) {
    $card.addEventListener("click", (event) => {
        if (event.target.classList.contains("js-remove")) {
            const {
                id
            } = event.target.dataset

            fetch(`/card/remove/${id}`, {
                method: "delete"
            }).then(res => res.json()).then(card => {
                if (card.courses.length) {
                    const html = card.courses.map(el => {
                        return ` 
                        <tr>
                        <td>${el.title}</td>
                        <td>${el.count}</td>
                        <td><button class="btn btn-small js-remove" data-id=${el._id}>Удалить</button></td>
                    </tr>
                        `
                    }).join("")
                    $card.querySelector("tbody").innerHTML = html
                    $card.querySelector(".price").textContent = toCurrency(card.price)
                } else {
                    $card.innerHTML = `<p>Корзина пуста</p>`
                }
            })
        }
    })
}
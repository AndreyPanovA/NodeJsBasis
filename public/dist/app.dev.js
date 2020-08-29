"use strict";

toCurrency = function toCurrency(price) {
  return new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency"
  }).format(price);
};

document.querySelectorAll(".price").forEach(function (node) {
  node.textContent = toCurrency(node.textContent);
});
var $card = document.querySelector("#card");

if ($card) {
  $card.addEventListener("click", function (event) {
    if (event.target.classList.contains("js-remove")) {
      var id = event.target.dataset.id;
      fetch("/card/remove/".concat(id), {
        method: "delete"
      }).then(function (res) {
        return res.json();
      }).then(function (card) {
        if (card.courses.length) {
          var html = card.courses.map(function (el) {
            return " \n                        <tr>\n                        <td>".concat(el.title, "</td>\n                        <td>").concat(el.count, "</td>\n                        <td><button class=\"btn btn-small js-remove\" data-id=").concat(el.id, ">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button></td>\n                    </tr>\n                        ");
          }).join("");
          $card.querySelector("tbody").innerHTML = html;
          $card.querySelector(".price").textContent = toCurrency(card.price);
        } else {
          $card.innerHTML = "<p>\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430</p>";
        }
      });
    }
  });
}
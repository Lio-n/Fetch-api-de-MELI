const addElementsDOM = (e) => {
  let section = document.querySelector("section"),
    $olEL = document.querySelector(".product__list-items"), //Le agrego los Items desde el Template
    $templateEl = document.querySelector("template").content, //El Template
    $fregment = document.createDocumentFragment(); //Se crea un objeto DocumentFragment vacio

  section.querySelector(".product__results").textContent =
    "Resultados: " + e.results.length;
  e.results.forEach((item) => {
    $templateEl
      .querySelector(".product__image")
      .setAttribute("src", item.thumbnail); //Imagen
    $templateEl.querySelector(".product__title").textContent = item.title; //Titulo
    /*--Todos-los-Prod-son-NUEVOS-por-Default--*/
    if (item.condition == "new") {
      $templateEl.querySelector(".product__condition").textContent = "Nuevo"; //New/Used
    } else {
      $templateEl.querySelector(".product__condition").textContent =
        item.condition;
    }
    $templateEl.querySelector(".product__sold-quantity").textContent =
      "Vendidos: " + item.sold_quantity; //cant-Vendido
    $templateEl.querySelector(".product__price").textContent = "$" + item.price; //Precio
    $templateEl
      .querySelector(".product__link")
      .setAttribute("href", item.permalink); //Link
    let $clone = document.importNode($templateEl, true);
    $fregment.appendChild($clone);
  });
  $olEL.appendChild($fregment);
};
const fetchSearch = (e) => {
  const data = new FormData(e.target);
  let value = Object.fromEntries(data.entries()); //Lo transforma en un Object
  //value = Key[search],Value["Navaja"]
  let variable = value.search.toString(); //Lo paso a Typeof String y LowerCase

  fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${variable}`)
    .then((e) => {
      return e.json();
    })
    .then((e) => {
      addElementsDOM(e);
    });
  console.timeEnd();
};

(function main() {
  let searchForm = document.querySelector(".header__form-search");

  searchForm.addEventListener("submit", (e) => {
    console.time();
    /*--Remuevo-los-Elementos--*/
    let aEl = document.querySelectorAll(".product__item");
    for (const item of aEl) {
      item.remove();
    }
    e.preventDefault();
    fetchSearch(e);
  });
})();

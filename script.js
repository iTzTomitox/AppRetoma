// Escala el diseño de escritorio (pensado a 1264px de contenido + márgenes)
// en pantallas entre 768px y 1343px, para que se vea igual que en Figma.
(function () {
  var DESIGN_MIN = 1344;
  function fit() {
    var w = window.innerWidth;
    document.documentElement.style.zoom = w >= 768 && w < DESIGN_MIN ? w / DESIGN_MIN : "";
  }
  fit();
  window.addEventListener("resize", fit);
})();

// Carrusel de historias: las flechas rotan qué testimonio ocupa cada tarjeta.
(function () {
  var row = document.querySelector(".stories__row");
  if (!row) return;
  var cards = Array.prototype.slice.call(row.querySelectorAll(".story"));
  var items = cards.map(function (card) {
    return {
      avatar: card.querySelector(".story__avatar").getAttribute("src"),
      name: card.querySelector(".story__name").textContent,
      role: card.querySelector(".story__role").textContent,
      quote: card.querySelector(".story__quote").textContent
    };
  });
  var offset = 0;

  function render() {
    cards.forEach(function (card, i) {
      var item = items[(i + offset + items.length) % items.length];
      card.querySelector(".story__avatar").setAttribute("src", item.avatar);
      card.querySelector(".story__name").textContent = item.name;
      card.querySelector(".story__role").textContent = item.role;
      card.querySelector(".story__quote").textContent = item.quote;
    });
  }

  function move(step) {
    offset = (offset + step + items.length) % items.length;
    row.classList.add("is-changing");
    setTimeout(function () {
      render();
      row.classList.remove("is-changing");
    }, 180);
  }

  document.querySelector(".stories__arrow--prev").addEventListener("click", function () { move(-1); });
  document.querySelector(".stories__arrow--next").addEventListener("click", function () { move(1); });
  document.querySelector("[data-stories-next]").addEventListener("click", function () { move(1); });
})();

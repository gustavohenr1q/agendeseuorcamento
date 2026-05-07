const ano = document.getElementById("ano");

if (ano) {
  ano.textContent = new Date().getFullYear();
}

const elementos = document.querySelectorAll(".animar");

const observer = new IntersectionObserver((entradas) => {

  entradas.forEach((entrada) => {

    if (entrada.isIntersecting) {
      entrada.target.classList.add("mostrar");
    }

  });

}, {
  threshold: 0.2
});

elementos.forEach((elemento) => {
  observer.observe(elemento);
});

/* EFEITO HEADER AO ROLAR */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});

/* CARROSSEL */

const imagens = [

  {
    src: "img/notebook-antes.jpeg",
    titulo: "Notebook recebido",
    texto:
      "Equipamento recebido para avaliação e manutenção."
  },

  {
    src: "img/produtos-limpeza.jpeg",
    titulo: "Produtos utilizados",
    texto:
      "Materiais usados para limpeza e cuidado com o equipamento."
  },

  {
    src: "img/manutencao-1.jpeg",
    titulo: "Manutenção interna",
    texto:
      "Notebook aberto para verificação, limpeza e manutenção."
  },

  {
    src: "img/manutencao-2.jpeg",
    titulo: "Organização das peças",
    texto:
      "Serviço feito com cuidado e peças bem organizadas."
  },

  {
    src: "img/notebook-depois.jpeg",
    titulo: "Notebook finalizado",
    texto:
      "Equipamento montado e pronto para os testes finais."
  },

  {
    src: "img/notebook-ligado.jpeg",
    titulo: "Teste final",
    texto:
      "Notebook ligado e testado após a manutenção."
  },

  {
    src: "img/panfletos.jpeg",
    titulo: "Serviço entregue ao cliente",
    texto:
      "Finalização com agradecimento e cuidado na entrega."
  }

];

let imagemAtual = 0;

const carouselImage =
  document.getElementById("carouselImage");

const carouselTitle =
  document.getElementById("carouselTitle");

const carouselText =
  document.getElementById("carouselText");

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");

const carouselDots =
  document.getElementById("carouselDots");

function atualizarCarousel() {

  carouselImage.style.opacity = "0";

  setTimeout(() => {

    carouselImage.src =
      imagens[imagemAtual].src;

    carouselTitle.textContent =
      imagens[imagemAtual].titulo;

    carouselText.textContent =
      imagens[imagemAtual].texto;

    carouselImage.style.opacity = "1";

    atualizarDots();

  }, 200);

}

function criarDots() {

  imagens.forEach((_, index) => {

    const dot =
      document.createElement("span");

    dot.classList.add("carousel-dot");

    dot.addEventListener("click", () => {

      imagemAtual = index;

      atualizarCarousel();

    });

    carouselDots.appendChild(dot);

  });

  atualizarDots();

}

function atualizarDots() {

  const dots =
    document.querySelectorAll(".carousel-dot");

  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === imagemAtual
    );

  });

}

nextBtn.addEventListener("click", () => {

  imagemAtual++;

  if (imagemAtual >= imagens.length) {
    imagemAtual = 0;
  }

  atualizarCarousel();

});

prevBtn.addEventListener("click", () => {

  imagemAtual--;

  if (imagemAtual < 0) {
    imagemAtual = imagens.length - 1;
  }

  atualizarCarousel();

});

criarDots();

setInterval(() => {

  imagemAtual++;

  if (imagemAtual >= imagens.length) {
    imagemAtual = 0;
  }

  atualizarCarousel();

}, 5000);
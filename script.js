const ano = document.getElementById("ano");

if (ano) {
  ano.textContent = new Date().getFullYear();
}

/* ANIMAÇÃO AO ROLAR */

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

/* HEADER */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (header) {

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

});

/* MENU MOBILE */

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {

  menuToggle.addEventListener("click", () => {

    menu.classList.toggle("ativo");

    if (menu.classList.contains("ativo")) {
      menuToggle.textContent = "×";
    } else {
      menuToggle.textContent = "☰";
    }

  });

  const linksMenu = menu.querySelectorAll("a");

  linksMenu.forEach((link) => {

    link.addEventListener("click", () => {

      menu.classList.remove("ativo");
      menuToggle.textContent = "☰";

    });

  });

}

/* CARROSSEIS */

const carrosseis = {

  servico1: [

    {
      src: "img/notebook-antes.jpeg",
      titulo: "Notebook recebido",
      texto: "Equipamento recebido para avaliação e manutenção."
    },

    {
      src: "img/produtos-limpeza.jpeg",
      titulo: "Produtos utilizados",
      texto: "Materiais usados para limpeza e cuidado com o equipamento."
    },

    {
      src: "img/manutencao-1.jpeg",
      titulo: "Manutenção interna",
      texto: "Notebook aberto para verificação, limpeza e manutenção."
    },

    {
      src: "img/manutencao-2.jpeg",
      titulo: "Organização das peças",
      texto: "Serviço feito com cuidado e peças bem organizadas."
    },

    {
      src: "img/notebook-depois.jpeg",
      titulo: "Notebook finalizado",
      texto: "Equipamento montado e pronto para os testes finais."
    },

    {
      src: "img/notebook-ligado.jpeg",
      titulo: "Teste final",
      texto: "Notebook ligado e testado após a manutenção."
    },

    {
      src: "img/panfletos.jpeg",
      titulo: "Serviço entregue ao cliente",
      texto: "Finalização com agradecimento e cuidado na entrega."
    }

  ],

  servico2: [

    {
      src: "img/ram-smart.jpeg",
      titulo: "Teste com memória Kingston",
      texto: "Notebook LG ligava, porém não dava imagem durante o teste com a memória Kingston."
    },

    {
      src: "img/notebook-aberto-lg.jpeg",
      titulo: "Diagnóstico notebook LG",
      texto: "Notebook aberto para análise do defeito de ausência de imagem e testes dos componentes internos."
    },

    {
      src: "img/ram-kingston.jpeg",
      titulo: "Teste com memória Smart",
      texto: "A memória Kingston não funcionou corretamente, então foi usada a memória Smart conectada para teste."
    },

    {
      src: "img/notebook-lg-teclado.jpeg",
      titulo: "Botão power consertado",
      texto: "Botão de ligar/desligar reparado e funcionando novamente."
    },

    {
      src: "img/notebook-lg-tampa.jpeg",
      titulo: "Notebook LG finalizado",
      texto: "Notebook LG finalizado após correção do botão power e testes no problema de imagem."
    }

  ]

};

document.querySelectorAll(".carousel-card").forEach((carouselCard) => {

  const nomeCarousel = carouselCard.dataset.carousel;
  const imagens = carrosseis[nomeCarousel];

  if (!imagens) {
    return;
  }

  let imagemAtual = 0;
  let intervaloCarousel;

  const carouselImage = carouselCard.querySelector(".carousel-image");
  const carouselTitle = carouselCard.querySelector(".carousel-title");
  const carouselText = carouselCard.querySelector(".carousel-text");
  const carouselCounter = carouselCard.querySelector(".carousel-counter");
  const prevBtn = carouselCard.querySelector(".prev");
  const nextBtn = carouselCard.querySelector(".next");
  const carouselDots = document.querySelector(`[data-dots="${nomeCarousel}"]`);

  if (
    !carouselImage ||
    !carouselTitle ||
    !carouselText ||
    !carouselCounter ||
    !prevBtn ||
    !nextBtn ||
    !carouselDots
  ) {
    return;
  }

  function atualizarCarousel() {

    carouselImage.style.opacity = "0";

    setTimeout(() => {

      carouselImage.src = imagens[imagemAtual].src;
      carouselTitle.textContent = imagens[imagemAtual].titulo;
      carouselText.textContent = imagens[imagemAtual].texto;
      carouselCounter.textContent = `${imagemAtual + 1} / ${imagens.length}`;

      carouselImage.style.opacity = "1";

      atualizarDots();

    }, 200);

  }

  function criarDots() {

    carouselDots.innerHTML = "";

    imagens.forEach((_, index) => {

      const dot = document.createElement("span");

      dot.classList.add("carousel-dot");

      dot.addEventListener("click", () => {

        imagemAtual = index;

        atualizarCarousel();

        reiniciarAutoPlay();

      });

      carouselDots.appendChild(dot);

    });

    atualizarDots();

  }

  function atualizarDots() {

    const dots = carouselDots.querySelectorAll(".carousel-dot");

    dots.forEach((dot, index) => {

      dot.classList.toggle("active", index === imagemAtual);

    });

  }

  function proximaImagem() {

    imagemAtual++;

    if (imagemAtual >= imagens.length) {
      imagemAtual = 0;
    }

    atualizarCarousel();

  }

  function imagemAnterior() {

    imagemAtual--;

    if (imagemAtual < 0) {
      imagemAtual = imagens.length - 1;
    }

    atualizarCarousel();

  }

  function iniciarAutoPlay() {

    intervaloCarousel = setInterval(() => {

      proximaImagem();

    }, 5000);

  }

  function reiniciarAutoPlay() {

    clearInterval(intervaloCarousel);

    iniciarAutoPlay();

  }

  nextBtn.addEventListener("click", () => {

    proximaImagem();

    reiniciarAutoPlay();

  });

  prevBtn.addEventListener("click", () => {

    imagemAnterior();

    reiniciarAutoPlay();

  });

  criarDots();

  atualizarCarousel();

  iniciarAutoPlay();

});

/* FAQ */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const pergunta = item.querySelector(".faq-question");

  if (!pergunta) {
    return;
  }

  pergunta.addEventListener("click", () => {

    faqItems.forEach((outroItem) => {

      if (outroItem !== item) {
        outroItem.classList.remove("active");
      }

    });

    item.classList.toggle("active");

  });

});
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

/* HEADER AO ROLAR */

const header = document.querySelector(".header");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

  if (header) {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  if (backTop) {
    if (window.scrollY > 500) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  }

});

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

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

/* CONTADORES */

const contadores = document.querySelectorAll(".contador");
let contadorIniciado = false;

function iniciarContadores() {

  contadores.forEach((contador) => {

    const numeroFinal = Number(contador.dataset.numero);
    let numeroAtual = 0;

    const velocidade = Math.max(20, 1200 / numeroFinal);

    const intervalo = setInterval(() => {

      numeroAtual++;

      contador.textContent = numeroAtual;

      if (numeroAtual >= numeroFinal) {
        contador.textContent = numeroFinal;
        clearInterval(intervalo);
      }

    }, velocidade);

  });

}

const observerContador = new IntersectionObserver((entradas) => {

  entradas.forEach((entrada) => {

    if (entrada.isIntersecting && !contadorIniciado) {
      contadorIniciado = true;
      iniciarContadores();
    }

  });

}, {
  threshold: 0.4
});

if (contadores.length > 0) {
  observerContador.observe(contadores[0]);
}

/* CARROSSEL */

const imagens = [

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

];

let imagemAtual = 0;
let intervaloCarousel;

const carouselImage = document.getElementById("carouselImage");
const carouselTitle = document.getElementById("carouselTitle");
const carouselText = document.getElementById("carouselText");
const carouselCounter = document.getElementById("carouselCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carouselDots = document.getElementById("carouselDots");

function atualizarCarousel() {

  if (!carouselImage || !carouselTitle || !carouselText) {
    return;
  }

  carouselImage.style.opacity = "0";

  setTimeout(() => {

    carouselImage.src = imagens[imagemAtual].src;
    carouselTitle.textContent = imagens[imagemAtual].titulo;
    carouselText.textContent = imagens[imagemAtual].texto;

    if (carouselCounter) {
      carouselCounter.textContent = `${imagemAtual + 1} / ${imagens.length}`;
    }

    carouselImage.style.opacity = "1";

    atualizarDots();

  }, 200);

}

function criarDots() {

  if (!carouselDots) {
    return;
  }

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

  const dots = document.querySelectorAll(".carousel-dot");

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

if (
  carouselImage &&
  carouselTitle &&
  carouselText &&
  prevBtn &&
  nextBtn &&
  carouselDots
) {

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

}

/* FAQ */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const pergunta =
    item.querySelector(".faq-question");

  pergunta.addEventListener("click", () => {

    faqItems.forEach((outroItem) => {

      if (outroItem !== item) {
        outroItem.classList.remove("active");
      }

    });

    item.classList.toggle("active");

  });

});
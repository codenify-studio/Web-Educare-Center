const toggleBtn = document.getElementById("toggleBtn");
const contentRow = document.getElementById("contentRow");

toggleBtn.addEventListener("click", () => {
  contentRow.classList.toggle("expanded");
  toggleBtn.classList.toggle("rotated");
});

$(".myslider").owlCarousel({
  loop: true,
  autoplay: true,
  slideTransition: "linear",
  autoplayHoverPause: false,
  autoplaySpeed: 8000,
  autoplayTimeout: 0,
  smartSpeed: 8000,
  margin: 40,
  nav: false,
  dots: false,
  mouseDrag: false, 
  touchDrag: false, 
  pullDrag: false,  
  freeDrag: false,
  // lazyLoad: true,
  responsive: {
    0: {
      items: 1,
      loop: true,
    },

    600: {
      items: 2,
      loop: true,
    },
    768: {
      items: 3,
      loop: true,
    },
    992: {
      items: 3,
      loop: true,
    },
    1200: { items: 2 },
  },
});

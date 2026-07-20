let locoScroll;
function locomotiveScript() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveScript();

function canvaToggle() {
  const toggleBtn = document.getElementById("toggleBtn");
  const contentRow = document.getElementById("contentRow");

  toggleBtn.addEventListener("click", () => {
    contentRow.classList.toggle("expanded");
    toggleBtn.classList.toggle("rotated");
  });
}
canvaToggle();
//Swiper Script
function canvaSlider() {
  const swiper = new Swiper(".myslider", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    speed: 12000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
  });
}
canvaSlider();

function aboutTimeAnima() {
  const mm = gsap.matchMedia();
  var aboutTime = gsap.timeline({
    scrollTrigger: {
      trigger: "#about-section",
      scroller: "#main",
      start: "top 80%",
      once: true,
    },
  });
  aboutTime.fromTo(
    ".about-head .line span.first",
    { y: "100%", opacity: 0 },
    { y: "0", opacity: 1, ease: "Power3.out", duration: 0.8, stagger: 0.1 },
  );
  aboutTime.fromTo(
    ".about-head .line span.last",
    { y: "-100%", opacity: 0 },
    { y: "0", opacity: 1, ease: "Power3.out", duration: 0.8, stagger: 0.1 },
    "-=0.6",
  );
  aboutTime.to(".about-head .line span.first", {
    x: "10%",
    ease: "Power3.out",
  });
  aboutTime.fromTo(
    ".about-img-container",
    { y: "50%", opacity: 0, scale: 0.9 },
    { y: "0", opacity: 1, scale: 1, ease: "Power3.out", duration: 0.8 },
    "-=0.9",
  );
  aboutTime.fromTo(".about-text p", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, ease: "Power3.out", duration: 1 }, "-=0.8");
  mm.add("(min-width: 1025px)", () => {
    gsap.to(".about-img-container", {
      width: "100%",
      height: "80vh",
      top: "100vh",
      ease: "none",
      scrollTrigger: {
        trigger: "#about-section",
        scroller: "#main",
        start: "top top",
        end: "+=100%",
        scrub: 1,
        anticipatePin: 1,
      },
    });
  });
}
aboutTimeAnima();

function shuffleText() {
  jQuery("document").ready(function ($) {
    var velocity = 100;

    var shuffleElement = $(".shuffle");

    $.each(shuffleElement, function (index, item) {
      $(item).attr("data-text", $(item).text());
    });

    var shuffle = function (o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };

    var shuffleText = function (element, originalText) {
      var elementTextArray = [];
      var randomText = [];

      for (i = 0; i < originalText.length; i++) {
        elementTextArray.push(originalText.charAt([i]));
      }

      var repeatShuffle = function (times, index) {
        if (index == times) {
          element.text(originalText);
          return;
        }

        setTimeout(function () {
          randomText = shuffle(elementTextArray);
          for (var i = 0; i < index; i++) {
            randomText[i] = originalText[i];
          }
          randomText = randomText.join("");
          element.text(randomText);
          index++;
          repeatShuffle(times, index);
        }, velocity);
      };
      repeatShuffle(element.text().length, 0);
    };

    shuffleElement.mouseenter(function () {
      shuffleText($(this), $(this).data("text"));
    });
  });
}
shuffleText();
function resultCounter() {
  let counter = document.querySelectorAll(".counter");
  let arr = Array.from(counter);

  arr.map(function (item) {
    let startnumber = 0;

    function counterup() {
      startnumber++;
      item.innerHTML = startnumber;

      if (startnumber == item.dataset.number) {
        clearInterval(stop);
      }
    }

    let stop = setInterval(function () {
      counterup();
    }, 50);
  });
}
ScrollTrigger.create({
  scroller: "#main",
  trigger: "#proven-result",
  start: "top 30%",
  once: true,
  onEnter: () => resultCounter(),
});
function ServiceContentAnimation() {
  const serviceTigger = {
    scroller: "#main",
    trigger: "#our-services",
    start: "top 30%",
  };
  gsap.from(".service-content h2, .service-content p", {
    x: 300,
    y: 50,
    scale: 0.7,
    opacity: 0.3,
    duration: 1,
    ease: "power1.out",
    stagger: 0.2,
    scrollTrigger: serviceTigger,
  });
  gsap.from(".service-technology h4", {
    x: 300,
    y: -50,
    duration: 1,
    ease: "power1.out",
    stagger: {
      amount: 0.2,
    },
    scrollTrigger: serviceTigger,
  });
}
ServiceContentAnimation();
serviceScroller();

function reviewAnimation() {
  const reviewScroll = {
    scroller: "#main",
    trigger: "#our-reviews",
    start: "top 50%",
    scrub: 1,
  };
  gsap.fromTo(
    ".review-wrapper1",
    { x: 0, duration: 1.5 },
    {
      x: -200,
      duration: 1.5,
      scrollTrigger: reviewScroll,
    },
  );
  gsap.fromTo(
    ".review-wrapper2",
    { x: 0, duration: 1.5 },
    {
      x: 200,
      duration: 1.5,
      scrollTrigger: reviewScroll,
    },
  );
  gsap.fromTo(
    ".review-wrapper3",
    { x: 50, duration: 1.5 },
    {
      x: -250,
      duration: 1.5,
      scrollTrigger: reviewScroll,
    },
  );
}
reviewAnimation();

function serviceScroller() {
  let horizontalSection = document.querySelector(".service-container-strip");

  gsap.to(".service-container-strip", {
    x: () => -(horizontalSection.scrollWidth - window.innerWidth),
    scrollTrigger: {
      scroller: "#main",
      trigger: ".service-container-strip",
      start: "center center",
      end: () => "+=" + horizontalSection.scrollWidth,
      pin: "#our-services",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

function whyusAnimation() {
  var whyus = document.querySelectorAll(".why-us-text-box");
  whyus.forEach(function (elem) {
    gsap.from(elem, {
      y: 200,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        scroller: "#main",
        start: "top 75%",
        toggleActions: "play none none none",
        // markers: true,
      },
    });
  });
}
whyusAnimation();
function aboutLineAnimation() {
  // SVG Path Draw Animation
  const path = document.querySelector(".draw-path");

  // Get total path length
  const pathLength = path.getTotalLength();

  // Hide path initially
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  // Draw path on scroll
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    delay: 1,
    scrollTrigger: {
      trigger: "#about-section",
      scroller: "#main",
      start: "top 40%",
      end: "+=100%",
      scrub: 1,
      anticipatePin: 1,
      // markers: true,
    },
  });
}
aboutLineAnimation();

const skillswiper = new Swiper(".skills-slider", {
  slidesPerView: "auto",
  spaceBetween: 15,
  loop: true,
  speed: 2000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
});

const navbar = document.querySelector("nav");

locoScroll.on("scroll", ({ scroll }) => {
  navbar.classList.toggle("active", scroll.y >= 200);
});

function videoPreloader() {
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log("Checking:", entry.target);

      if (entry.isIntersecting) {
        console.log("Video entered viewport");

        const video = entry.target;
        const source = video.querySelector("source");

        console.log("Loading:", source.dataset.src);

        source.src = source.dataset.src;
        video.load();

        observer.unobserve(video);
      }
    });
  });

  videos.forEach((video) => observer.observe(video));
}
// videoPreloader();

function startLoaderAnimation() {
  var loaderTl = gsap.timeline();

  loaderTl.to(".loader-text h5", {
    x: 0,
    opacity: 1,
    delay: 0.5,
    duration: 1.2,
    stagger: 0.1,
  });
  loaderTl.to(".loader-text h5", {
    x: -80,
    opacity: 0,
    stagger: 0.1,
    onComplete: function () {
      gsap.to(".loader-text", {
        opacity: 0,
        duration: 0,
      });
    },
  });

  gsap.utils.toArray(".loader-top").forEach((column) => {
    const imgs = column.querySelectorAll(".loader-img");

    // First image
    loaderTl.from(
      imgs[0],
      {
        y: -2000,
        duration: 3,
        delay: 1,
      },
      0, // all first images start together
    );

    loaderTl.from(
      Array.from(imgs).slice(1),
      {
        y: -2000,
        duration: 2,
        stagger: 0.2,
      },
      ">-2", // starts slightly before previous finishes
    );
  });

  gsap.utils.toArray(".loader-bottom").forEach((column) => {
    const imgs = column.querySelectorAll(".loader-img");

    console.log(imgs);

    // First image
    loaderTl.from(
      imgs[0],
      {
        y: 2000,
        duration: 3,
        delay: 1,
      },
      0,
    );

    // Remaining images
    loaderTl.from(
      Array.from(imgs).slice(1),
      {
        y: 2000,
        duration: 2,
        stagger: 0.2,
        onComplete: function () {},
      },
      ">-2",
    );
  });
  loaderTl.to(".banner-cover.middle", {
    width: "100%",
    height: "100%",
    opacity: 1,
    duration: 1.2,
    ease: "power3.inOut",
    onComplete: function () {
      gsap.to(".banner-loader-wrapper", {
        opacity: 0,
      });
    },
  });
  loaderTl.to(".banner-cover.middle .img-left", {
    x: -1000,
    duration: 1.5,
    ease: "power3.inOut",
  });
  loaderTl.to(
    ".banner-cover.middle .img-right",
    {
      x: 1000,
      duration: 1.5,
      ease: "power3.inOut",
      onComplete: () => {
        document.querySelector(".banner-loader-wrapper").remove();
        document.querySelector(".banner-cover").remove();
        document.querySelector(".loader-text").remove();
      },
    },
    "-=1.5",
  );
  loaderTl.from(
    "nav",
    {
      y: -200,
      duration: 0.6,
    },
    "-=0.9",
  );
  loaderTl.from(
    ".content_wrapper",
    {
      scale: 0,
      opacity: 0,
      duration: 0.6,
    },
    "-=0.7",
  );
  loaderTl.from(
    ".canva-sec",
    {
      y: 200,
      duration: 0.6,
    },
    "-=0.5",
  );
  loaderTl.call(() => {
    locoScroll.update();
    ScrollTrigger.refresh();
  });
}

const loaderImages = [];

for (let i = 1; i <= 25; i++) {
  const num = String(i).padStart(2, "0");
  loaderImages.push(`./assets/images/loader/img-loader${num}.webp`);
}

Promise.all(
  loaderImages.map((src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = resolve;
    });
  }),
).then(() => {
  startLoaderAnimation();
});

function sirTextAnimation() {
  const textpaths = document.querySelectorAll(".sir-profile-text svg path");

  textpaths.forEach((path) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      stroke: path.getAttribute("fill"),
      strokeWidth: 2,
      fill: "transparent",
      strokeDasharray: length,
      strokeDashoffset: length,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    });
  });

  const ltl = gsap.timeline({
    scrollTrigger: {
      trigger: ".sir-profile-text",
      scroller: "#main",
      start: "top 95%",
      // markers:true,
    },
  });

  textpaths.forEach((path) => {
    ltl.to(
      path,
      {
        strokeDashoffset: 0,
        duration: 0.8,
      },
      "<0.1",
    );
  });

  ltl.to(textpaths, {
    fill: (_, el) => el.getAttribute("fill"),
    stroke: "transparent",
    duration: 0.3,
  });
}
sirTextAnimation();

function studentLoader() {
  const loader = document.querySelector(".student-loader");
  const fragment = document.createDocumentFragment();

  const totalBoxes = 800;
  const totalImages = 25;

  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    box.className = "img-box";

    // Random image number between 1 and 25
    const random = Math.floor(Math.random() * totalImages) + 1;

    // Add leading zero (01, 02, ..., 25)
    const imageNumber = String(random).padStart(2, "0");

    box.innerHTML = `
    <img src="./assets/images/loader-2/loader-student${imageNumber}.webp" alt="" loading="lazy">
  `;
    fragment.appendChild(box);
    if (Math.random() < 0.3) {
      box.className = "hidden-box";
    } else {
      box.className = "img-box";
    }
  }

  loader.appendChild(fragment);
}
studentLoader();
ScrollTrigger.create({
  trigger: "#page8-trigger",
  scroller: "#main",
  start: "top center",
  once: true,

  onEnter() {
    openPage8();
  },
});
function openPage8() {
  locoScroll.stop();

  gsap.set("#page8", {
    display: "block",
    pointerEvents: "auto",
  });

  gsap.to("#page8", {
    opacity: 1,
    duration: 0.35,
    onComplete: playPage8Animation,
  });
}
function playPage8Animation() {
  const studentTl = gsap.timeline({
    onComplete: closePage8,
  });

  gsap.set(".img-box, .hidden-box", {
    autoAlpha: 0,
    scale: 0.7,
  });

  studentTl.to(".img-box", {
    autoAlpha: 1,
    scale: 1,
    duration: 1,
    stagger: {
      amount: 0.8,
      from: "random",
    },
    ease: "power2.out",
  });

  studentTl.to(".hidden-box", {
    opacity: 1,
    autoAlpha: 1,
    scale: 1,
    scale: 1,
    duration: 1,
    stagger: {
      amount: 0.8,
      from: "random",
    },
    ease: "power2.out",
  });
  studentTl.to(".img-box", {
    x: 2000,
    duration: 2,
    stagger: {
      amount: 0.4,
      from: "random",
    },
    ease: "power2.out",
  });
  studentTl.to(
    ".hidden-box",
    {
      x: -2000,
      duration: 2,
      stagger: {
        amount: 0.4,
        from: "random",
      },
      ease: "power2.out",
      onComplete: function () {
        gsap.to(".call-to-action-head", {
          opacity: 1,
          ease: "power3.out",
          scale: 1,
        });
      },
    },
    "-=2",
  );
  studentTl.to(
    ".student-loader",
    {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=1",
  );
}
function closePage8() {
  gsap.to("#page8", {
    autoAlpha: 0,
    duration: 0.2,
    onComplete: () => {
      gsap.set("#page8", {
        display: "none",
      });

      locoScroll.start();
    },
  });
}

if (window.innerWidth <= 1025) {
  document.querySelectorAll("[data-scroll-speed]").forEach((el) => {
    el.removeAttribute("data-scroll-speed");
  });

  locoScroll.update();
}
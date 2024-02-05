$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    navText: [
      `<i class="fa-solid fa-chevron-left slider-team-btn"></i>`,
      `<i class="fa-solid fa-chevron-right slider-team-btn"></i>`,
    ],
    nav: true,
    responsive: {
      375: {
        items: 1,
        margin: 40,
      },
      768: {
        items: 3,
        margin: 50,
      },
      1200: {
        items: 3,
        margin: 150,
      },
    },
  });
});

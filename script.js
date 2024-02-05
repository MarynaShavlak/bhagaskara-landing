$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    // margin: 10,
    nav: true,
    responsive: {
      375: {
        items: 2,
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

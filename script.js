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

$('.skill-per').each(function () {
  var $this = $(this);
  var per = $this.attr('per');
  $this.css('width', per + '%');
  $({ animatedValue: 0 }).animate(
    { animatedValue: per },
    {
      duration: 1000,
      step: function () {
        $this.attr('per', Math.floor(this.animatedValue) + '%');
      },
      complete: function () {
        $this.attr('per', Math.floor(this.animatedValue) + '%');
      },
    },
  );
});

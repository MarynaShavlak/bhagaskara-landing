import { reviewsData } from './data.js';
$(document).ready(function () {
  const achievementsSection = $('.section--achievements');
  const achievementsList = $('.achievement-value');
  const achievementIconsList = $('.achievement-icon');
  const achievementTextsList = $('.achievement-text');
  setAchievemenetSectionAnimation();
  addEventHandlers();

  initTeamSection();
  initSkillsSection();

  initReviewsSection();

  function initTeamSection() {
    $('#owl-carousel1').owlCarousel({
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
  }
  function initSkillsSection() {
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
  }
  function initReviewsSection() {
    generateReviewsMarkup(reviewsData);
    setupReviewsSlider();
  }

  function generateReviewsMarkup(data) {
    const $reviewsSlider = $('.reviews-slider');
    $.each(data, function (_, review) {
      const $reviewItem = generateReviewItem(review);
      $reviewsSlider.append($reviewItem);
    });

    function generateReviewItem(review) {
      const $reviewItem = $('<li>').addClass('reviews__item');
      const $reviewsWrap = $('<div>').addClass('reviews__img-wrap');
      const $reviewsPhoto = $('<img>')
        .addClass('reviews__photo')
        .attr({
          src: `images/${review.img}`,
          alt: 'Photo of client',
        });
      $reviewsWrap.append($reviewsPhoto);
      const $reviewsDescr = $('<p>')
        .addClass('reviews__descr')
        .text(review.text);
      const $reviewsName = $('<p>')
        .addClass('reviews__name')
        .text(review.author);

      $reviewItem.append($reviewsWrap, $reviewsDescr, $reviewsName);
      return $reviewItem;
    }
  }
  function setupReviewsSlider() {
    let currentSlide = 0;

    initialize();

    function initialize() {
      addControls();
      attachEventHandlers();
      toggleActiveThumbClass(currentSlide);
    }

    function addControls() {
      const thumbnailsSlider = createThumbnailsSlider();
      $('.reviews__container').append(thumbnailsSlider);
    }

    function attachEventHandlers() {
      $('.thumbnail').on('click', handleThumbnailClick);
    }

    function handleThumbnailClick() {
      const index = $(this).index();
      goToSlide(index);
    }
    function createThumbnailsSlider() {
      const thumbnailsSlider = $('<div>').addClass(
        'thumbnails thumbnails-slider',
      );
      for (let i = 0; i < reviewsData.length; i++) {
        $('<div>').addClass('thumbnail').appendTo(thumbnailsSlider);
      }

      return thumbnailsSlider;
    }

    function showSlide(index) {
      const slider = $('.reviews-slider ');
      const slideWidth = $('.reviews__item').width();

      if (index < 0) {
        index = slider.children().length - 1;
      } else if (index >= slider.children().length) {
        index = 0;
      }

      currentSlide = index;

      const transformValue = -index * slideWidth;
      slider.css('transform', `translateX(${transformValue}px)`);
    }

    function goToSlide(index) {
      showSlide(index);
      toggleActiveThumbClass(index);
    }

    function toggleActiveThumbClass(index) {
      const thumbList = $('.thumbnail');
      thumbList.addClass('shaded', 4000, 'easeOutBounce');
      thumbList.eq(index).removeClass('shaded');
    }
  }

  function addEventHandlers() {
    $(window).on('scroll', function () {
      if (isElementInViewport(achievementsSection)) {
        startCounterAnimation();
        $(window).off('scroll');
      }
    });
  }

  function isElementInViewport(element) {
    const rect = element[0].getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function startCounterAnimation() {
    achievementsList.each(function () {
      $(this)
        .prop('Counter', 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          },
        );
    });
    achievementIconsList.animate({ scale: '1.2' }, 1000);
    achievementTextsList.animate({ scale: '1.2' }, 1000);
  }

  function setAchievemenetSectionAnimation() {
    if (isElementInViewport(achievementsSection)) {
      startCounterAnimation();
    }
  }
});

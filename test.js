$(document).ready(function () {
  const achievementsSection = $('.section--achievements');
  const skillsSection = $('.skills');

  setAchievementSectionAnimation();
  addLoadContentEventHandlers();

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

  function addLoadContentEventHandlers() {
    $(window).on('scroll', function () {
      if (isElementInViewport(achievementsSection)) {
        startCounterAnimation();
        $(window).off('scroll');
      }
      if (isElementInViewport(skillsSection)) {
        initSkillsSection();
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
    const achievementsList = $('.achievement-value');
    const achievementIconsList = $('.achievement-icon');
    const achievementTextsList = $('.achievement-text');
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

  function setAchievementSectionAnimation() {
    if (isElementInViewport(achievementsSection)) {
      startCounterAnimation();
    }
  }
});

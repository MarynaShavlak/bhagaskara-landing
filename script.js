import { reviewsData, projectsData } from './data.js';
$(document).ready(function () {
  initTeamSection();
  initSkillsSection();
  initAchievementSection();
  initReviewsSection();
  initPortfolio();
  setMobileMenu();
  sendEmail();

  addLoadContentEventHandlers();

  function addLoadContentEventHandlers() {
    const reviewsSection = document.querySelector('.reviews-slider');
    $(window).on('scroll', function () {
      if (isElementInViewport(reviewsSection)) {
        setupReviewsSlider();
        $(window).off('scroll');
      }
    });
  }
  function setMobileMenu() {
    $('.mobile-menu-open').on('click', function () {
      $('.mobile-menu-container').animate(
        {
          right: 0,
        },
        300,
      );
      $('body').addClass('no-scroll');
    });
    $('.mobile-menu-close').on('click', function () {
      $('.mobile-menu-container').animate(
        {
          right: '-100vw',
        },
        300,
      );
      $('body').removeClass('no-scroll');
    });
  }
  function initTeamSection() {
    $('#owl-carousel1').owlCarousel({
      loop: true,

      navText: [
        `
                <svg class="hexagon-shape" >
                  <use href="./images/sprite.svg#icon-hexagon"></use>
                </svg>
                <i class="fa-solid fa-chevron-left slider-team-btn"></i>
              
        
        `,
        `
                <svg class="hexagon-shape" >
                  <use href="./images/sprite.svg#icon-hexagon"></use>
                </svg>
                <i class="fa-solid fa-chevron-right slider-team-btn"></i>
              
        
        `,
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
    const elms = document.querySelectorAll('.skill-per');

    elms.forEach(el => {
      new Waypoint({
        element: el,
        handler: function () {
          const per = el.getAttribute('per');
          el.style.width = per + '%';
          animateSkill(el, per);
          this.destroy();
        },
        offset: 'bottom-in-view',
      });
    });
    function animateSkill(element, percentage) {
      let animatedValue = 0;
      const duration = 1000;
      const stepDuration = 10;
      const stepValue = (percentage / duration) * stepDuration;

      const animationInterval = setInterval(() => {
        animatedValue += stepValue;
        if (animatedValue >= percentage) {
          animatedValue = percentage;
          clearInterval(animationInterval);
        }
        element.setAttribute('per', Math.floor(animatedValue) + '%');
      }, stepDuration);
    }
  }

  function initReviewsSection() {
    generateReviewsMarkup(reviewsData);

    const el = document.querySelector('.reviews-slider');
    if (isElementInViewport(el)) {
      setupReviewsSlider();
    }
  }

  function generateReviewsMarkup(data) {
    const $reviewsSlider = $('.reviews-slider');
    $.each(data, function (_, review) {
      const $reviewItem = generateReviewItem(review);
      $reviewsSlider.append($reviewItem);
    });
    addControls();

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
    function createThumbnailsSlider() {
      const thumbnailsSlider = $('<div>').addClass(
        'thumbnails thumbnails-slider',
      );
      for (let i = 0; i < reviewsData.length; i++) {
        $('<div>').addClass('thumbnail').appendTo(thumbnailsSlider);
      }

      return thumbnailsSlider;
    }
    function addControls() {
      const thumbnailsSlider = createThumbnailsSlider();
      $('.reviews__container').append(thumbnailsSlider);
    }
  }

  function setupReviewsSlider() {
    let currentSlide = 0;
    let autoplayInterval;

    initialize();

    function initialize() {
      attachEventHandlers();
      toggleActiveThumbClass(currentSlide);
      startAutoplay();
    }

    function attachEventHandlers() {
      $('.thumbnail').on('click', handleThumbnailClick);
      $('.reviews-slider').hover(
        function () {
          stopAutoplay();
        },
        function () {
          startAutoplay();
        },
      );
    }

    function handleThumbnailClick() {
      const index = $(this).index();
      goToSlide(index);
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
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        currentSlide =
          (currentSlide + 1) % $('.reviews-slider').children().length;
        showSlide(currentSlide);
        toggleActiveThumbClass(currentSlide);
      }, 2000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }
  }

  function initAchievementSection() {
    const counterUp = window.counterUp.default;
    const elements = document.querySelectorAll('.achievement-value');
    elements.forEach(el => {
      new Waypoint({
        element: el,
        handler: function () {
          counterUp(el);
          this.destroy();
        },
        offset: 'bottom-in-view',
      });
    });
  }

  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function sendEmail() {
    $('.contact-form').on('submit', handleSubmitForm);
    $('input,textarea').blur(function () {
      $(this)
        .parent()
        .toggleClass('filled', $(this).val().trim() !== '');
    });

    function handleSubmitForm(e) {
      e.preventDefault();
      const isValid = isFormValid();
      if (isValid) {
        const formData = {
          name: $('#name').val(),
          email: $('#email').val(),
          message: $('#message').val(),
        };
        Notiflix.Notify.success(
          `${formData.name}, your message was successfully sent`,
        );
        console.log('It should be formData sending here with obj : ', formData);

        resetSendFormData();
      }
    }

    function isFormValid() {
      $('.error-message').text('');
      let hasError = false;
      hasError =
        validateField(
          '#name',
          'Name is required',
          'Name should have at least 2 characters',
        ) || hasError;
      hasError =
        validateField(
          '#email',
          'Email is required',
          'Invalid email address',
          isValidEmail,
        ) || hasError;
      hasError = validateField('#message', 'Message is required') || hasError;
      return !hasError;

      function validateField(
        selector,
        requiredError,
        formatError,
        validationFunction = null,
      ) {
        let fieldValue = $(selector).val().trim();

        if (fieldValue === '') {
          $(`${selector}-error`).text(requiredError);
          return true;
        }
        if (selector === '#name' && fieldValue.length < 2) {
          $(`${selector}-error`).text(formatError);
          return true;
        }

        if (validationFunction && !validationFunction(fieldValue)) {
          $(`${selector}-error`).text(formatError);
          return true;
        }

        return false;
      }

      function isValidEmail(email) {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    }

    function resetSendFormData() {
      $('#name').text('');
      $('#name').val('');
      $('#email').text('');
      $('#email').val('');
      $('#message').text('');
      $('#message').val('');
      $('.error-message').text('');
      $('.contact-form .control').removeClass('filled');
    }
  }

  function initPortfolio() {
    const itemsPerPage = 6;
    let currentIndex = 0;
    let currentCategory = '*';

    renderAndFilterPortfolio();

    $('.load-more-btn').on('click', () => handleButtonClick('loadMore'));
    $('.show-less-btn').on('click', () => handleButtonClick('showLess'));
    initProjectModal();
    function handleButtonClick(action) {
      if (action === 'loadMore') {
        currentIndex += itemsPerPage;
      } else if (action === 'showLess') {
        currentIndex -= itemsPerPage;
      }
      updateIsotope(action);
      $('.portfolio__item').off('click', handleProjectModal);
      $('.portfolio__item').on('click', handleProjectModal);
      updateButtonsVisibility();
    }

    function updateButtonsVisibility() {
      const filteredData = filterDataByCategory();

      const isLoadMoreVisible =
        currentIndex < filteredData.length - itemsPerPage;
      const isShowLessVisible = currentIndex >= itemsPerPage;

      $('.load-more-btn').toggle(isLoadMoreVisible);
      $('.show-less-btn').toggle(isShowLessVisible);
    }

    function renderPortfolio() {
      const $portfolioList = $('#portfolio');
      $portfolioList.empty();
      const slicedData = filterDataByCategory().slice(
        0,
        currentIndex + itemsPerPage,
      );

      generatePortfolioMarkUp(slicedData);
    }

    function renderAndFilterPortfolio() {
      renderPortfolio();
      setPortfolioFilter();
    }

    function updateIsotope(action) {
      const $portfolioList = $('.portfolio-list');
      const totalItems = $portfolioList.children().length;

      const updateIsotopeLayout = () => $portfolioList.isotope('layout');

      if (action === 'loadMore') {
        const data = filterDataByCategory().slice(
          currentIndex,
          currentIndex + itemsPerPage,
        );
        const generatedMarkup = generatePortfolioMarkUp(data);
        const $items = $(generatedMarkup);

        $portfolioList.append($items).isotope('appended', $items);
      } else if (action === 'showLess') {
        const $itemsToRemove = $portfolioList
          .isotope('getItemElements')
          .slice(currentIndex + itemsPerPage, totalItems);

        $portfolioList.isotope('remove', $itemsToRemove);
        updateIsotopeLayout();
      }

      function generatePortfolioMarkUp(data) {
        let markup = '';

        data.forEach((project, index) => {
          markup += generatePortfolioItemMarkup(project, index);
        });

        return markup;
      }

      function generatePortfolioItemMarkup(project, index) {
        let itemMarkup = `<li class="portfolio__item ${project.categories.join(
          ' ',
        )}" data-category="${`${project.categories.join(', ')}`}" data-id="${
          project.id
        }">`;
        itemMarkup += `<div class="work" data-modal="#modal_project_${
          index + 1
        }">`;
        itemMarkup += `<img class="work__image" src="images/${project.images[0]}" alt="project photo"/>`;
        itemMarkup += '<div class="work__info">';
        itemMarkup += `<div class="work__title">${project.title}</div>`;
        itemMarkup += `<div class="work__category">${`${project.categories.join(
          ', ',
        )}`}</div>`;
        itemMarkup += '</div></div></li>';

        return itemMarkup;
      }
    }

    function filterDataByCategory() {
      return currentCategory !== '*'
        ? projectsData.filter(project =>
            project.categories.includes(currentCategory),
          )
        : projectsData;
    }

    function setPortfolioFilter() {
      const $portfolio = $('.portfolio-list').isotope({
        itemSelector: '.portfolio__item',
        percentPosition: true,
        masonry: {
          columnWidth: 360,
          gutter: 25,
        },
      });

      const filterValue = $('.filter-btn--active').attr('data-filter');

      $portfolio.isotope({ filter: filterValue });
    }
    function updateFilterButtons(chosenFilterBtn) {
      const filters = $('[data-filter]');
      filters.removeClass('filter-btn--active');
      $(chosenFilterBtn).addClass('filter-btn--active');
    }
    $('.filter-btn').on('click', function () {
      updateFilterButtons(this);
      const filterValue = $(this).attr('data-filter');
      currentCategory =
        filterValue !== '*' ? filterValue.slice(1) : filterValue;
      currentIndex = 0;
      setPortfolioFilter();
      updateButtonsVisibility();
    });

    function initProjectModal() {
      $('.portfolio__item').on('click', handleProjectModal);
      $('.close-modal-btn').on('click', hideProjectModal);
    }
    function initProjectModalSlider() {
      let currentIndex = 0;
      const slideCount = $('.project-slider img').length;

      $('.project-next-btn').on('click', handleNextButtonClick);
      $('.project-prev-btn').on('click', handlePrevButtonClick);

      function handleNextButtonClick() {
        currentIndex = currentIndex < slideCount - 1 ? currentIndex + 1 : 0;
        updateSlider();
      }

      function handlePrevButtonClick() {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slideCount - 1;
        updateSlider();
      }

      function updateSlider() {
        const translateValue = -currentIndex * 100 + '%';
        $('.project-slider').css(
          'transform',
          'translateX(' + translateValue + ')',
        );
      }
    }
    function handleProjectModal(e) {
      const clickedElement = $(e.currentTarget);
      const data = getProjectData(clickedElement);
      generateProjectModalMarkup(data);
      initProjectModalSlider();
      showProjectModal();
    }

    function getProjectData(el) {
      return projectsData.filter(data => data.id === el.attr('data-id'))[0];
    }

    function showProjectModal() {
      $('.modal-backdrop-project').fadeIn('slow', function () {
        $('body').addClass('modal-open');
      });
    }
    function hideProjectModal() {
      $('.modal-backdrop-project').fadeOut('slow', function () {
        $('body').removeClass('modal-open');
      });
    }
  }

  function generatePortfolioMarkUp(data) {
    const $portfolioList = $('.portfolio-list');
    data.forEach((project, index) => {
      const item = generatePortfolioItem(project, index);
      $portfolioList.append(item);
    });

    function generatePortfolioItem(project, index) {
      const $portfolioItem = $('<li>')
        .addClass(`portfolio__item ${project.categories.join(' ')}`)
        .attr('data-category', `${project.categories.join(', ')}`)
        .attr('data-id', project.id);
      const $work = $('<div>')
        .addClass('work')
        .attr('data-modal', `#modal_project_${index + 1}`);
      const $workImage = $('<img>').addClass('work__image');
      $workImage.attr('src', `./images/${project.images[0]}`);
      $workImage.attr('alt', `photo of project`);
      const $workInfo = $('<div>').addClass('work__info');
      const $workCategory = $('<div>')
        .addClass('work__category')
        .text(`${project.categories.join(', ')}`);
      const $workTitle = $('<div>').addClass('work__title').text(project.title);

      $workInfo.append($workTitle, $workCategory);
      $work.append($workImage, $workInfo);
      $portfolioItem.append($work);
      return $portfolioItem;
    }
  }

  function generateProjectModalMarkup(projectData) {
    const { images, title, descr } = projectData;
    if ($('.modal__project').length > 0) {
      $('.modal__project').remove();
    }
    const modalContainer = $('<div class="modal__project"></div>');
    const projectImgWrap = $('<div class="project-img-wrap"></div>');
    const projectMeta = $('<div class="project-meta"></div>');
    const projectDescr = $('<div class="project-descr"></div>');
    createProjectImgWrap(title, images);
    createProjectMeta(projectData);
    createProjectDescription(descr);
    modalContainer.append(projectImgWrap, projectMeta, projectDescr);

    function createProjectImgWrap(title, images) {
      const projectSlider = $('<div class="project-slider"></div>');
      $.each(images, function (index, image) {
        const imgElement = $(
          '<img class="project-picture project-slide' +
            (index + 1) +
            '" src="images/' +
            image +
            '" alt="project photo"/>',
        );
        projectSlider.append(imgElement);
      });

      const sliderButtons = $(
        '<ul class="project-slider-buttons"><li><button type="button" class="project-slider-btn project-prev-btn"><i class="fa-solid fa-angle-left"></i>PREVIOUS</button></li><li><button type="button" class="project-slider-btn project-next-btn">NEXT<i class="fa-solid fa-angle-right"></i></button></li></ul>',
      );

      const projectTitle = $('<h3 class="project-title">' + title + '</h3>');

      projectImgWrap.append(projectSlider, sliderButtons, projectTitle);
    }
    function createProjectMeta(projectData) {
      const { categories, date, website } = projectData;
      const firstLineMeta = $(
        '<div class="project-meta__first-line"><span class="project-category">' +
          categories.join(', ') +
          '</span><span class="project-year">' +
          date +
          '</span></div>',
      );
      const projectInfoList = $('<ul class="project-info"></ul>');
      $.each(projectData, function (key, value) {
        if (key === 'industry' || key === 'client' || key === 'timeline') {
          const listItem = $(
            '<li class="project-info__item"><p class="meta-title">' +
              key.charAt(0).toUpperCase() +
              key.slice(1) +
              '</p><p class="meta-value ' +
              key +
              '-value">' +
              value +
              '</p></li>',
          );
          projectInfoList.append(listItem);
        }
      });
      const websiteLink = $(
        '<li class="project-info__item"><p class="meta-title">Website</p><a class="meta-value website-value" href="' +
          website.link +
          '" target="_blank">' +
          website.name +
          '</a></li>',
      );
      projectInfoList.append(websiteLink);
      projectMeta.append(firstLineMeta, projectInfoList);
    }
    function createProjectDescription(descr) {
      $.each(descr, function (index, paragraph) {
        const pElement = $('<p>' + paragraph + '</p>');
        projectDescr.append(pElement);
      });
    }
    $('.project-modal').append(modalContainer);
  }
});

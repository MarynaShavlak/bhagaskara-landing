import { reviewsData, projectsData, articlesData } from './data.js';
// import { drawFigure } from './canvas.js';

$(document).ready(function () {
  initPortfolio();
  initReviewsSlider();
  initBlog();
  initHireModal();
  // initProjectModal();
  // initCVModal();

  function downloadCV() {
    $('.download-cv-btn').on('click', function () {
      const pdfPath = './Lewis_Nathaniel__CV.pdf';
      downloadPDF(pdfPath);
    });

    function downloadPDF(pdfPath) {
      const link = document.createElement('a');
      link.href = pdfPath;
      link.download = 'Lewis_Nathaniel__CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  function initCVModal() {
    $('[data-modal="cv-modal"]').on('click', showCVModal);
    $('.close-modal-btn').on('click', hideCVModal);
    drawFigure();
    downloadCV();
  }

  function showCVModal() {
    $('.modal-backdrop-cv').fadeIn('slow', function () {
      $('body').addClass('modal-open');
    });
  }

  function hideCVModal() {
    $('.modal-backdrop-cv').fadeOut('slow', function () {
      $('body').removeClass('modal-open');
    });
  }

  // function initProjectModal() {
  //   $('.portfolio__item').on('click', handleProjectModal);
  //   $('.close-modal-btn').on('click', hideProjectModal);

  //   function initProjectModalSlider() {
  //     let currentIndex = 0;
  //     const slideCount = $('.project-slider img').length;

  //     $('.project-next-btn').on('click', handleNextButtonClick);
  //     $('.project-prev-btn').on('click', handlePrevButtonClick);

  //     function handleNextButtonClick() {
  //       currentIndex = currentIndex < slideCount - 1 ? currentIndex + 1 : 0;
  //       updateSlider();
  //     }

  //     function handlePrevButtonClick() {
  //       currentIndex = currentIndex > 0 ? currentIndex - 1 : slideCount - 1;
  //       updateSlider();
  //     }

  //     function updateSlider() {
  //       const translateValue = -currentIndex * 100 + '%';
  //       $('.project-slider').css(
  //         'transform',
  //         'translateX(' + translateValue + ')',
  //       );
  //     }
  //   }
  //   function handleProjectModal(e) {
  //     const clickedElement = $(e.currentTarget);
  //     const data = getProjectData(clickedElement);
  //     generateProjectModalMarkup(data);
  //     initProjectModalSlider();
  //     showProjectModal();
  //   }
  //   function getProjectData(el) {
  //     return projectsData.filter(data => data.id === el.attr('data-id'))[0];
  //   }

  //   function showProjectModal() {
  //     $('.modal-backdrop-project').fadeIn('slow', function () {
  //       $('body').addClass('modal-open');
  //     });
  //   }
  //   function hideProjectModal() {
  //     $('.modal-backdrop-project').fadeOut('slow', function () {
  //       $('body').removeClass('modal-open');
  //     });
  //   }
  // }

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
      const { category, date, website } = projectData;
      const firstLineMeta = $(
        '<div class="project-meta__first-line"><span class="project-category">' +
          category +
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

  function initBlog() {
    generateBlogMarkup(articlesData);
    const visibleArticles = 3;
    const $articles = $('.articles__item');
    const total = $articles.length;
    hideExtraArticles($articles, visibleArticles);
    $('.blog__btn').on('click', function () {
      showMoreArticles($articles, total, visibleArticles);
    });
    $('.read-more-btn').on('click', function () {
      const $articleText = $(this).parent().find('.article__text');
      const isShowContent = $(this).parent().hasClass('showContent');

      $articleText.animate(
        {
          'max-height': isShowContent ? '96px' : '1000px',
        },
        300,
      );

      $(this).parent().toggleClass('showContent');
      const text = !isShowContent ? 'Read Less' : 'Read more';
      $(this).text(text);
    });
  }

  function hideExtraArticles($articles, visibleArticles) {
    $articles.slice(visibleArticles).hide();
  }

  function showMoreArticles($articles, total, visibleArticles) {
    $articles.filter(':hidden').slice(0, visibleArticles).slideDown('slow');
    const shownItemsQuantity = $articles.filter(':not(:hidden)').length;
    const remainingItems = total - shownItemsQuantity;
    if (remainingItems === 0) {
      $('.blog__btn').hide();
    }
  }

  function formatDate(dateString) {
    const [day, month, year] = dateString.split('/');
    const shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${day}<br />${shortMonths[parseInt(month, 10) - 1]}`;
  }

  function getDatetimeValue(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  function generateBlogMarkup(data) {
    const articlesHTML = data.map(
      ({ title, category, text, date }) => `
      <li class="articles__item">
        <div class="article__img-wrap">
          <time class="article__date" datetime="${getDatetimeValue(
            date,
          )}">${formatDate(date)}</time>
          <div class="articles__photo"></div>
        </div>
        <div class="article__meta">
          <a class="article__title" href="#">${title}</a>
          <p class="article__category">${category}</p>
          <p class="article__text">${text}</p>
        </div>
        <button type="button" class="read-more-btn">READ MORE</button>
      </li>
    `,
    );

    $('.articles-list').html(articlesHTML.join(''));
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
        let itemMarkup = `<li class="portfolio__item ${project.category}" data-category="${project.category}" data-id="${project.id}">`;
        itemMarkup += `<div class="work" data-modal="#modal_project_${
          index + 1
        }">`;
        itemMarkup += '<div class="work__image"></div>';
        itemMarkup += '<div class="work__info">';
        itemMarkup += `<div class="work__category">category: ${project.category}</div>`;
        itemMarkup += `<div class="work__title">${project.title}<span class="work__date">${project.date}</span></div>`;
        itemMarkup += '</div></div></li>';

        return itemMarkup;
      }
    }

    function filterDataByCategory() {
      return currentCategory !== '*'
        ? projectsData.filter(project => project.category === currentCategory)
        : projectsData;
    }

    function setPortfolioFilter() {
      const $portfolio = $('.portfolio-list').isotope({
        itemSelector: '.portfolio__item',
        percentPosition: true,
        masonry: {
          columnWidth: 370,
          gutter: 30,
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
        .addClass(`portfolio__item ${project.category}`)
        .attr('data-category', project.category)
        .attr('data-id', project.id);
      const $work = $('<div>')
        .addClass('work')
        .attr('data-modal', `#modal_project_${index + 1}`);
      const $workImage = $('<div>').addClass('work__image');
      const $workInfo = $('<div>').addClass('work__info');
      const $workCategory = $('<div>')
        .addClass('work__category')
        .text(`category: ${project.category}`);
      const $workTitle = $('<div>').addClass('work__title').text(project.title);
      const $workDate = $('<span>').addClass('work__date').text(project.date);

      $workTitle.append($workDate);
      $workInfo.append($workCategory, $workTitle);
      $work.append($workImage, $workInfo);
      $portfolioItem.append($work);
      return $portfolioItem;
    }
  }
  function initReviewsSlider() {
    generateReviewsMarkup(reviewsData);
    setReviewsSlider();
  }
  function setReviewsSlider() {
    let intervalId;
    function nextSlide() {
      const activeSlide = $('.reviews__item--active');
      const activeSlideIndex = activeSlide.index();
      const totalSlides = $('.reviews__item').length;
      const nextSlideIndex = (activeSlideIndex + 1) % totalSlides;
      const nextSlide = $('.reviews__item').eq(nextSlideIndex);
      activeSlide.fadeOut(500);
      activeSlide.removeClass('reviews__item--active');
      nextSlide.fadeIn(500);
      nextSlide.addClass('reviews__item--active');
    }

    function startSlider() {
      intervalId = setInterval(nextSlide, 2000);
    }

    function stopSlider() {
      clearInterval(intervalId);
    }

    $('.next-btn, .prev-btn').on('click', function () {
      stopSlider();
      nextSlide();
      startSlider();
    });

    $('.reviews__item').hover(
      function () {
        stopSlider();
      },
      function () {
        startSlider();
      },
    );
    startSlider();
  }
  function generateReviewsMarkup(data) {
    const $reviewsSlider = $('.reviews-slider');
    $.each(data, function (index, review) {
      const $reviewItem = generateReviewItem(index, review);
      $reviewsSlider.append($reviewItem);
    });

    function generateReviewItem(index, review) {
      const $reviewItem = $('<li>').addClass('reviews__item');
      if (index === 0) {
        $reviewItem.addClass('reviews__item--active');
      }
      const $reviewsDescr = generateReviewDescription(review.text);
      const $reviewsAuthor = generateReviewAuthor(
        review.author,
        review.company,
      );
      const $reviewsRating = $('<ul>').addClass('reviews__rating');
      generateRatingStarList($reviewsRating, review.rating);
      $reviewItem.append($reviewsDescr, $reviewsAuthor.append($reviewsRating));
      return $reviewItem;
    }
    function generateReviewDescription(text) {
      const $reviewsDescr = $('<div>').addClass('reviews__descr');
      const $p = $('<p>').text(text);
      $reviewsDescr.append($p);
      return $reviewsDescr;
    }

    function generateReviewAuthor(author, company) {
      const $reviewsAuthor = $('<div>').addClass('reviews__author');
      const $reviewsPhoto = $('<div>').addClass('reviews__photo');
      $reviewsAuthor.append($reviewsPhoto);
      const $reviewsName = $('<p>').addClass('reviews__name').text(author);
      const $reviewsText = $('<p>').addClass('reviews__text').text(company);
      $reviewsAuthor.append($reviewsName, $reviewsText);
      return $reviewsAuthor;
    }
    function generateRatingStarList($reviewsRating, rating) {
      for (let i = 1; i <= 5; i++) {
        const $ratingItem = $('<li>').addClass('rating__item');
        const $star = $('<img>')
          .addClass('reviews__star')
          .attr('src', 'images/star.svg')
          .attr('width', '15')
          .attr('height', '15')
          .attr('alt', 'rating star');

        if (i > rating) {
          $star.addClass('reviews__star--unactive');
        }

        $ratingItem.append($star);
        $reviewsRating.append($ratingItem);
      }
    }
  }

  function initHireModal() {
    setHireModalInfo();
    setHireModal();
  }
  function setHireModal() {
    $('[data-modal="hire-modal"]').on('click', showHireModal);
    $('.close-modal-btn').on('click', hideHireModal);
    $('.hire-form').on('submit', sendMessage);
  }

  function sendMessage(e) {
    e.preventDefault();
    const isValid = isFormValid();
    if (isValid) {
      const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        message: $('#message').val(),
      };
      console.log('It should be formData sending here with obj : ', formData);

      hideHireModal();
      resetSendFormData();
      $('.contact-wrap').toggleClass('active');
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
    hasError =
      validateField(
        '#phone',
        'Phone number is required',
        'Phone number should have 10 digits',
        isValidPhone,
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

    function isValidPhone(phone) {
      let phoneRegex = /^\d{10,}$/;
      return phoneRegex.test(phone);
    }
  }

  function resetSendFormData() {
    $('#name').text('');
    $('#name').val('');
    $('#email').text('');
    $('#email').val('');
    $('#phone').text('');
    $('#phone').val('');
    $('#message').text('');
    $('#message').val('');
    $('.error-message').text('');
  }

  function showHireModal() {
    $('.modal-backdrop-hire').fadeIn('slow', function () {
      $('body').addClass('modal-open');
    });
  }

  function hideHireModal() {
    $('.modal-backdrop-hire').fadeOut('slow', function () {
      $('body').removeClass('modal-open');
    });
  }

  function setHireModalInfo() {
    $('.card-toggle').on('click', function () {
      $('.card-toggle').removeClass('active');
      $(this).addClass('active');
      handleCardToggleClick($(this));
    });

    $('input,textarea').blur(function () {
      $(this)
        .parent()
        .toggleClass('filled', $(this).val().trim() !== '');
    });

    $('.hire-btn').on('click', function () {
      $('.contact-wrap').toggleClass('active');
    });

    $('.contact-wrap .close').on('click', function () {
      $('.contact-wrap').toggleClass('active');
      resetSendFormData();
    });

    const allCardToggleLinks = $('.card-toggle');
    allCardToggleLinks.on('mouseover', handleOverViewMouseOver);
    allCardToggleLinks.on('mouseout', handleMouseOut);

    function handleCardToggleClick(clickedToggle) {
      let isAnimating = false;
      if (!isAnimating) {
        isAnimating = true;
        deactivateAllCards();
        clickedToggle.siblings().css('z-index', 1);
        setTimeout(function () {
          activateClickedCard(clickedToggle);
          const isOverViewActive = $('.card--overview').hasClass('active');
          updateCardToggleStyles(isOverViewActive);
        }, 10);
      } else {
        return;
      }

      $('.card-toggle').on('mouseover', handleOverViewMouseOver);
      $('.card-toggle').on('mouseout', handleMouseOut);
      function deactivateAllCards() {
        $('.card').find('.card-content').css('z-index', 0);
        $('.card').removeClass('active');
      }

      function activateClickedCard(clickedToggle) {
        clickedToggle
          .parent()
          .toggleClass('active')
          .find('.card-content')
          .on('transitionend', function () {
            isAnimating = false;
          });
      }
    }

    function updateCardToggleStyles(isOverViewActive) {
      const $cardToggleLinks = $('.card-toggle');

      $cardToggleLinks.each(function () {
        const $link = $(this);
        const $icon = $link.find('.card-toggle__icon');

        if (isOverViewActive) {
          updateStylesForOverView($link, $icon);
        } else {
          updateStylesForNormalView($link, $icon);
        }
      });
    }

    function updateStylesForOverView($link, $icon) {
      $link.css('border-color', 'transparent');
      $icon.css('color', '#161616');
      $link.on('mouseover', handleOverViewMouseOver);
      $link.on('mouseout', handleMouseOut);
    }

    function updateStylesForNormalView($link, $icon) {
      if (!$link.hasClass('active')) {
        $link.css('border-color', 'transparent');
        $icon.css('color', '#161616');
      } else {
        $link.css('border-color', '#fff');
        $icon.css('color', '#fff');
      }
      $link.off('mouseover', handleOverViewMouseOver);
      $link.off('mouseout', handleMouseOut);
      $link.on('mouseover', handleBlockMouseOver);
      $link.on('mouseout', handleMouseOut);
    }

    function handleOverViewMouseOver(event) {
      const $link = $(event.currentTarget);
      const $icon = $link.find('.card-toggle__icon');
      $icon.css('color', '#000');
      $link.css('border-color', '#000');
    }

    function handleMouseOut(event) {
      const $link = $(event.currentTarget);
      const $icon = $link.find('.card-toggle__icon');

      if (!$link.hasClass('active')) {
        $icon.css('color', '#161616');
        $link.css('border-color', 'transparent');
      }
    }

    function handleBlockMouseOver(event) {
      const $link = $(event.currentTarget);
      const $icon = $link.find('.card-toggle__icon');
      $icon.css('color', '#fff');
      $link.css('border-color', '#fff');
    }
  }
});

import {reviewsData} from "./data.js";
import {isElementInViewport} from "./utils.js";

export function initReviewsSection() {
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


export function addLoadContentEventHandlers() {
    const reviewsSection = document.querySelector('.reviews-slider');
    $(window).on('scroll', function () {
        if (isElementInViewport(reviewsSection)) {
            setupReviewsSlider();
            $(window).off('scroll');
        }
    });
}

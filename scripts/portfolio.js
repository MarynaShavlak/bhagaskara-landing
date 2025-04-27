import {projectsData} from "./data.js";
import {generateProjectModalMarkup, hideModal, showModal} from "./modal.js";

export function initPortfolio() {
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
        const windowWidth = window.innerWidth;
        let columnWidth, gutter;

        switch (true) {
            case windowWidth >= 375 && windowWidth < 768:
                columnWidth = 300;
                gutter = 15;
                break;
            case windowWidth >= 768 && windowWidth < 1200:
                columnWidth = 310;
                gutter = 20;
                break;
            case windowWidth > 1200:
                columnWidth = 360;
                gutter = 25;
                break;
            default:
                columnWidth = 360;
                gutter = 30;
        }

        const $portfolio = $('.portfolio-list').isotope({
            itemSelector: '.portfolio__item',
            percentPosition: true,
            resize: true,
            masonry: {
                columnWidth: columnWidth,
                gutter: gutter,
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
        $('.close-modal-btn').on('click', () =>
            hideModal('.modal-backdrop-project'),
        );
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
        showModal('.modal-backdrop-project');
    }

    function getProjectData(el) {
        return projectsData.filter(data => data.id === el.attr('data-id'))[0];
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



export function generateProjectModalMarkup(projectData) {
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


export function showModal(selector) {
    $(selector).fadeIn('slow', function () {
        $('body').addClass('modal-open');
    });
}
export function hideModal(selector) {
    $(selector).fadeOut('slow', function () {
        $('body').removeClass('modal-open');
    });
}

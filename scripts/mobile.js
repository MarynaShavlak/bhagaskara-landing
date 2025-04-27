export function setMobileMenu() {
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

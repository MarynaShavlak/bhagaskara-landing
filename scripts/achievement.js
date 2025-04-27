export function initAchievementSection() {
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

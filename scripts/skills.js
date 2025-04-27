export function initSkillsSection() {
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

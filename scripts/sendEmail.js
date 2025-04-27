export function sendEmail() {
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

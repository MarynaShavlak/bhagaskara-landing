import {hideModal, showModal} from "./modal.js";

export function initAboutUsModal() {
    $('.learn-more-btn').on('click', () => showModal('.modal-backdrop-about'));
    $('.close-modal-btn').on('click', () => hideModal('.modal-backdrop-about'));
}

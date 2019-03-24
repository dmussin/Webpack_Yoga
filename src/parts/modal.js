function modal() {

    // const overlay = document.querySelector(".overlay");

    // function showModal(modBtn) {
    //     overlay.style.display = "block";
    //     info.classList.add("more-splash");
    //     document.body.style.overflow = "hidden";
    // }

    // function hideModal(modCloseBtn) {
    //     overlay.style.display = "none";
    //     info.classList.remove("more-splash");
    //     document.body.style.overflow = "";
    // }

    // if (target && target.classList.contains("more")) {
    //     showModal(target);
    // }
    // if (target && target.classList.contains("popup-close")) {
    //     hideModal(target);
    // }
    // if (target && target.classList.contains("description-btn")) {
    //     showModal(target);
    // }


    const more = document.querySelectorAll('.more, .description-btn'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

more.forEach(function(item){
    item.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        item.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
});
}

module.exports = modal;
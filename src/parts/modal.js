function modal() {
    
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
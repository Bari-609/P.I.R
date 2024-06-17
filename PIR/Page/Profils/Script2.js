// Lightbox functions
let clickTimer = null;

function openLightbox(img) {
    var lightboxImage = document.getElementById("lightbox-img");
    lightboxImage.src = img.src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.querySelector('.Image_profils');

    // Image profile click events
    if (imageContainer) {
        imageContainer.addEventListener('click', function(event) {
            this.classList.toggle('shift-left');
            if (!this.classList.contains('shift-left')) {
                this.style.transition = 'transform 0.8s ease';
                this.style.transform = 'translateX(0) rotate(0deg)';
                setTimeout(() => {
                    this.style.transition = '';
                    this.style.transform = '';
                }, 800);
            }
        });

        imageContainer.addEventListener('dblclick', function(event) {
            event.stopPropagation();
            openLightbox(this.querySelector('img'));
        });
    }

 
    // Play background music on first click
    document.addEventListener("click", function playMusic() {
        var audio = document.getElementById("bgMusic");
        if (audio.paused) {
            audio.play();
        }
        document.removeEventListener("click", playMusic);
    });

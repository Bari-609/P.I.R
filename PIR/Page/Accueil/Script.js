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
    const header = document.querySelector('h1');

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

    // Header text animation
    if (header) {
        imageContainer.addEventListener('click', function() {
            if (header.classList.contains('visible')) {
                header.style.transition = 'transform 0.7s ease, opacity 0.7s ease';
                header.classList.remove('visible');
            } else {
                header.style.transition = 'transform 3.4s ease, opacity 3.4s ease';
                header.classList.add('visible');
            }
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
});

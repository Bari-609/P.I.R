// Cookie functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
    console.log(`Cookie set: ${name}=${value}; ${expires}`);
}

function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

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
    const consent = getCookie('cookiesAccepted');
    const header = document.querySelector('h1');
    const cookieConsentContainer = document.getElementById('cookieConsentContainer');
    const contentOverlay = document.getElementById('contentOverlay');

    console.log('Cookie consent value:', consent);

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

    // Cookie consent logic
    if (consent === 'true' || consent === 'false') {
        cookieConsentContainer.style.display = 'none';
        contentOverlay.style.display = 'none';
    } else {
        cookieConsentContainer.style.display = 'block';
        contentOverlay.style.display = 'block';
    }

    document.getElementById('acceptCookies').onclick = function() {
        setCookie('cookiesAccepted', 'true', 365);
        cookieConsentContainer.style.display = 'none';
        contentOverlay.style.display = 'none';
    };

    document.getElementById('customizeCookies').onclick = function() {
        document.getElementById('cookieSettings').style.display = 'block';
    };

    document.getElementById('saveCookieSettings').onclick = function() {
        let analyticsConsent = document.getElementById('analyticsCookies').checked;
        let functionalConsent = document.getElementById('functionalCookies').checked;
        setCookie('cookiesAccepted', JSON.stringify({ analytics: analyticsConsent, functional: functionalConsent }), 365);
        cookieConsentContainer.style.display = 'none';
        document.getElementById('cookieSettings').style.display = 'none';
        contentOverlay.style.display = 'none';
    };
});
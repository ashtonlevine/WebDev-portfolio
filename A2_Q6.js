let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function slideControl(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("slides");

    if (n > slides.length) { //shows the first slide if the user clicks next on the last slide
        slideIndex = 1;
    }

    if (n < 1) { //shows the last slide if the user clicks previous on the first slide
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

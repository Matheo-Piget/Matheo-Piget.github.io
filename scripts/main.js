document.addEventListener("DOMContentLoaded", () => {
    // Dark mode
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        darkModeToggle.innerHTML = document.body.classList.contains("dark-mode") ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Loader
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => loader.style.display = "none");
    }

    // Back to top
    const backToTopButton = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        backToTopButton.style.display = window.pageYOffset > 100 ? "block" : "none";
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Typewriter effect
    const typeWriter = (element, text, speed = 100) => {
        element.innerHTML = "";
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    };

    typeWriter(document.getElementById("header-title"), "Mathéo Piget");
    typeWriter(document.getElementById("header-description"), "Étudiant en L3 d'Informatique");
});

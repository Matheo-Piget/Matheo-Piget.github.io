document.addEventListener("DOMContentLoaded", () => {
    // Dark mode
    // Mode sombre avec localStorage
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Vérifier la préférence utilisateur
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Basculer le mode sombre
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem("dark-mode", "disabled");
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
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

    const sections = document.querySelectorAll('.section, .cv-section');
    const observerOptions = {
        threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Filtrage des projets avec animation
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === "all" || card.classList.contains(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    typeWriter(document.getElementById("header-title"), "Mathéo Piget");
    typeWriter(document.getElementById("header-description"), "Étudiant en L3 d'Informatique");
});

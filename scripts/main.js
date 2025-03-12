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
                    card.style.display = "";  // Réaffiche l'élément (selon le style de base)
                } else {
                    card.style.display = "none";  // Supprime de la mise en page, forçant le grid à se réorganiser
                }
            });
        });
    });

    const codeAnimationContainer = document.querySelector('.code-animation');
    const keywords = ["HTML", "CSS", "JavaScript", "Python", "Java", "SQL", "Git", "010101", "101010", "C++", "PHP", "Ruby", "Swift", "Kotlin", "React", "Node.js", "Vue.js", "Django", "Flask", "Spring", "Angular", "TypeScript", "Rust", "Go"
        , "C#", "R", "MATLAB", "Assembly", "Bash", "Perl", "Scala", "Haskell", "Lua", "Objective-C", "Visual Basic", "Scratch", "SwiftUI", "Xcode", "Android Studio", "Eclipse", "IntelliJ IDEA", "NetBeans", "Sublime Text", "Atom", "VS Code", 
        "class", "function", "variable", "const", "let", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "return", "try", "catch", "finally", "async", "await", "promise", 
        "import", "export", "module", "require", "this", "super", "new", "delete", "typeof", "instanceof", "in", "of", "void", "null", "undefined", "true", "false", "NaN", "Infinity", "Math", "Date",
        "Array", "Object", "String", "Number", "Boolean", "RegExp", "Error", "Map", "Set", "WeakMap", "WeakSet", "Promise", "Symbol", "BigInt", "JSON", "XMLHttpRequest", "fetch", "localStorage", "sessionStorage", 
        "console", "log", "warn", "error", "info", "debug", "assert", "clear", "count", "dir", "group", "groupEnd", "time", "timeEnd", "trace", "table", "profile", "profileEnd", "timeStamp",
        "performance", "window", "document", "navigator", "location", "history", "screen", "alert", "confirm", "prompt", "setTimeout", "setInterval", "clearTimeout", "clearInterval", "requestAnimationFrame",
        "cancelAnimationFrame", "addEventListener", "removeEventListener", "dispatchEvent", "createElement", "appendChild", "removeChild", "replaceChild", "insertBefore", "insertAfter", "cloneNode",
        "querySelector", "querySelectorAll", "getElementById", "getElementsByClassName", "getElementsByTagName", "getBoundingClientRect", "offsetWidth", "offsetHeight", "clientWidth", "clientHeight",
        "scrollWidth", "scrollHeight", "scrollTop", "scrollLeft", "innerWidth", "innerHeight", "outerWidth", "outerHeight", "pageXOffset", "pageYOffset", "screenX", "screenY", "clientX", "clientY",
        "keyCode", "charCode", "which", "target", "currentTarget", "preventDefault", "stopPropagation", "stopImmediatePropagation", "defaultPrevented", "bubbles", "cancelable", "composedPath",
        "isTrusted", "timeStamp", "type", "srcElement", "relatedTarget", "view", "detail", "button", "buttons", "altKey", "ctrlKey", "metaKey", "shiftKey", "composedPath", "clipboardData",
        "dataTransfer", "dragEffect", "dropEffect", "effectAllowed", "items", "types", "getData", "setData", "clearData", "setDragImage", "files", "items", "webkitGetAsEntry", "webkitGetAsFileSystemHandle",
        "ocaml", "elixir", "erlang", "clojure", "lisp", "scheme", "prolog", "smalltalk", "dart", "f#", "groovy", "julia", "pascal", "delphi", "fortran", "cobol", "ada", "vhdl", "verilog",
        "assembly", "x86", "arm", "mips", "risc-v", "sparc", "powerpc", "z80", "68000", "6502", "8086", "8088", "80386", "80486", "pentium", "athlon", "core", "ryzen", "xeon", "opteron",
        "0010111011", "0101010101", "1100110011", "111100001111", "000011110000", "1010101010", "1111111111", "0000000000", "0011001100", "0101010101", "1100110011", "111100001111",
        "000011110000", "1010101010", "1111111111", "0000000000", "0011001100", "0101010101", "1100110011", "111100001111", "000011110000", "1010101010", "1111111111", "0000000000",
        "0011001100", "0101010101", "1100110011", "111100001111", "000011110000", "1010101010", "1111111111", "0000000000", "0011001100", "0101010101", "1100110011", "111100001111",
        "000011110000", "1010101010", "1111111111", "0000000000", "0011001100", "0101010101", "1100110011", "111100001111", "000011110000", "1010101010", "1111111111", "0000000000",
        "0011001100", "0101010101", "1100110011", "111100001111", "000011110000", "1010101010", "1111111111", "0000000000", "0011001100", "0101010101", "1100110011", "111100001111", 
        "char", "int", "float", "double", "string", "boolean", "array", "object", "list", "set", "map", "dictionary", "tuple", "stack", "queue", "deque", "heap", "tree", "graph",
        "linked list", "binary tree", "binary search tree", "AVL tree", "red-black tree", "B-tree", "hash table", "hash map", "hash set", "trie", "segment tree", "Fenwick tree", "disjoint set",
        "dynamic programming", "greedy algorithm", "backtracking", "divide and conquer", "brute force", "depth-first search", "breadth-first search", "Dijkstra's algorithm", "A* algorithm", "Bellman-Ford algorithm",
        "Floyd-Warshall algorithm", "Kruskal's algorithm", "Prim's algorithm", "KMP algorithm", "Rabin-Karp algorithm", "Boyer-Moore algorithm", "Knuth-Morris-Pratt algorithm", "dynamic programming",
        "greedy algorithm", "backtracking", "divide and conquer", "brute force", "depth-first search", "breadth-first search", "Dijkstra's algorithm", "A* algorithm", "Bellman-Ford algorithm"];

        function createCodeElement() {
            const span = document.createElement('span');
            span.innerText = keywords[Math.floor(Math.random() * keywords.length)];
            span.style.left = Math.random() * 100 + 'vw';
            span.style.animationDuration = Math.random() * 2 + 2 + 's'; // Durée aléatoire pour un effet naturel
            codeAnimationContainer.appendChild(span);
    
            // Supprimez l'élément après la fin de l'animation
            span.addEventListener('animationend', () => {
                span.remove();
            });
        }
    
        setInterval(createCodeElement, 500);

    typeWriter(document.getElementById("header-title"), "Mathéo Piget");
    typeWriter(document.getElementById("header-description"), "Étudiant en L3 d'Informatique");
});

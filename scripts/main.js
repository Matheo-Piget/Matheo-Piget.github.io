document.addEventListener('DOMContentLoaded', () => {
  // Dark mode
  // Mode sombre avec localStorage
  const darkModeToggle = document.getElementById('dark-mode-toggle')
  const body = document.body

  // Vérifier la préférence utilisateur
  if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode')
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  // Basculer le mode sombre
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled')
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    } else {
      localStorage.setItem('dark-mode', 'disabled')
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    }
  })

  // Smooth scroll
  // Animation de défilement améliorée
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Animation de flash subtil avant défilement
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Effet de flash sur la section cible
        const flashOverlay = document.createElement('div');
        flashOverlay.style.position = 'absolute';
        flashOverlay.style.top = '0';
        flashOverlay.style.left = '0';
        flashOverlay.style.width = '100%';
        flashOverlay.style.height = '100%';
        flashOverlay.style.backgroundColor = 'rgba(0, 184, 148, 0.1)';
        flashOverlay.style.zIndex = '0';
        flashOverlay.style.opacity = '0';
        flashOverlay.style.transition = 'opacity 0.5s ease';

        targetElement.style.position = 'relative';
        targetElement.appendChild(flashOverlay);

        setTimeout(() => {
          flashOverlay.style.opacity = '0.7';

          setTimeout(() => {
            flashOverlay.style.opacity = '0';
            setTimeout(() => {
              targetElement.removeChild(flashOverlay);
            }, 500);
          }, 300);
        }, 10);

        // Défilement doux
        window.scrollTo({
          behavior: 'smooth',
          top: targetElement.offsetTop - 50
        });
      }
    });
  });

  // Loader
  const loader = document.getElementById('loader')
  if (loader) {
    window.addEventListener('load', () => (loader.style.display = 'none'))
  }

  // Back to top
  const backToTopButton = document.getElementById('back-to-top')
  window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.pageYOffset > 100 ? 'block' : 'none'
  })

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  // Typewriter effect
  const typeWriter = (element, text, speed = 100) => {
    element.innerHTML = ''
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
  }

  const sections = document.querySelectorAll('.section, .cv-section')
  const observerOptions = {
    threshold: 0.1
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ajouter une animation différente selon le type d'élément
        if (entry.target.classList.contains('skill-card')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        } else if (entry.target.classList.contains('project-card')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        } else {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  sections.forEach(section => {
    section.style.opacity = '0'
    section.style.transform = 'translateY(20px)'
    observer.observe(section)
  })

  document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    observer.observe(card);
  });

  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  const filterButtons = document.querySelectorAll('.filter-btn')
  const projectCards = document.querySelectorAll('.project-card')

  // Filtrage des projets avec animation
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter')
      projectCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.style.display = '' // Réaffiche l'élément (selon le style de base)
        } else {
          card.style.display = 'none' // Supprime de la mise en page, forçant le grid à se réorganiser
        }
      })
    })
  })

  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Le formulaire sera géré par formspree, mais nous ajoutons un effet visuel
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

      // Après soumission réussie (géré par formspree)
      setTimeout(() => {
        // Réinitialiser le bouton après quelques secondes
        button.innerHTML = originalText;

        // Créer notification de confirmation
        const notification = document.createElement('div');
        notification.className = 'form-submitted';
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé avec succès!';
        document.body.appendChild(notification);

        // Supprimer la notification après 5 secondes
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 5000);
      }, 2000);
    });
  }

  const codeAnimationContainer = document.querySelector('.code-animation')
  const keywords = [
    'HTML',
    'CSS',
    'JavaScript',
    'Python',
    'Java',
    'SQL',
    'Git',
    '010101',
    '101010',
    'C++',
    'PHP',
    'Ruby',
    'Swift',
    'Kotlin',
    'React',
    'Node.js',
    'Vue.js',
    'Django',
    'Flask',
    'Spring',
    'Angular',
    'TypeScript',
    'Rust',
    'Go',
    'C#',
    'R',
    'MATLAB',
    'Assembly',
    'Bash',
    'Perl',
    'Scala',
    'Haskell',
    'Lua',
    'Objective-C',
    'Visual Basic',
    'Scratch',
    'SwiftUI',
    'Xcode',
    'Android Studio',
    'Eclipse',
    'IntelliJ IDEA',
    'NetBeans',
    'Sublime Text',
    'Atom',
    'VS Code',
    'class',
    'function',
    'variable',
    'const',
    'let',
    'if',
    'else',
    'for',
    'while',
    'do',
    'switch',
    'case',
    'break',
    'continue',
    'return',
    'try',
    'catch',
    'finally',
    'async',
    'await',
    'promise',
    'import',
    'export',
    'module',
    'require',
    'this',
    'super',
    'new',
    'delete',
    'typeof',
    'instanceof',
    'in',
    'of',
    'void',
    'null',
    'undefined',
    'true',
    'false',
    'NaN',
    'Infinity',
    'Math',
    'Date',
    'Array',
    'Object',
    'String',
    'Number',
    'Boolean',
    'RegExp',
    'Error',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'Promise',
    'Symbol',
    'BigInt',
    'JSON',
    'XMLHttpRequest',
    'fetch',
    'localStorage',
    'sessionStorage',
    'console',
    'log',
    'warn',
    'error',
    'info',
    'debug',
    'assert',
    'clear',
    'count',
    'dir',
    'group',
    'groupEnd',
    'time',
    'timeEnd',
    'trace',
    'table',
    'profile',
    'profileEnd',
    'timeStamp',
    'performance',
    'window',
    'document',
    'navigator',
    'location',
    'history',
    'screen',
    'alert',
    'confirm',
    'prompt',
    'setTimeout',
    'setInterval',
    'clearTimeout',
    'clearInterval',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'addEventListener',
    'removeEventListener',
    'dispatchEvent',
    'createElement',
    'appendChild',
    'removeChild',
    'replaceChild',
    'insertBefore',
    'insertAfter',
    'cloneNode',
    'querySelector',
    'querySelectorAll',
    'getElementById',
    'getElementsByClassName',
    'getElementsByTagName',
    'getBoundingClientRect',
    'offsetWidth',
    'offsetHeight',
    'clientWidth',
    'clientHeight',
    'scrollWidth',
    'scrollHeight',
    'scrollTop',
    'scrollLeft',
    'innerWidth',
    'innerHeight',
    'outerWidth',
    'outerHeight',
    'pageXOffset',
    'pageYOffset',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'keyCode',
    'charCode',
    'which',
    'target',
    'currentTarget',
    'preventDefault',
    'stopPropagation',
    'stopImmediatePropagation',
    'defaultPrevented',
    'bubbles',
    'cancelable',
    'composedPath',
    'isTrusted',
    'timeStamp',
    'type',
    'srcElement',
    'relatedTarget',
    'view',
    'detail',
    'button',
    'buttons',
    'altKey',
    'ctrlKey',
    'metaKey',
    'shiftKey',
    'composedPath',
    'clipboardData',
    'dataTransfer',
    'dragEffect',
    'dropEffect',
    'effectAllowed',
    'items',
    'types',
    'getData',
    'setData',
    'clearData',
    'setDragImage',
    'files',
    'items',
    'webkitGetAsEntry',
    'webkitGetAsFileSystemHandle',
    'ocaml',
    'elixir',
    'erlang',
    'clojure',
    'lisp',
    'scheme',
    'prolog',
    'smalltalk',
    'dart',
    'f#',
    'groovy',
    'julia',
    'pascal',
    'delphi',
    'fortran',
    'cobol',
    'ada',
    'vhdl',
    'verilog',
    'assembly',
    'x86',
    'arm',
    'mips',
    'risc-v',
    'sparc',
    'powerpc',
    'z80',
    '68000',
    '6502',
    '8086',
    '8088',
    '80386',
    '80486',
    'pentium',
    'athlon',
    'core',
    'ryzen',
    'xeon',
    'opteron',
    '0010111011',
    '0101010101',
    '1100110011',
    '111100001111',
    '000011110000',
    '1010101010',
    '1111111111',
    '0000000000',
    '0011001100',
    '0101010101',
    '1100110011',
    '111100001111',
    '000011110000',
    '1010101010',
    '1111111111',
    '0000000000',
    '0011001100',
    '0101010101',
    '1100110011',
    '111100001111',
    '000011110000',
    '1010101010',
    '1111111111',
    '0000000000',
    '0011001100',
    '0101010101',
    '1100110011',
    '111100001111',
    '000011110000',
    '1010101010',
    '1111111111',
    '0000000000',
    '0011001100',
    '0101010101',
    '1100110011',
    '111100001111',
    '000011110000',
    '1010101010',
    '1111111111',
    '0000000000',
    '0011001100',
    '0101010101',
    '1100110011',
    '111100001111',
    '000011110000',
    '1010101010',
    '1111111111',
    '0000000000',
    '0011001100',
    '0101010101',
    '1100110011',
    '111100001111',
    '000011110000',
    '1010101010',
    '1111111111',
    '0000000000',
    '0011001100',
    '0101010101',
    '1100110011',
    '111100001111',
    'char',
    'int',
    'float',
    'double',
    'string',
    'boolean',
    'array',
    'object',
    'list',
    'set',
    'map',
    'dictionary',
    'tuple',
    'stack',
    'queue',
    'deque',
    'heap',
    'tree',
    'graph',
    'linked list',
    'binary tree',
    'binary search tree',
    'AVL tree',
    'red-black tree',
    'B-tree',
    'hash table',
    'hash map',
    'hash set',
    'trie',
    'segment tree',
    'Fenwick tree',
    'disjoint set',
    'dynamic programming',
    'greedy algorithm',
    'backtracking',
    'divide and conquer',
    'brute force',
    'depth-first search',
    'breadth-first search',
    "Dijkstra's algorithm",
    'A* algorithm',
    'Bellman-Ford algorithm',
    'Floyd-Warshall algorithm',
    "Kruskal's algorithm",
    "Prim's algorithm",
    'KMP algorithm',
    'Rabin-Karp algorithm',
    'Boyer-Moore algorithm',
    'Knuth-Morris-Pratt algorithm',
    'dynamic programming',
    'greedy algorithm',
    'backtracking',
    'divide and conquer',
    'brute force',
    'depth-first search',
    'breadth-first search',
    "Dijkstra's algorithm",
    'A* algorithm',
    'Bellman-Ford algorithm'
  ]

  const maxElements = 20 // Maximum number of elements to display at once
  const updateInterval = 5000 // Intervalle de mise à jour en millisecondes
  const updateBatchSize = 5 // Nombre d'éléments à mettre à jour à chaque intervalle
  function createCodeElement() {
    if (codeAnimationContainer.childElementCount >= maxElements) return
    // Create the span for animation
    const span = document.createElement('span')
    span.innerText = keywords[Math.floor(Math.random() * keywords.length)]
    span.style.position = 'absolute'

    // Create a temporary hidden element to measure its width without displaying it
    const tempSpan = span.cloneNode(true)
    tempSpan.style.position = 'absolute'
    tempSpan.style.visibility = 'hidden'
    codeAnimationContainer.appendChild(tempSpan)

    const containerWidth = codeAnimationContainer.offsetWidth
    let left
    let tries = 0
    let newRect
    const maxTries = 10

    do {
      left = Math.random() * 100 // Position in vw
      tempSpan.style.left = left + 'vw'
      newRect = tempSpan.getBoundingClientRect()

      // Check overlap with current spans in the container
      let overlapFound = false
      const existingSpans = codeAnimationContainer.getElementsByTagName('span')

      for (let child of existingSpans) {
        if (child === tempSpan) continue
        const childRect = child.getBoundingClientRect()
        // Simple horizontal overlap check
        if (newRect.left < childRect.right && newRect.right > childRect.left) {
          overlapFound = true
          break
        }
      }
      if (!overlapFound) break
      tries++
    } while (tries < maxTries)

    // Remove temporary element and assign computed left to the real span
    codeAnimationContainer.removeChild(tempSpan)
    span.style.left = left + 'vw'
    span.style.animationDuration = Math.random() * 2 + 2 + 's' // Durée aléatoire pour un effet naturel

    codeAnimationContainer.appendChild(span)

    // Remove the span when the animation ends to keep the DOM clean.
    span.addEventListener('animationend', () => {
      span.remove()
    })
  }

  function updateKeywords() {
    // Supprimez progressivement les éléments existants
    const existingSpans = Array.from(
      codeAnimationContainer.getElementsByTagName('span')
    )
    const spansToRemove = existingSpans.slice(0, updateBatchSize)
    spansToRemove.forEach(span => span.remove())

    // Ajoutez de nouveaux éléments
    for (let i = 0; i < updateBatchSize; i++) {
      createCodeElement()
    }
  }

  // Créez de nouveaux éléments à intervalles réguliers
  setInterval(createCodeElement, 500)

  // Mettez à jour les mots-clés progressivement
  setInterval(updateKeywords, updateInterval)

  typeWriter(document.getElementById('header-title'), 'Mathéo Piget')
  typeWriter(
    document.getElementById('header-description'),
    "Étudiant en L3 d'Informatique"
  )
})

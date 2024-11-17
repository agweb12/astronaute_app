document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.l-side-nav li');
    const sections = document.querySelectorAll('.section');
    const headerToggle = document.querySelector('.header-toggle');
    const perspective = document.querySelector('.perspective');
    const outerNavReturn = document.querySelector('.outer-nav-return');
    const outerNav = document.querySelector('.outer-nav');
    const outerNavItems = document.querySelectorAll('.outer-nav li');
    let currentSectionIndex = 0;
    let isTransitioning = false; // Drapeau pour indiquer si une transition est en cours


    function nouvelleNavigation() {
        perspective.classList.add('perspective--modalview', 'effect-rotate-left-animate');
        outerNavReturn.classList.add('is-visual');
        outerNav.classList.add('is-visual');
        outerNavItems.classList.add('is-active');
    }

    function retourNavigationNormal() {
        if (outerNavReturn.classList.contains('is-visual')) {
            perspective.classList.remove('perspective--modalview', 'effect-rotate-left-animate');
            outerNavReturn.classList.remove('is-visual');
            outerNav.classList.remove('is-visual');
            outerNavItems.classList.remove('is-active');
        }
    }

    function navigationEntreSection(event) {
        if (!isTransitioning) {
            isTransitioning = true; // Début de la transition
            if (event.deltaY > 0) {
                // Scroll down
                if (currentSectionIndex < sections.length - 1) {
                    currentSectionIndex++;
                }
            } else {
                // Scroll up
                if (currentSectionIndex > 0) {
                    currentSectionIndex--;
                }
            }
            // Mettre à jour les classes des sections et des éléments de navigation
            navItems.forEach(nav => nav.classList.remove('is-active'));
            navItems[currentSectionIndex].classList.add('is-active');
            sections.forEach(section => section.classList.remove('section-is-active'));
            sections[currentSectionIndex].classList.add('section-is-active');

            setTimeout(() => {
                isTransitioning = false; // Fin de la transition après 500 ms
            }, 500);
        }
    }



    headerToggle.addEventListener('click', nouvelleNavigation);

    outerNavReturn.addEventListener('click', retourNavigationNormal);

    window.addEventListener('wheel', navigationEntreSection);

    navItems.forEach((item, indexSection) => {
        // Appelle de la fonction navigation pour exécuter la transition entre les sections
        item.addEventListener('click', function () {
            // Vérifier si la section correspondante est déjà active
            if (!isTransitioning && !sections[indexSection].classList.contains('section-is-active')) {
                isTransitioning = true; // Début de la transition
                // Retirer la classe 'is-active' de tous les éléments li
                navItems.forEach(nav => nav.classList.remove('is-active'));
                // Ajouter la classe 'is-active' à l'élément li cliqué
                item.classList.add('is-active');

                // Retirer la classe 'section-is-active' de toutes les sections
                sections.forEach(section => section.classList.remove('section-is-active'));
                // Ajouter la classe 'section-is-active' à la section correspondante
                sections[indexSection].classList.add('section-is-active');
                currentSectionIndex = indexSection; // Mettre à jour l'index de la section actuelle

                setTimeout(() => {
                    isTransitioning = false; // Fin de la transition après 500 ms
                }, 500);
            }
        });
    });
});
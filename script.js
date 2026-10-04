/* =========================================================
   SCOREVEDA CODING CLASSES
   RESPONSIVE JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const header =
    document.getElementById("header");

const themeBtn =
    document.getElementById("themeBtn");

const menuBtn =
    document.getElementById("menuBtn");

const navbar =
    document.getElementById("navbar");

const backTop =
    document.getElementById("backTop");

const scrollProgress =
    document.getElementById("scrollProgress");


/* =========================================================
   DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem("scoreveda-theme");


function updateThemeIcon() {

    if (!themeBtn) return;


    const isDark =
        document.body.classList.contains("dark");


    themeBtn.innerHTML = isDark

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';

}


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


updateThemeIcon();


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");


        const isDark =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "scoreveda-theme",
            isDark ? "dark" : "light"
        );


        updateThemeIcon();

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu() {

    if (!navbar) return;

    navbar.classList.remove(
        "mobile-open"
    );


    if (menuBtn) {

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


if (menuBtn) {

    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );


    menuBtn.addEventListener("click", () => {

        const isOpen =
            navbar.classList.toggle(
                "mobile-open"
            );


        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


/* =========================================================
   CLOSE MENU AFTER CLICK
========================================================= */

document
    .querySelectorAll(".navbar a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


/* =========================================================
   CLOSE MENU OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!navbar || !menuBtn) return;


        const clickedInsideNavbar =
            navbar.contains(event.target);


        const clickedMenu =
            menuBtn.contains(event.target);


        if (
            !clickedInsideNavbar &&
            !clickedMenu
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   CLOSE MENU WITH ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 1100
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   SCROLL
========================================================= */

function handleScroll() {

    const scrollTop =
        window.scrollY;


    /* Header */

    if (header) {

        if (scrollTop > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    /* Progress */

    if (scrollProgress) {

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (pageHeight > 0) {

            const percentage =
                (scrollTop / pageHeight) * 100;


            scrollProgress.style.width =
                `${percentage}%`;

        }

    }


    /* Back Top */

    if (backTop) {

        if (scrollTop > 500) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }


    /* Active Navigation */

    updateActiveNavigation();

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".navbar a"
        );


    let current =
        "home";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;


        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute(
                    "id"
                );

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute(
                "href"
            );


        if (
            href === `#${current}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

if (backTop) {

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.10,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "show"
            );

        }
    );

}


/* =========================================================
   ROADMAP CARD DESKTOP TILT
========================================================= */

const roadmapCards =
    document.querySelectorAll(
        ".roadmap-card"
    );


roadmapCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            /* Disable tilt on mobile */

            if (
                window.innerWidth <= 900
            ) {

                return;

            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) * -1;


            const rotateY =
                ((x - centerX) /
                    centerX);


            card.style.transform =
                `
                translateY(-5px)
                perspective(1000px)
                rotateX(${rotateX * 0.5}deg)
                rotateY(${rotateY * 0.5}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   TOUCH DEVICE SUPPORT
========================================================= */

const isTouchDevice =
    window.matchMedia(
        "(hover: none)"
    ).matches;


if (isTouchDevice) {

    roadmapCards.forEach(card => {

        card.style.transform =
            "";

    });

}


/* =========================================================
   JOURNEY HORIZONTAL SCROLL
========================================================= */

const journey =
    document.querySelector(
        ".journey-wrapper"
    );


if (journey) {

    let isDown = false;

    let startX = 0;

    let scrollLeft = 0;


    journey.addEventListener(
        "mousedown",
        event => {

            isDown = true;

            journey.classList.add(
                "dragging"
            );


            startX =
                event.pageX -
                journey.offsetLeft;


            scrollLeft =
                journey.scrollLeft;

        }
    );


    journey.addEventListener(
        "mouseleave",
        () => {

            isDown = false;

        }
    );


    journey.addEventListener(
        "mouseup",
        () => {

            isDown = false;

        }
    );


    journey.addEventListener(
        "mousemove",
        event => {

            if (!isDown) return;


            event.preventDefault();


            const x =
                event.pageX -
                journey.offsetLeft;


            const walk =
                (x - startX) * 1.5;


            journey.scrollLeft =
                scrollLeft - walk;

        }
    );

}


/* =========================================================
   INITIAL STATE
========================================================= */

handleScroll();


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c SCOREVEDA CODING CLASSES ",
    "background:#f97316;color:#fff;font-size:16px;font-weight:bold;padding:8px;"
);

console.log(
    "%c Full Stack Web Development Roadmap ",
    "color:#f97316;font-size:13px;font-weight:bold;"
);
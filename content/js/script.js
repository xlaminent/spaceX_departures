const slideNav = document.querySelector("#slideout-nav");
const sectionPush = document.querySelectorAll("section");
const headerPush = document.querySelector("header");
const footerPush = document.querySelector("footer");

let i;

function onResize(parse) {
    screenSize = parse.target.outerWidth;

    if (screenSize <= 640 && slideNav.dataset.menuOpen === "true") {

        for (i = 0; i < sectionPush.length; i++) {
            sectionPush[i].style.marginLeft = 0;
        }
        headerPush.style.marginLeft = 0;
        footerPush.style.marginLeft = 0;
        slideNav.style.width = "100%";
        }

    else if (slideNav.dataset.menuOpen === "true" && screenSize >= 640) {
        for (i = 0; i < sectionPush.length; i++) {
            sectionPush[i].style.marginLeft = "280px";
        }
        footerPush.style.display = "280px";
        headerPush.style.marginLeft = "180px";
        slideNav.style.width = "fit-content";
    }
}

window.addEventListener("resize", onResize);

function openSidenav() {

    const screenWidth = parseInt(window.innerWidth);

    if (screenWidth <= 640) {
        slideNav.style.width = "100%";
    } 

    else {
        for (i = 0; i < sectionPush.length; i++) {
            sectionPush[i].style.marginLeft = "280px";
        }
        headerPush.style.marginLeft = "180px";
        footerPush.style.marginLeft = "280px";
        slideNav.style.width = "fit-content";
    }
    slideNav.dataset.menuOpen = "true";
}
    
function closeSidenav() {

    const screenWidth = parseInt(window.innerWidth);

    if (screenWidth <= 640) {
        slideNav.style.width = "0";
    } 
    
    else {
        for (i = 0; i < sectionPush.length; i++) {
            sectionPush[i].style.marginLeft = "0";
        }
        headerPush.style.marginLeft = "0";
        footerPush.style.marginLeft = "0";
        headerPush.style.marginLeft = "0";
        slideNav.style.width = "0";
    }
    slideNav.dataset.menuOpen = "false";
}



window.onscroll = function() {
    pageScroll()
};

function pageScroll() {
    const pageUpBtn = document.querySelector(".up-btn");

    if (document.documentElement.scrollTop > 1500) {
        pageUpBtn.style.display = "block";
    } else {
        pageUpBtn.style.display = "none";
    }
}

function scrollUp() {
    document.documentElement.scrollTop = 0; 
}

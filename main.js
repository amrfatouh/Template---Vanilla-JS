const INTERVAL_TIME = 6000;
/* open and close side menu */
document.querySelector('.side-menu .side-menu-toggle').addEventListener('click', function () {
    document.querySelector('.side-menu').classList.toggle('opened');
    document.querySelector('.side-menu .side-menu-toggle i').classList.toggle('fa-spin');
})

/* cycling through different backgrounds randomly */
var imgArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg',];
var randomBackgroundInterval = setInterval(randomizeBackgrounds, INTERVAL_TIME);
function randomizeBackgrounds() {
    var random = Math.floor(Math.random() * imgArray.length);
    var div = document.querySelector('.background .back-image').style.backgroundImage = `url("assets/images/background/${imgArray[random]}")`;
}

/* get colors from local storage */
var storedColor = localStorage.getItem('background_color');
if (storedColor !== null) {
    document.querySelectorAll('.side-menu .color-list ul li').forEach(li => {
        if (li.dataset.color === storedColor) {
            document.documentElement.style.setProperty('--main-color', li.dataset.color);
            /* removing the tick from all other color circles */
            document.querySelectorAll('.side-menu .color-list ul li').forEach(li => {
                li.innerHTML = ''
            })
            /* adding the tick to the right circle */
            li.innerHTML = '<i class="fas fa-check fa-xs" style="background-color: var(--main-color)"></i>';
        }
    })
}

/* click on colors to change the main color of the website */
document.querySelectorAll('.side-menu .color-list ul li').forEach(li => {
    li.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') { /* checking if we clicked on th li itself not the font awesome tick (makes problems if not checked) */
            document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
            /* storing the color in the local storage */
            localStorage.setItem('background_color', e.target.dataset.color);
            document.querySelectorAll('.side-menu .color-list ul li').forEach(li => {
                li.innerHTML = ''
            })
            e.target.innerHTML = '<i class="fas fa-check fa-xs" style="background-color: var(--main-color)"></i>';
        }
    });
})

/* loading random background options from local storage */
savedRandomBackgroundOption = localStorage.getItem('random_background');
if (savedRandomBackgroundOption !== null) {
    if (savedRandomBackgroundOption === 'yes') {
        /* nothing to happen - the original interval takes place */
    } else {
        clearInterval(randomBackgroundInterval);
        /* disabling transition while fetching background from local storage */
        document.querySelector('.background .back-image').style.transition = 'all 0s linear';
        document.querySelector('.background .back-image').style.backgroundImage = localStorage.getItem('background_to_be_loaded');
        /* adding and removing active class */
        document.querySelectorAll('.side-menu .random-background span').forEach(span => {
            if (span.textContent === 'yes') {
                span.classList.remove('active');
            } else {
                span.classList.add('active');
            }
        })
    }
}

/* click on random background options */
document.querySelectorAll('.side-menu .random-background span').forEach(button => {
    button.addEventListener('click', function (e) {
        if (e.target.textContent === 'yes') {
            /* clearing the original interval before creating the new one */
            clearInterval(randomBackgroundInterval);
            randomBackgroundInterval = setInterval(randomizeBackgrounds, INTERVAL_TIME);
            document.querySelector('.background .back-image').style.transition = 'all 3s linear';
            /* removing active class from the other sibling */
            e.target.nextElementSibling.classList.remove('active');
            e.target.classList.add('active');
        } else {
            clearInterval(randomBackgroundInterval);
            localStorage.setItem('background_to_be_loaded', document.querySelector('.background .back-image').style.backgroundImage);
            e.target.previousElementSibling.classList.remove('active');
            e.target.classList.add('active');
        }
        localStorage.setItem('random_background', e.target.textContent);
    })
})

/* fill progress bars */
window.onscroll = function() {
    var skills = document.querySelector('.skills');
    if(window.scrollY + window.innerHeight > skills.offsetTop + skills.offsetHeight - 50) {
        document.querySelectorAll('.skills .skill-element .skill-progress .progress-done').forEach(div => {
            div.style.width = div.dataset.progress;
            /* adding progress text and suitable styling */
            div.appendChild(document.createTextNode(`${div.dataset.progress}`));
            div.style.setProperty('padding-right', '7px');
        });
        window.onscroll = '';
    }
}

/* handle clicks on gallery items */
document.querySelectorAll('.gallery .gallery-images .gallery-item').forEach(div => {
    div.addEventListener('click', function() {
        document.querySelector('.gallery-overlay').style.display = 'block';
        document.querySelector('.view-gallery-item h2').textContent = div.children[0].alt;
        document.querySelector('.view-gallery-item img').src = div.children[0].src;
        document.querySelector('.view-gallery-item').style.display = 'flex';
        document.querySelector('.view-gallery-item .close-gallery-overlay').addEventListener('click', function() {
            document.querySelector('.gallery-overlay').style.display = 'none';
            document.querySelector('.view-gallery-item').style.display = 'none';
        })
    })
})

/* show navigation bullets tool tips */
document.querySelectorAll('.nav-bullets ul li').forEach(li => {
    li.addEventListener('mouseover', function() {
        li.children[0].style.display = 'block';
    });
});
document.querySelectorAll('.nav-bullets ul li').forEach(li => {
    li.addEventListener('mouseout', function() {
        li.children[0].style.display = 'none';
    });
});

/* responding to clicking on navigation bullets */
document.querySelectorAll('.nav-bullets ul li').forEach(li => {
    li.addEventListener('click', function() {
        document.querySelector(li.dataset.element).scrollIntoView({
            behavior: "smooth"
        })
    });
});

/* navigation bullets local storage */
if (localStorage.getItem('nav_bullets_option')) {
    if (localStorage.getItem('nav_bullets_option') === 'yes') {
        document.querySelector('.nav-bullets').style.display = 'block';
        toggleActive(Array.from(document.querySelectorAll('.side-menu .nav-bullets-option span')).find(span => span.textContent === 'yes')); /* find() function doesn't work with NodeLists or HTML collections */
    } else {
        document.querySelector('.nav-bullets').style.display = 'none';
        toggleActive(Array.from(document.querySelectorAll('.side-menu .nav-bullets-option span')).find(span => span.textContent === 'no'));
    }
}

/* navigation bullets show/hide options */
document.querySelectorAll('.side-menu .nav-bullets-option span').forEach(span => {
    span.addEventListener('click', function(event) {
        if(event.target.textContent === 'yes') {
            document.querySelector('.nav-bullets').style.display = 'block';
            localStorage.setItem('nav_bullets_option', 'yes');
        } else {
            document.querySelector('.nav-bullets').style.display = 'none';
            localStorage.setItem('nav_bullets_option', 'no');
        }
        toggleActive(event.target);
    })
})
function toggleActive(target) {
    Array.from(target.parentNode.children).forEach(child => { /* u should change the children HTML collection into array before using 'forEach' loop */
        child.classList.remove('active');
    });
    target.classList.add('active');
}

/* reset to default button */
document.querySelector('button.reset-to-default').onclick = function() {
    localStorage.removeItem('background_color');
    localStorage.removeItem('background_to_be_loaded');
    localStorage.removeItem('random_background');
    localStorage.removeItem('nav_bullets_option');
    window.location.reload();
}

/* links menu button */
document.querySelector('.navbar .links-menu-button').addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelector('.navbar .links-menu-button .arrow').classList.toggle('active');
    document.querySelector('.navbar .links ul').classList.toggle('active');
})
/* close menu if clicked elsewhere */
document.addEventListener('click', function(e) {
    if (e.target !== document.querySelector('.navbar .links-menu-button')) {
        document.querySelector('.navbar .links-menu-button .arrow').classList.remove('active');
        document.querySelector('.navbar .links ul').classList.remove('active');
    }
})
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
    var div = document.querySelector('.background .back-image').style.backgroundImage = `url("assets/images/${imgArray[random]}")`;
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
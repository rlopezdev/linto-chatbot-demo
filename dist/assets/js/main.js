window.onload = () => {

    /* RESIZE SECTIONS ONLOAD */
    let windowHeight = window.innerHeight
    let sections = document.getElementsByClassName('homepage-section')
    for (let section of sections) {
        section.setAttribute('style', `height: ${windowHeight - 200}px;`)
    }

    $('#loading').addClass('hidden')

    /* VERTICAL NAV */
    let navBullets = document.getElementsByClassName('vertical-nav-bullet')
    for (let bullet of navBullets) {
        let target = bullet.getAttribute('data-target')
        bullet.onclick = (e) => {
            location.hash = target
        }
    }

    /* SLIDER */
    $('#homepage-slider').bxSlider();
}
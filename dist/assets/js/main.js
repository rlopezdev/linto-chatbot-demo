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

    /*** SECTIONS NAV ***/
    const getCurrentBlock = () => {
        let scrollHeight = document.body.scrollHeight
        let scrollPosY = window.pageYOffset || document.documentElement.scrollTop
        let nbBlocks = document.getElementsByTagName('section').length
        let blockHeight = scrollHeight / nbBlocks
        return Math.ceil((scrollPosY + blockHeight) / blockHeight)
    }
    const goToNextBlock = () => {
        let currentBlock = getCurrentBlock()
        let nbBlocks = document.getElementsByTagName('section').length
        let navBullets = document.getElementsByClassName('vertical-nav-bullet')
        if (currentBlock < nbBlocks) {
            let targetIndex = currentBlock + 1
            for (let nav of navBullets) {
                let index = nav.getAttribute('data-index')
                if (parseInt(index) === parseInt(targetIndex)) {
                    let targetBlock = nav.getAttribute('data-target')
                    location.hash = targetBlock
                }
            }
        }
    }
    const gotToPreviousBlock = () => {
        let currentBlock = getCurrentBlock()
        let navBullets = document.getElementsByClassName('vertical-nav-bullet')
        if (currentBlock > 1) {
            let targetIndex = currentBlock - 1
            for (let nav of navBullets) {
                let index = nav.getAttribute('data-index')
                if (parseInt(index) === parseInt(targetIndex)) {
                    let targetBlock = nav.getAttribute('data-target')
                    location.hash = targetBlock
                }
            }
        }
    }
    document.onscroll = (e) => {
        let currentBlock = getCurrentBlock()
        let navBullets = document.getElementsByClassName('vertical-nav-bullet')
        for (let nav of navBullets) {
            const index = nav.getAttribute('data-index');
            nav.classList.remove('active')
            if (parseInt(index) === parseInt(currentBlock)) {
                nav.classList.add('active')
            }
        }
    }
    const nextBlockBtn = document.getElementById('nextblock')
    const prevBlockBtn = document.getElementById('prevblock')
    nextBlockBtn.onclick = () => {
        goToNextBlock()
    }
    prevBlockBtn.onclick = () => {
        gotToPreviousBlock()
    }





}
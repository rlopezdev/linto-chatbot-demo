window.onload = () => {

    /* SLIDER */
    window.homepageSlider = $('#homepage-slider')
    window.homepageSlider.bxSlider();

    window.chatbot = new ChatBot({
        debug: true,
        containerId: 'chatbot-wrapper',
        lintoWebToken: 'KI7x8PRYUUgeps7k', //WWBoEVova4dWLtbw (local)
        lintoWebHost: 'https://stage.linto.ai/overwatch/local/web/login',
        forceMode: 'minimal-streaming',
        lintoSayResponse: false,
        lintoCustomEvents: [{
            flag: 'custom_action_from_skill',
            func: (event) => { customActionSkill(event) }
        }, {
            flag: 'streaming_stop',
            func: () => { onStreamingStop() }
        }]
    })


    let customActionSkill = async(event) => {

        if (!!event.detail && event.detail.behavior.customAction.kind === 'block_next') {
            goToNextBlock()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'block_previous') {
            gotToPreviousBlock()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'read_title') {
            let currentBlock = getCurrentBlock()
            if (currentBlock !== 1) {
                location.hash = '#section-01'
            }
            let content = document.getElementById('section-01-content')
            window.chatbot.say(content.innerHTML)
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'slide_next') {
            let currentBlock = getCurrentBlock()
            if (currentBlock !== 3) {
                location.hash = '#section-03'
            }
            window.homepageSlider.goToNextSlide()
        }
        // Slide previous
        if (!!event.detail && event.detail.behavior.customAction.kind === 'slide_previous') {
            let currentBlock = getCurrentBlock()
            if (currentBlock !== 3) {
                location.hash = '#section-03'
            }
            window.homepageSlider.goToPrevSlide()

        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'podcast_start') {
            window.YTplayer.playVideo()
        }
        if (!!event.detail && (event.detail.behavior.customAction.kind === 'podcast_pause' || event.detail.behavior.customAction.kind === 'podcast_stop')) {
            window.YTplayer.stopVideo()
        }
        console.log('wesh alors')
        if (window.chatbot.chatbotMode === 'minimal-streaming') {
            window.chatbot.hideChatbotMinimal()
        }
        if (window.chatbot.chatbotMode === 'multi-modal') {
            window.chatbot.hideChatbotMultiModal()
        }
    }
    let onStreamingStop = () => {
        const recordBtns = document.getElementsByClassName('linto-chatbot-streaming-btn')
        for (let btn of recordBtns) {
            if (btn.classList.contains('streaming-on')) {
                btn.classList.remove('streaming-on')
                let parent = btn.parentElement
                let btnPlay = parent.children[1]
                let inputTarget = document.getElementById(btnPlay.getAttribute('data-target'))
                if (inputTarget.innerHTML.length > 0) {
                    btnPlay.classList.remove('hidden')
                }
                btnPlay.onclick = () => {
                    window.chatbot.say(inputTarget.innerHTML)
                }
            }
        }
    }

    const formNameBtn = document.getElementById('form-name-button')
    formNameBtn.onclick = () => {
        formNameBtn.classList.add('streaming-on')
        window.chatbot.customStreaming('vad-custom', 'form-name')
    }

    const formSubjectBtn = document.getElementById('form-subject-button')
    formSubjectBtn.onclick = () => {
        formSubjectBtn.classList.add('streaming-on')
        window.chatbot.customStreaming('vad-custom', 'form-subject')
    }
    const formMsgBtn = document.getElementById('form-msg-button')
    formMsgBtn.onclick = () => {
        formMsgBtn.classList.add('streaming-on')
        window.chatbot.customStreaming('infinite', 'form-msg')
    }


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
}
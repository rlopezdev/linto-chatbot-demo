$(document).ready(() => {

    const s = Snap('#meeting-room-svg')
    const darkness = $('#ETEIND')
    const shutterRight = s.select('#volets-D')
    const shutterRightClose = 'M 264.9,170.3 409.5,87.4 409.5,322.6 264.9,405.5 Z'
    const shutterRightOpen = 'M 264.9,170.3 409.5,87.4 409.5,88.5 264.9,171.6 Z'

    const shutterLeft = s.select('#volets--G')
    const shutterLeftClose = 'M 116.1,255.4 260.7,172.5 260.7,407.7 116.1,490.6 Z'
    const shutterLeftOpen = 'M 116.1,255.4 260.7,172.5 260.7,173.5 116.1,257.1 Z'

    const shutterRightMask = s.path(shutterRightOpen).attr('fill', '#fff')
    const shutterLeftMask = s.path(shutterLeftOpen).attr('fill', '#fff')

    shutterRight.attr({ mask: shutterRightMask })
    shutterLeft.attr({ mask: shutterLeftMask })

    /* Meeting room Animation functions */
    let lightOn = function() {
        const s = Snap('#meeting-room-svg')
        const light = s.select('#LUMIERE-ON')
        light.animate({ opacity: 0.7 }, 500, function() {
            $('#LUMIERE-ON').removeClass('off').addClass('on')
        })
    }
    let lightOff = function() {
        const s = Snap('#meeting-room-svg')
        const projector = $('#VIDEOPROJ-ON')
        const light = s.select('#LUMIERE-ON')
        light.animate({ opacity: 0 }, 500, function() {
            $('#LUMIERE-ON').removeClass('on').addClass('off')
        })
    }
    let projectorOn = function() {
        const s = Snap('#meeting-room-svg')
        const projector = $('#VIDEOPROJ-ON')
        const projection = s.select('#VIDEOPROJ-ON')
        projection.animate({ opacity: 1 }, 500, function() {
            projector.removeClass('off').addClass('on')
        })
    }
    let projectorOff = function() {
        const s = Snap('#meeting-room-svg')
        const projector = $('#VIDEOPROJ-ON')
        const projection = s.select('#VIDEOPROJ-ON')
        projection.animate({ opacity: 0 }, 500, function() {
            projector.removeClass('on').addClass('off')
        })
    }
    let slideNext = function()  {
        const s = Snap('#meeting-room-svg')

        const pcSlides = $('.pc-proj')
        let target = null
        let targetProj = null
        const currentSlide = $('.pc-proj.active')
        const currentSlideIndex = parseInt(currentSlide.attr('data-index'));
        const currentProj = $('#VIDEOPROJ-ON-' + currentSlideIndex)

        if (currentSlideIndex === pcSlides.length) {
            target = $('.pc-proj[data-index="1"]')
            targetProj = $('.proj[data-index="1"]')
        } else {
            target = $('.pc-proj[data-index="' + (currentSlideIndex + 1) + '"]')
            targetProj = $('.proj[data-index="' + (currentSlideIndex + 1) + '"]')
        }
        const svgCurrent = s.select('#' + currentSlide.attr('id'))
        const svgTarget = s.select('#' + target.attr('id'))
        const svgCurrentProj = s.select('#VIDEOPROJ-ON-' + currentSlideIndex)
        const svgTargetProj = s.select('#' + targetProj.attr('id'))

        svgCurrent.animate({ opacity: 0 }, 300, function() {

            currentSlide[0].classList.remove('active')
            target[0].classList.add('active')
            currentProj[0].classList.remove('active')
            targetProj[0].classList.add('active')
            svgTarget.animate({ opacity: 1 }, 300)
            svgCurrentProj.animate({ opacity: 0 }, 300, function() {
                svgTargetProj.animate({ opacity: 1 }, 300)
            })
        })
    }
    let slidePrev = function() {
        const s = Snap('#meeting-room-svg')
        const pcSlides = $('.pc-proj')
        let target = null
        let targetProj = null
        const currentSlide = $('.pc-proj.active')
        const currentSlideIndex = parseInt(currentSlide.attr('data-index'));
        const currentProj = $('#VIDEOPROJ-ON-' + currentSlideIndex)
        if (currentSlideIndex === 1) {
            target = $('.pc-proj[data-index="' + pcSlides.length + '"]')
            targetProj = $('.proj[data-index="' + pcSlides.length + '"]')
        } else {
            target = $('.pc-proj[data-index="' + (currentSlideIndex - 1) + '"]')
            targetProj = $('.proj[data-index="' + (currentSlideIndex - 1) + '"]')
        }
        const svgCurrent = s.select('#' + currentSlide.attr('id'))
        const svgTarget = s.select('#' + target.attr('id'))
        const svgCurrentProj = s.select('#VIDEOPROJ-ON-' + currentSlideIndex)
        const svgTargetProj = s.select('#' + targetProj.attr('id'))

        svgCurrent.animate({ opacity: 0 }, 300, function() {
            currentSlide[0].classList.remove('active')
            target[0].classList.add('active')
            currentProj[0].classList.remove('active')
            targetProj[0].classList.add('active')
            svgTarget.animate({ opacity: 1 }, 300)
            svgCurrentProj.animate({ opacity: 0 }, 300, function() {
                svgTargetProj.animate({ opacity: 1 }, 300)
            })
        })
    }
    let closeShutters = function() {
        shutterRightMask.animate({
            d: shutterRightClose
        }, 600)
        shutterLeftMask.animate({
            d: shutterLeftClose
        }, 600, function() {
            $('#VOLETS-ON').removeClass('open').addClass('close')
        })
        darkness.animate({ opacity: 0.2 }, 500);

    }
    let openShutters = function() {
        shutterRight.attr({ mask: shutterRightMask })
        shutterLeft.attr({ mask: shutterLeftMask })
        shutterRightMask.animate({
            d: shutterRightOpen
        }, 600)
        shutterLeftMask.animate({
            d: shutterLeftOpen
        }, 600, function() {
            $('#VOLETS-ON').removeClass('close').addClass('open')
        })
        darkness.animate({ opacity: 0 }, 500);
    }

    /* CHATBOT */
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
        if (!!event.detail && event.detail.behavior.customAction.kind === 'shutter_off') {
            openShutters()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'shutter_on') {
            closeShutters()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'light_on') {
            lightOn()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'light_off') {
            lightOff()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'projector_on') {
            projectorOn()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'projector_off') {
            projectorOff()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'slide_next') {
            slideNext()
        }
        if (!!event.detail && event.detail.behavior.customAction.kind === 'slide_previous') {
            slidePrev()
        }
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
})
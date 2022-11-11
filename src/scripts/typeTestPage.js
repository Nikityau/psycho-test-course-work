const typeTestPage = (() => {
    const typeTestContainer = document.querySelector('.type-test__container')

    const timeout = specTimeout(1000)

    const emitter = new EventEmitter()

    const setEvents = () => {
        typeTestContainer.addEventListener('click', containerClickHandler)
    }

    const containerClickHandler = (e) => {
        const { target } = e
        if(target.getAttribute('data-test-type')) {
            const type = target.getAttribute('data-test-type')
            const underline = target.querySelector('.type-test__type-underline')
            addUnderlineStyle(underline)

            timeout(() => {
                emitter.emit('onbtnclick', type)
            })
        }
    }

    const init = (onClickHandlerCb) => {
        emitter.on('onbtnclick', onClickHandlerCb)
        setEvents()
    }
    const addUnderlineStyle = (underline) => {
        underline.classList.add('type-test__type-underline_active')
    }
    const clearUnderlinesStyle = () => {

    }

    const setEvent = () => {

    }

    const clearStyles = () => {
        clearUnderlinesStyle()
    }
    const destroy = () => {

    }

    const render = () => {

    }

    return {
        init,
        render,
        destroy,
        clearStyles
    }
})()
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
        const nodeArray = document.querySelectorAll('.type-test__type-underline')
        for(let node of nodeArray) {
            node.classList.remove('type-test__type-underline_active')
        }
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
const inDevTest = (() => {
    const domRoot = document.querySelector('.in-dev-test')

    const backBtnTitle = document.querySelector('.in-dev-test__back')
    const backBtn = document.querySelector('.in-dev-test__choose-tests')

    const setEvents = (backOneCb) => {
        backBtnTitle.addEventListener('click', backOneCb)
        backBtn.addEventListener('click', goBack)
    }

    const toThisPage = (from, title) => {
        backBtnTitle.querySelector('.in-dev-test__back-text').innerHTML = title

        pageTransit(
            from,
            domRoot
        )
    }

    const getRoot = () => {
        return domRoot
    }

    const goBack = () => {
        pageTransit(
            domRoot,
            document.querySelector('.type-test')
        )
    }

    return {
        setEvents,
        toThisPage,
        getRoot
    }
})()
const testPage = (() => {
    const domRoot = document.querySelector('.test-walkthrough')
    const domCount = domRoot.querySelector('.test-walkthrough__count')
    let tests = []

    let rightCount = 0

    const setEvents = () => {
        domRoot.querySelector('.test-walkthrough__back').addEventListener('click', () => {
            rightCount = 0

            pageTransit(
                domRoot,
                subtypesTestPage.getDomRoot()
            )
        })

        domRoot.querySelector('.test-walkthrough__back').addEventListener('click', prev)
        domRoot.querySelector('.test-walkthrough__next').addEventListener('click', next)
        domRoot.querySelector('.test-walkthrough__question-container').addEventListener('click', onAnswerClick)
    }

    const initTest = () => {

    }

    const onAnswerClick = (e) => {

    }

    const next = () => {

    }
    const prev = () => {

    }

    const toThisPage = (from, test) => {
        tests = test

        initTest()

        pageTransit(
            from,
            domRoot
        )
    }

    return {
        setEvents,
        toThisPage
    }
})()
const subtypesTestPage = (() => {
    const domRoot = document.querySelector('.subtype-test')

    const setEvents = () => {
        domRoot.querySelector('.subtype-test__back').addEventListener('click', () => {
            pageTransit(
                domRoot,
                document.querySelector('.type-test')
            )
        })
        domRoot.querySelector('.subtype-test__subtypes').addEventListener('click', e => {
            goNextPage(e.target)
        })

    }

    const getDomRoot = () => {
        return domRoot
    }

    const goNextPage = (target) => {
        const attr = target.getAttribute('data-test-subtype')
        if(!tests[attr]) {
            onBack.prev = domRoot
            onBack.current = inDevTest.getRoot()
            transitToErrorPage(
                domRoot,
                'психология'
            )

            return
        }

        testPage.toThisPage(domRoot, tests[attr])
    }

    return {
        setEvents,
        getDomRoot
    }
})()

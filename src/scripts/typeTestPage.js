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
const testResult = (() => {

    const domRoot = document.querySelector('.test-result')

    const setInfo = (rightA, wrongA, allA) => {
        domRoot.querySelector('.test-result__right-n-answers').innerHTML = rightA
        domRoot.querySelector('.test-result__right-n-answers-2').innerHTML = rightA
        domRoot.querySelector('.test-result__wrong-n-answers').innerHTML = wrongA
        domRoot.querySelector('.test-result__all-n-answers').innerHTML = allA
    }

    const setEvents = () => {
        domRoot.querySelector('.test-result__back').addEventListener('click', () => {
            pageTransit(
                domRoot,
                document.querySelector('.subtype-test')
            )
        })

        domRoot.querySelector('.test-result__choose-test').addEventListener('click', () => {
            pageTransit(
                domRoot,
                document.querySelector('.type-test')
            )
        })
    }

    return {
        setEvents,
        setInfo
    }
})()
const testPage = (() => {
    const domRoot = document.querySelector('.test-walkthrough')
    let tests = []
    let currTestIndex = 0

    let rightCount = 0

    const setEvents = () => {
        domRoot.querySelector('.test-walkthrough__back').addEventListener('click', () => {
            rightCount = 0
            currTestIndex = 0

            pageTransit(
                domRoot,
                subtypesTestPage.getDomRoot()
            )
        })

        domRoot.querySelector('.test-walkthrough__prev').addEventListener('click', prev)
        domRoot.querySelector('.test-walkthrough__next').addEventListener('click', next)
        domRoot.querySelector('.test-walkthrough__answers').addEventListener('click', onAnswerClick)
    }

    const initTest = () => {
        setTitle()
        setAnswers()
        setDomCount()
    }

    const setTitle = () => {
        document.querySelector('.test-walkthrough__question-title').innerHTML = tests[currTestIndex].question
    }

    const setAnswers = () => {
        const answers = document.querySelector('.test-walkthrough__answers')
        answers.innerHTML = ""

        for(let ans of tests[currTestIndex].answers) {
            answers.appendChild(createAnswer(ans))
        }
    }

    const setDomCount = () => {
        document.querySelector('.test-walkthrough__count-current').innerHTML = `${currTestIndex + 1}`
        document.querySelector('.test-walkthrough__count-max').innerHTML = `${tests.length}`
    }

    const createAnswer = (text) => {
        const divAnswer = document.createElement('div')
        divAnswer.classList.add('test-walkthrough__answer')

        const circle = document.createElement('div')
        circle.classList.add('test-walkthrough__answer-circle')

        const span = document.createElement('span')
        span.classList.add("text_roboto")
        span.classList.add("text_roboto_fw-400")
        span.classList.add("text_size_s")
        span.classList.add("text_uppercase")
        span.innerHTML = text

        divAnswer.appendChild(circle)
        divAnswer.appendChild(span)

        return divAnswer
    }

    const onAnswerClick = (e) => {
        const { target } = e
        target.classList.toggle('test-walkthrough__answer_chosen')
    }

    const computeResByCurrTestIndex = () => {
        const listAnswers = document.querySelectorAll('.test-walkthrough__answer_chosen')
        for(let answer of listAnswers) {
            const ansText = answer.querySelector('span').innerHTML

            const markByAnswer = 1 / tests[currTestIndex].right_answers.length
            let localMark = 0

            if(tests[currTestIndex].right_answers.includes(ansText)) {
                localMark += markByAnswer
            } else {
                localMark -= markByAnswer
            }

            if(localMark < 0) {
                localMark = 0
            }
            if(localMark > tests[currTestIndex].right_answers.length) {
                localMark = tests[currTestIndex].right_answers.length
            }

            rightCount += localMark
        }
    }

    const next = () => {
        computeResByCurrTestIndex()
        currTestIndex += 1
        if(currTestIndex >= tests.length) {
            currTestIndex = tests.length - 1
            toResPage()
            return
        }

        initTest()
    }
    const toResPage = () => {
        testResult.setInfo(rightCount, tests.length - Math.ceil(rightCount), tests.length)

        currTestIndex = 0
        rightCount = 0

        pageTransit(
            domRoot,
            document.querySelector('.test-result')
        )
    }

    const prev = () => {
        currTestIndex -= 1
        if(currTestIndex <= 0) {
            currTestIndex = 0
        }

        initTest()
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

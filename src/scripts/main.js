function main() {
    loadpage(transitFromLoadPage)
    typeTestPage.init(transitToTestSubtypes)
    inDevTest.setEvents(onBack)
    subtypesTestPage.setEvents()
    testPage.setEvents()
}

function transitToTestSubtypes(type) {
    typeTestPage.clearStyles()

    const typeTest = dataTests[type]

    if(!typeTest.isComplete) {
        onBack.prev = document.querySelector('.type-test')
        onBack.current = inDevTest.getRoot()
        transitToErrorPage(document.querySelector('.type-test'),typeTest.title)
        return
    }

    pageTransit(
        document.querySelector('.type-test'),
        document.querySelector('.subtype-test')
    )
}

function onBack() {
    pageTransit(
        onBack.current,
        onBack.prev
    )
}

function transitToTestTypes(slug) {
}

function transitToErrorPage(prevDomEl, title) {
    inDevTest.toThisPage(prevDomEl, title)
}
function transitToTests(slug) {

}
function transitToTestsResult() {

}

function transitFromLoadPage() {
    document.querySelector('.mini-logo').classList.remove('el_hide')
    pageTransit(
        document.querySelector('.enter-page'),
        document.querySelector('.type-test'),
    )
}

main()
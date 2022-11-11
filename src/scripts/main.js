function main() {
    loadpage(transitFromLoadPage)
    typeTestPage.init(transitToTestSubtypes)
}

function transitToTestSubtypes(type) {
    typeTestPage.clearStyles()
    pageTransit(
        document.querySelector('.type-test'),
        document.querySelector('.subtype-test')
    )
}

function transitToTestTypes(slug) {
}

function transitToErrorPage() {

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
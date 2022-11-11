function loadpage(loadend) {
    const loadpage__logo = document.querySelector('.enter-page__logo')
    const enterpage__title = document.querySelector('.enter-page__title')


    const timeout = specTimeout(700)

    timeout(() => {
        loadpage__logo.classList.remove('el_hide')
        timeout(() => {
            enterpage__title.classList.remove('el_hide')
            timeout(() => {
                enterpage__title.classList.add('el_hide')
                timeout(() => {
                    loadpage__logo.classList.add('el_hide')
                    timeout(loadend)
                })
            })
        })
    })
}

function specTimeout(delay) {
    return (cb) => {
        setTimeout(cb, delay)
    }
}
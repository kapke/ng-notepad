interface Window {
    CSS: null
}

window['CSS'] = null

Object.defineProperty(window, 'getComputedStyle', {
    value: () => ['-webkit-appearance'],
})

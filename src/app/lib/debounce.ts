export function debounce(cb: Function, timeout: number): Function {
    let timeoutHandle: number | null = null

    return (...args: any[]) => {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle)
        }

        timeoutHandle = setTimeout(cb, timeout, ...args)
    }
}

import { Range } from 'immutable'

import { debounce } from '../debounce'

describe('debounce', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should call passed function with given timeout', () => {
        const spy = jasmine.createSpy('callback').and.stub()
        const debounced = debounce(spy, 50)

        debounced()

        expect(spy).not.toHaveBeenCalled()
        jest.runTimersToTime(50)
        expect(spy).toHaveBeenCalled()
    })

    it('should pass all arguments to given callback', () => {
        Range(0, 20).forEach(count => {
            const args = Range(0, count).toArray()
            const spy = jasmine.createSpy('callback').and.stub()
            const debounced = debounce(spy, 50)

            debounced(...args)

            jest.runTimersToTime(50)
            expect(spy).toHaveBeenCalledWith(...args)
        })
    })

    it('should perform real call of given callback only once within given timeout', () => {
        const spy = jasmine.createSpy('callback').and.stub()
        const debounced = debounce(spy, 50)

        debounced()
        debounced()
        debounced()

        expect(spy).not.toHaveBeenCalled()
        jest.runTimersToTime(50)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should pass last received arguments to real call', () => {
        const spy = jasmine.createSpy('callback').and.stub()
        const debounced = debounce(spy, 50)

        debounced('foo')
        debounced('bar')
        debounced('baz')

        jest.runTimersToTime(50)
        expect(spy).toHaveBeenCalledWith('baz')
    })
})

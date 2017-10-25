import { List } from 'immutable'

import { ArrayFormatPipe } from '../ArrayFormat.pipe'

describe('ArrayFormat Pipe', () => {
    let arrayFormatPipe: ArrayFormatPipe
    const items: List<string> = List(['foo', 'bar', 'baz'])
    const fooBarBaz = 'foo, bar, baz'

    beforeEach(() => {
        arrayFormatPipe = new ArrayFormatPipe()
    })

    it('should call join with ", " separator if Array given', () => {
        const actual = arrayFormatPipe.transform(items.toArray())

        expect(actual).toBe(fooBarBaz)
    })

    it('should call join with ", " separator if Immutable Set given', () => {
        const actual = arrayFormatPipe.transform(items.toSet())

        expect(actual).toBe(fooBarBaz)
    })

    it('should call join with ", " separator if Immutable List given', () => {
        const actual = arrayFormatPipe.transform(items)

        expect(actual).toBe(fooBarBaz)
    })

    it('should call join with ", " separator if object with that method is given', () => {
        const obj1 = {
            join: (_separator: string) => {},
        }
        jest.spyOn(obj1, 'join').mockReturnValue(fooBarBaz)

        expect(arrayFormatPipe.transform(obj1)).toBe(fooBarBaz)
        expect(obj1.join).toHaveBeenCalledWith(', ')
    })

    it('should pass input otherwise', () => {
        const data = [fooBarBaz, 1, null, undefined, false, true, {}]
        const actual = data.map(val => arrayFormatPipe.transform(val))

        expect(actual).toEqual(data)
    })
})

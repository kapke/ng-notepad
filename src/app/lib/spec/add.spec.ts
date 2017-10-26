import * as jsc from 'jsverify'

import { add } from '../add'

describe('add', () => {
    jsc.property(
        'can have switched arguments',
        jsc.number,
        jsc.number,
        (nr1: number, nr2: number) => add(nr1, nr2) === add(nr2, nr1),
    )

    jsc.property('has 0 as neutral element', jsc.number, nr => add(nr, 0) === nr)

    jsc.property('of nr + nr equals 2*nr', jsc.number, nr => add(nr, nr) === 2 * nr)
})

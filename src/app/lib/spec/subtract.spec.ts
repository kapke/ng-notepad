import * as jsc from 'jsverify'

import { subtract } from '../subtract'

describe('subtract', () => {
    jsc.property('nr - nr equals 0', jsc.number, nr => subtract(nr, nr) === 0)

    jsc.property(
        'cannot have switched arguments if they are different',
        jsc.suchthat(jsc.pair(jsc.number, jsc.number), ([a, b]) => a !== b),
        ([a, b]) => subtract(a, b) !== subtract(b, a),
    )

    jsc.property('has 0 as right-side neutral element', jsc.number, nr => subtract(nr, 0) === nr)

    jsc.property(
        'should return -nr if 0 is first argument',
        jsc.number,
        nr => subtract(0, nr) === -nr,
    )
})

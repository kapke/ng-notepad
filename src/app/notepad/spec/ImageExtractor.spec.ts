import * as jsc from 'jsverify'
import * as _ from 'lodash'

import { ImageExtractor } from '../ImageExtractor'

describe('ImageExtractor', () => {
    let imageExtractor: ImageExtractor
    beforeEach(() => {
        imageExtractor = new ImageExtractor()
    })

    it('should extract each string starting with http:// or https:// and ending with one of jpg|jpeg|png', () => {
        const prop = jsc.tuple([
            jsc.elements(['http://', 'https://']),
            jsc.oneof([jsc.constant(''), jsc.suchthat(jsc.string, str => /^\w+$/.test(str))]),
            jsc.elements(['jpg', 'jpeg', 'png']),
        ])

        jsc.assertForall(prop, ([protocol, infix, extension]) => {
            const url = protocol + infix + extension
            console.log(url)
            return _.isEqual(imageExtractor.extractImages(url).toArray(), [url])
        })
    })
})

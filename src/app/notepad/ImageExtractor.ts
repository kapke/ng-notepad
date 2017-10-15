import { Seq, Set } from 'immutable'

export class ImageExtractor {
    public extractImages(content: string): Set<string> {
        return Seq(content.split(/ +/))
            .filter(part => /^https?:\/\//.test(part!))
            .filter(part => /(jpg|jpeg|png)$/.test(part!))
            .toSet()
    }
}

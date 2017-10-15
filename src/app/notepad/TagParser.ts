import { Set } from 'immutable'

export class TagParser {
    public parseTags(tagsString: string): Set<string> {
        return Set(tagsString.split(/[, ]+/))
    }
}

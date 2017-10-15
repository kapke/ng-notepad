import { Set } from 'immutable'

export class Note {
    public readonly id = ''
    public readonly title = ''
    public readonly content = ''
    public readonly tags: Set<string> = Set<string>()
    public readonly images: Set<string> = Set<string>()

    constructor(data: Partial<Note>) {
        Object.assign(this, data)
    }
}

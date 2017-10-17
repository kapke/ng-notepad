import { Set } from 'immutable'

export class Note {
    public readonly id: string = ''
    public readonly title: string = ''
    public readonly content: string = ''
    public readonly tags: Set<string> = Set<string>()
    public readonly images: Set<string> = Set<string>()

    constructor(data: Partial<Note>) {
        Object.assign(this, data)
    }
}

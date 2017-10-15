export class Note {
    public readonly id = ''
    public readonly title = ''
    public readonly content = ''
    public readonly tags = []

    constructor(data: Partial<Note>) {
        Object.assign(this, data)
    }
}

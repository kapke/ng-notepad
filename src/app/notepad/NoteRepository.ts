import { Inject, Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { List, Seq, Set } from 'immutable'
import { Observable } from 'rxjs/Observable'

import { AuthenticatedUser } from 'app/auth'
import { ImageExtractor } from './ImageExtractor'
import { Note } from './Note'

@Injectable()
export class NoteRepository {
    constructor(
        private afDatabase: AngularFireDatabase,
        @Inject(AuthenticatedUser) private authenticatedUser: AuthenticatedUser,
        private imageExtractor: ImageExtractor,
    ) {}

    private get currentUserList(): AngularFireList<Partial<Note>> {
        return this.afDatabase.list(`notes/${this.authenticatedUser.uid}`)
    }

    public getAll(): Observable<List<Note>> {
        return this.currentUserList
            .snapshotChanges()
            .map(Seq)
            .map(data =>
                data
                    .filter(item => !!item)
                    .map(item => ({
                        id: item!.payload!.key,
                        ...item!.payload!.val(),
                    }))
                    .map(
                        item =>
                            new Note({
                                ...item,
                                tags: Set(item.tags),
                                images: this.imageExtractor.extractImages(item.content),
                            }),
                    ),
            )
            .map(List)
    }

    public async add(note: Note): Promise<void> {
        const data = Object.assign({}, note, {
            id: null,
            tags: note.tags.toArray(),
            images: note.images.toArray(),
        })

        await this.currentUserList.push(data)
    }

    public async delete(note: Note): Promise<void> {
        await this.currentUserList.remove(note.id)
    }
}

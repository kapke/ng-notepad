import { Inject, Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { List } from 'immutable'
import { Observable } from 'rxjs/Observable'

import { AuthenticatedUser } from '../auth'
import { Note } from './Note'

@Injectable()
export class NoteRepository {
    constructor(
        private afDatabase: AngularFireDatabase,
        @Inject(AuthenticatedUser) private authenticatedUser: AuthenticatedUser,
    ) {}

    private get currentUserList(): AngularFireList<Partial<Note>> {
        return this.afDatabase.list(`notes/${this.authenticatedUser.uid}`)
    }

    public getCurrentUserNotes(): Observable<List<Note>> {
        return this.currentUserList
            .snapshotChanges()
            .map(data =>
                data.filter(item => !!item).map(
                    item =>
                        new Note({
                            id: item!.payload!.key,
                            ...item!.payload!.val(),
                        }),
                ),
            )
            .map(List)
    }

    public async addForCurrentUser(note: Note): Promise<void> {
        const data = Object.assign({}, note, { id: null })

        await this.currentUserList.push(data)
    }

    public async deleteOfCurrentUser(note: Note): Promise<void> {
        await this.currentUserList.remove(note.id)
    }
}

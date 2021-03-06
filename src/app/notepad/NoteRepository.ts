import { Inject, Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { List, Seq, Set } from 'immutable'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

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
        return this.currentUserList.snapshotChanges().pipe(
            map(items => Seq(items)),
            map(data =>
                data
                    .filter(item => !!item)
                    .map(
                        item =>
                            ({
                                id: item!.payload!.key,
                                ...item!.payload!.val(),
                            } as Partial<Note>),
                    )
                    .map(
                        item =>
                            new Note({
                                ...item!,
                                tags: Set(item!.tags!),
                                images: this.imageExtractor.extractImages(item!.content! || ''),
                            }),
                    ),
            ),
            map(notes => List(notes)),
        )
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

    public async searchWithPromise(query: string): Promise<List<Note>> {
        const allNotes = await this.getAll().toPromise()

        return this.filterNotes(query, allNotes)
    }

    public searchWithCallback(query: string, callback: (notes: List<Note>) => void): void {
        this.searchWithPromise(query).then(callback)
    }

    public searchWithObservable(query$: Observable<string>): Observable<List<Note>> {
        return query$.pipe(
            switchMap(query => this.getAll().pipe(map(notes => this.filterNotes(query, notes)))),
        )
    }

    private filterNotes(query: string, notes: List<Note>): List<Note> {
        return notes.filter(note => (note ? note.title.includes(query) : false)).toList()
    }
}

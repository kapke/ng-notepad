import { AngularFireDatabase } from 'angularfire2/database'
import { Deceiver } from 'deceiver-core'
import { List } from 'immutable'
import { Observable } from 'rxjs/Observable'

import { AuthenticatedUser } from 'app/auth'
import { AuthenticatedUserSpy } from 'app/auth/testing'
import { ImageExtractor } from '../ImageExtractor'
import { Note } from '../Note'
import { NoteRepository } from '../NoteRepository'

describe('NoteRepository', () => {
    let noteRepository: NoteRepository
    let angularFireDb: AngularFireDatabase
    let authenticatedUser: AuthenticatedUser

    beforeEach(() => {
        angularFireDb = Deceiver(AngularFireDatabase)
        authenticatedUser = AuthenticatedUserSpy()
        noteRepository = new NoteRepository(angularFireDb, authenticatedUser, new ImageExtractor())
    })

    describe('searching', () => {
        let allNotes: List<Note>
        let expectedNotes: List<Note>

        beforeEach(() => {
            const foo = new Note({ id: '42', title: 'foo' })
            const bar = new Note({ id: '43', title: 'bar' })
            const baz = new Note({ id: '44', title: 'baz' })
            allNotes = List<Note>([foo, bar, baz])
            expectedNotes = List<Note>([bar, baz])

            spyOn(angularFireDb, 'list').and.returnValue({
                snapshotChanges() {
                    return Observable.of([
                        {
                            payload: {
                                key: '42',
                                val() {
                                    return { title: 'foo', content: '' }
                                },
                            },
                        },
                        {
                            payload: {
                                key: '43',
                                val() {
                                    return { title: 'bar', content: '' }
                                },
                            },
                        },
                        {
                            payload: {
                                key: '44',
                                val() {
                                    return { title: 'baz', content: '' }
                                },
                            },
                        },
                    ])
                },
            })
        })

        function checkNotes(actual: List<Note>): void {
            expect(actual.size).toBe(expectedNotes.size)
            actual.forEach((note, index) => {
                const expectedNote = expectedNotes.get(index!)

                expect(note!.id).toEqual(expectedNote.id)
                expect(note!.title).toEqual(expectedNote.title)
            })
        }

        it('tested like this is an antipattern though it simplifies actual test a lot', async () => {
            spyOn(noteRepository, 'getAll').and.returnValue(Observable.of(allNotes))

            const actual = await noteRepository.searchWithPromise('ba')

            checkNotes(actual)
        })

        it('should search notes using callback implementation', done => {
            noteRepository.searchWithCallback('ba', actual => {
                checkNotes(actual)
                done()
            })
        })

        it('should search notes using callback implementation and converting it into a Promise', done => {
            new Promise<List<Note>>(resolve => noteRepository.searchWithCallback('ba', resolve))
                .then(checkNotes)
                .then(done, fail)
        })

        it('should search notes using promise implementation', async () => {
            const actual = await noteRepository.searchWithPromise('ba')

            checkNotes(actual)
        })

        it('should search notes using promise implementation without async', done => {
            noteRepository
                .searchWithPromise('ba')
                .then(checkNotes)
                .then(done, fail)
        })

        it('should search notes using observable implementation', done => {
            const nextSpy = jest.fn().mockImplementation((actual: List<Note>) => {
                checkNotes(actual)
            })

            noteRepository
                .searchWithObservable(Observable.from(['ba', 'b']))
                .subscribe(nextSpy, fail, () => {
                    expect(nextSpy).toHaveBeenCalledTimes(1)
                    done()
                })
        })
    })
})

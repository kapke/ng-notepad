import { Component, OnInit } from '@angular/core'
import { List } from 'immutable'
import { Observable } from 'rxjs/Observable'

import { Note } from './Note'
import { NoteRepository } from './NoteRepository'

@Component({
    selector: 'app-notepad',
    template: `
        <div>
            <app-user></app-user>
            <app-new-note></app-new-note>
            <app-note *ngFor="let note of notes$|async" [note]="note"></app-note>
        </div>
  `,
    styles: [],
})
export class NotepadComponent implements OnInit {
    public notes$: Observable<List<Note>>

    constructor(private noteRepository: NoteRepository) {}

    ngOnInit() {
        this.notes$ = this.noteRepository.getCurrentUserNotes()
    }
}

import { Component, OnInit } from '@angular/core'
import { List } from 'immutable'
import { Observable } from 'rxjs/Observable'

import { Note } from './Note'
import { NoteRepository } from './NoteRepository'

@Component({
    selector: 'ntp-notepad',
    template: `
        <div>
            <ntp-user></ntp-user>
            <ntp-new-note></ntp-new-note>
            <ntp-note *ngFor="let note of notes$|async" [note]="note"></ntp-note>
        </div>
  `,
    styles: [],
})
export class NotepadComponent implements OnInit {
    public notes$: Observable<List<Note>>

    constructor(private noteRepository: NoteRepository) {}

    ngOnInit() {
        this.notes$ = this.noteRepository.getAll()
    }
}

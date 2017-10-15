import { Component, Input } from '@angular/core';

import { Note } from './Note';
import { NoteRepository } from './NoteRepository';

@Component({
    selector: 'app-note',
    template: `
        <mat-card>
            <mat-card-title>{{ note.title }}</mat-card-title>
            <mat-card-content>{{ note.content }}</mat-card-content>
            <mat-card-actions>
                <button mat-button (click)="delete()">Delete</button>
            </mat-card-actions>
        </mat-card>
    `,
    styles: [],
})
export class NoteComponent {
    @Input() public note: Note;

    constructor (private noteRepository: NoteRepository) {}

    public delete () {
        this.noteRepository.deleteOfCurrentUser(this.note);
    }
}

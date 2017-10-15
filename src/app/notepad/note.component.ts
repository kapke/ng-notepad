import { Component, Input } from '@angular/core'

import { Note } from './Note'

@Component({
    selector: 'app-note',
    template: `
        <mat-card>
            <mat-card-title>{{ note.title }}</mat-card-title>
            <mat-card-content>{{ note.content }}</mat-card-content>
        </mat-card>
    `,
    styles: [],
})
export class NoteComponent {
    @Input() note: Note
}

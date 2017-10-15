import { Component, Input } from '@angular/core'

import { Note } from './Note'
import { NoteRepository } from './NoteRepository'

@Component({
    selector: 'ntp-note',
    template: `
        <mat-card>
            <mat-card-title>{{ note.title }}</mat-card-title>
            <mat-card-content>
                <div>{{ note.content }}</div>
                <span>{{ note.tags | arrayFormat }}</span>
                <div>
                    <img *ngFor="let image of note.images" [src]="image" alt="">
                </div>
            </mat-card-content>
            <mat-card-actions>
                <button mat-button (click)="delete()">Delete</button>
            </mat-card-actions>
        </mat-card>
    `,
    styles: [],
})
export class NoteComponent {
    @Input() public note: Note

    constructor(private noteRepository: NoteRepository) {}

    public delete() {
        this.noteRepository.delete(this.note)
    }
}

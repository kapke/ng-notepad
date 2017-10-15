import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Note } from './Note'
import { NoteRepository } from './NoteRepository'

@Component({
    selector: 'app-new-note',
    template: `
        <form [formGroup]="newNoteForm" (ngSubmit)="addNote()">
            <mat-form-field>
                <input matInput type="text" [formControlName]="'title'" placeholder="Title">
            </mat-form-field>
            <mat-form-field>
                <textarea matInput [formControlName]="'content'" placeholder="Content"></textarea>
            </mat-form-field>
            <mat-form-field>
                <input matInput type="text" [formControlName]="'tags'" placeholder="Tags">
            </mat-form-field>
            <div>
                <button mat-button type="reset">Reset</button>
                <button mat-button type="submit" [disabled]="newNoteForm.invalid">Submit</button>
            </div>
        </form>
    `,
    styles: [],
})
export class NewNoteComponent {
    public newNoteForm: FormGroup = this.formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        tags: [''],
    })

    constructor(
        private formBuilder: FormBuilder,
        private noteRepository: NoteRepository,
    ) {}

    public async addNote() {
        const note = new Note(this.newNoteForm.value)

        await this.noteRepository.addForCurrentUser(note)

        this.newNoteForm.setValue({ title: '', content: '', tags: '' })
    }
}

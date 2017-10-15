import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Note } from './Note'
import { NoteRepository } from './NoteRepository'
import { TagParser } from './TagParser'

@Component({
    selector: 'ntp-new-note',
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
        private tagParser: TagParser,
    ) {}

    public async addNote() {
        const data = { ...this.newNoteForm.value }
        data.tags = this.tagParser.parseTags(data.tags)

        await this.noteRepository.add(new Note(data))

        this.newNoteForm.setValue({ title: '', content: '', tags: '' })
    }
}

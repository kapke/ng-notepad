import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
} from '@angular/material'
import { RouterModule } from '@angular/router'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { AuthModule } from '../auth/auth.module'
import { ArrayFormatPipe } from './pipes/ArrayFormat.pipe'
import { ImageExtractor } from './ImageExtractor'
import { NewNoteComponent } from './new-note.component'
import { NoteComponent } from './note.component'
import { NotepadComponent } from './notepad.component'
import { notepadRoutes } from './notepad.routing'
import { NoteRepository } from './NoteRepository'
import { TagParser } from './TagParser'

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        RouterModule.forChild(notepadRoutes),
        AngularFireDatabaseModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    declarations: [
        NotepadComponent,
        NoteComponent,
        NewNoteComponent,
        ArrayFormatPipe,
    ],
    providers: [NoteRepository, TagParser, ImageExtractor],
})
export class NotepadModule {}

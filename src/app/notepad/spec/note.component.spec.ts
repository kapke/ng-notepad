import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing'
import { MatButton, MatButtonModule, MatCardModule } from '@angular/material'
import { By } from '@angular/platform-browser'
import { Deceiver } from 'deceiver-core'
import { Set } from 'immutable'

import { Note } from '../Note'
import { NoteComponent } from '../note.component'
import { NoteRepository } from '../NoteRepository'
import { ArrayFormatPipe } from '../pipes/ArrayFormat.pipe'

describe('NoteComponent with TestBed', () => {
    let component: NoteComponent
    let fixture: ComponentFixture<NoteComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [MatCardModule, MatButtonModule],
                declarations: [NoteComponent, ArrayFormatPipe],
                providers: [
                    {
                        provide: NoteRepository,
                        useValue: Deceiver(NoteRepository),
                    },
                ],
            }).compileComponents()
        }),
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(NoteComponent)
        component = fixture.componentInstance
        component.note = new Note({
            id: '42',
            title: 'note title',
            content: 'note content',
            tags: Set<string>(['foo', 'bar']),
            images: Set<string>(['foo/img1.jpg', 'bar/img2.png']),
        })
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it(
        'should call repository to delete given note on button click',
        fakeAsync(
            inject([NoteRepository], (noteRepository: NoteRepository) => {
                spyOn(noteRepository, 'delete').and.returnValue(Promise.resolve())

                fixture.debugElement.query(By.directive(MatButton)).triggerEventHandler('click', {})

                tick()

                expect(noteRepository.delete).toHaveBeenCalledWith(component.note)
            }),
        ),
    )

    it('should display "delete" on button to deleting a note', () => {
        expect(fixture.nativeElement.querySelector('button').textContent).toEqual('Delete')
    })

    it('should display title inside mat-card-title element', () => {
        expect(fixture.nativeElement.querySelector('mat-card-title').textContent).toEqual(
            component.note.title,
        )
    })

    it('should display content inside .mat-card-content element', () => {
        expect(fixture.nativeElement.querySelector('mat-card-content > div').textContent).toEqual(
            component.note.content,
        )
    })

    it('should display tags in single span in mat-card-content element', () => {
        expect(fixture.nativeElement.querySelector('mat-card-content > span').textContent).toEqual(
            'foo, bar',
        )
    })

    it('should display note images', () => {
        component.note.images
            .map(src => fixture.nativeElement.querySelector(`img[src="${src}"]`))
            .forEach(element => expect(element).toBeTruthy())
    })
})

describe('NoteComponent without TestBed', () => {
    let component: NoteComponent
    let noteRepository: NoteRepository

    beforeEach(() => {
        noteRepository = Deceiver(NoteRepository)
        component = new NoteComponent(noteRepository)
    })

    it('should delete a note', async () => {
        spyOn(noteRepository, 'delete').and.returnValue(Promise.resolve())
        const note = new Note({ id: '42' })

        component.note = note
        await component.delete()

        expect(noteRepository.delete).toHaveBeenCalledWith(note)
    })
})

import { IsAuthenticatedGuard } from 'app/auth'
import { NotepadComponent } from './notepad.component'

export const notepadRoutes = [
    {
        path: 'notepad',
        component: NotepadComponent,
        canActivate: [IsAuthenticatedGuard],
    },
]

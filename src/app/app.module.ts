import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { environment } from '../environments/environment'

import { AppComponent } from './app.component'
import { appRoutes } from './app.routing'
import { AuthModule } from './auth/auth.module'
import { NotepadModule } from './notepad/notepad.module'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(appRoutes),
        AuthModule,
        NotepadModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

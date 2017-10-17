import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule, MatCardModule } from '@angular/material'
import { RouterModule } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'

import { authRoutes } from './auth.routing'
import { AuthenticatedUser, authenticatedUserFactory } from './AuthenticatedUser'
import { IsAuthenticatedGuard } from './is-authenticated.guard'
import { LoginComponent } from './login.component'
import { UserComponent } from './user.component'

@NgModule({
    imports: [CommonModule, RouterModule.forChild(authRoutes), MatButtonModule, MatCardModule],
    providers: [
        IsAuthenticatedGuard,
        {
            provide: AuthenticatedUser,
            useFactory: authenticatedUserFactory,
            deps: [AngularFireAuth],
        },
    ],
    declarations: [LoginComponent, UserComponent],
    exports: [UserComponent],
})
export class AuthModule {}

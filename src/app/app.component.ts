import { Component } from '@angular/core'

import { environment } from '../environments/environment'

@Component({
    selector: 'ntp-root',
    template: `
        <router-outlet></router-outlet>
        <span class="instance">${environment.firebase.projectId}</span>
    `,
})
export class AppComponent {}

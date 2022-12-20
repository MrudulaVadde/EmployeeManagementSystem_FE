import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'signout-button',
  template: `
   <button type="button" class="btn btn-danger button__logout" (click)="handleLogout()">Logout</button>
  `,
})
export class LogoutButtonComponent {
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  handleLogout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
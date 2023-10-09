import { Component, OnInit } from '@angular/core';
import { AuthMsalService } from 'src/app/core/services';
import { LocalStorage } from 'src/app/utils/helpers';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  constructor(private readonly authMsal: AuthMsalService) {}

  ngOnInit(): void {
    LocalStorage.clear();
  }

  goToLogin() {
    this.authMsal.logout('/login');
  }
}

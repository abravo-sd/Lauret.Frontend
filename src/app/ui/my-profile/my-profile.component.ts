import { Component } from '@angular/core';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  constructor(readonly users: UsersService) {}
}

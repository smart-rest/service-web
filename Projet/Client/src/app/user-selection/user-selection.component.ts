
import { Observable } from 'rxjs';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { User } from '../model/user';
import { UserService } from '../services/user.service';

export class UserSelectionCloseEvent {
  public constructor(public readonly user: User, public readonly isValidated: boolean) { }
}

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {
  public users$: Observable<User[]>;
  public selectedUser: User;
  @Output() public close = new EventEmitter<UserSelectionCloseEvent>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getAll();
  }

  public onCloseIconClicked() {
    this.close.emit(new UserSelectionCloseEvent(this.selectedUser, false));
  }

  public onValidateClicked() {
    this.close.emit(new UserSelectionCloseEvent(this.selectedUser, true));
  }

  public onCancelClicked() {
    this.close.emit(new UserSelectionCloseEvent(this.selectedUser, false));
  }
}

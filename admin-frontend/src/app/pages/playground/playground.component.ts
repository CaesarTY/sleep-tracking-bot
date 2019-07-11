import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { PlaygroundUser, PlaygroundUserData } from '../../@core/data/playground_users';


@Component({
  selector: 'ngx-playground',
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent implements OnInit {

  userSource: LocalDataSource;

  smartTableSettings = {
    columns: {
      id: {
        title: 'ID',
        isEditable: false,
      },
      userName: {
        title: 'Full Name',
      },
      phone: {
        title: 'Phone Number',
      },
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    mode: 'inline',
  };

  constructor(private playgroundUserService: PlaygroundUserData) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.playgroundUserService.getUsers()
        .subscribe((users: [PlaygroundUser]) => {
          console.log('users:', users);
          const jsonifiedUsers = users.map(item => {
            return {
              'id': item.id,
              'userName': item.userName,
              'phone': item.phone,
            };
          });
          this.userSource = new LocalDataSource(jsonifiedUsers);
        });
  }

  createUser(event) {
    console.log(event);
    if (window.confirm('Are you sure you want to create?')) {
      this.playgroundUserService.createUser(event.newData)
          .subscribe((user: PlaygroundUser) => {
            console.log(user);
            this.getUsers();
            event.confirm.resolve();
          });
    } else {
      event.confirm.reject();
    }
  }

  deleteUser(event) {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      this.playgroundUserService.deleteUser(event.data.id)
          .subscribe((user: PlaygroundUser) => {
            console.log('user deleted:', user);
            this.getUsers();
            event.confirm.resolve();
          });
    } else {
      event.confirm.reject();
    }
  }

  editUser(event) {
    console.log('editUser event', event);
    if (window.confirm('Are you sure you want to update?')) {
      this.playgroundUserService.updateUser(event.newData.id, event.newData)
          .subscribe((user: PlaygroundUser) => {
            console.log('user updated:', user);
            this.getUsers();
            event.confirm.resolve();
          });
    } else {
      event.confirm.reject();
    }
  }
}

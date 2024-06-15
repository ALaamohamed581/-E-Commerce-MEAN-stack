import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
// import { CategoriesService } from '../../../../../../products/src/service/categories.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserModel, UserServiace } from '@bluebits/users';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgIf,
    TagModule,
    ToastModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    RouterLink,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  constructor(
    private _usersSearvice: UserServiace,
    private messageSerivrace: MessageService,
    private c_serive: ConfirmationService,
    private router: Router
  ) {}
  Users: UserModel[] = [];
  User?: UserModel;
  deleteUset(id: string) {
    this.c_serive.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete categoty',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._usersSearvice.DeleteUser(id).subscribe(
          () => {
            this.User = this.Users.find((el) => (el.id = id));
            this.GetAllusers();
            this.messageSerivrace.add({
              severity: 'success',
              summary: 'serviace meesage',
              detail: `${this.User?.name}, has been delete`,
            });
          },
          () => {
            this.messageSerivrace.add({
              severity: 'error',
              summary: 'serviace meesage',
              detail: `Faild to create User !`,
            });
          }
        );
      },
      reject: () => console.log(`You have rejectd the updated`),
    });
  }
  updatedUser(id: string) {
    this.router.navigateByUrl(`users/form/${id}`);
  }
  ngOnInit(): void {
    this.GetAllusers();
  }
  private GetAllusers() {
    this._usersSearvice
      .getAllUsers()
      .subscribe((obs) => console.log((this.Users = obs)));
  }
}

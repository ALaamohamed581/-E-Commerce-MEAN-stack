import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';

import { UserModel, UserServiace } from '@bluebits/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countriesIdsAndnames } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { GlobaConfirmations } from '@bluebits/golbal-confiramtionlib';
import { Module } from '../../allModasl/ImportedModes';
@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [...Module, InputMaskModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UsersFormComponent implements OnInit {
  isSubmitted = false;
  user?: UserModel;
  form!: any;
  editMode = false;
  currentUserId!: string;
  countries: object[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userserivce: UserServiace,
    private messageSerivrace: MessageService,
    private global: GlobaConfirmations
  ) {
    this._initUserForm();
  }

  ngOnInit(): void {
    this.getContries();
    this._checkEditMode();
  }
  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }

  UpdateData() {
    this.user = {
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
    };

    this.global.updateandCreateConfrmationsmeaasges(
      this.userserivce.UdateUserData(this.currentUserId, this.user),
      this.user,
      'created'
    );
  }
  Onsubmit() {
    this.user = {
      name: this.userForm['name'].value.toUpperCase(),
      password: this.userForm['password'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
    };
    this.isSubmitted = true;
    if (this.form.invalid) return;
    if (this.editMode) {
      this.UpdateData();
    } else {
      this.global.updateandCreateConfrmationsmeaasges(
        this.userserivce.craeteUser(this.user),
        this.user,
        'Updated'
      );
    }
  }

  onCancle() {
    this.router.navigateByUrl('/users');
  }
  private _checkEditMode() {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.currentUserId = param['id'];
        this.editMode = true;
        this.userserivce
          .getUserById(param['id'])
          .subscribe((user: UserModel) => {
            this.userForm['name'].setValue(user.name);
            this.userForm['password'].setValue(user.password);
            this.userForm['email'].setValue(user.email);
            this.userForm['phone'].setValue(user.phone);
            this.userForm['isAdmin'].setValue(user.isAdmin);
            this.userForm['street'].setValue(user.street);
            this.userForm['apartment'].setValue(user.apartment);
            this.userForm['zip'].setValue(user.zip);
            this.userForm['city'].setValue(user.city);
            this.userForm['country'].setValue(user.country);
          });
      }
    });
  }
  private getContries() {
    this.countries = Object.entries(countriesIdsAndnames).map((el) => {
      return { id: el[0], name: el[1] };
    });
  }
  get userForm() {
    return this.form.controls;
  }
}

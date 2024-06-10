import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthotinticationService } from '../../services/authotintication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStrogeService } from '../../services/local-stroge.service';
import { Router } from '@angular/router';
@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isSubmted = false;
  authError = false;
  authMessage = 'Email or Passowrd Are wrong';

  LoginFormGroup: any;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthotinticationService,
    private localStroge: LocalStrogeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.inintLoginForm();
  }
  private inintLoginForm() {
    this.LoginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get loginForm() {
    return this.LoginFormGroup.controls;
  }
  onSubmit() {
    this.isSubmted = true;

    const loginData: any = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value,
    };
    if (this.LoginFormGroup.invalid) {
      return;
    }
    this.auth.Login(loginData.email, loginData.password).subscribe(
      (data) => {
        console.log(data, 'from the login components');
        this.localStroge.swtItem(data.token);
        this.router.navigate(['/']), (this.authError = false);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400)
          return (this.authMessage =
            'Error in the server please try again later');
        else {
          return (this.authMessage = 'worng email or password');
        }
      }
    );
  }
}

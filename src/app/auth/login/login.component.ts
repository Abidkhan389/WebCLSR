import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TokenHelper } from 'src/app/_common';
import { Messages } from 'src/app/_common/Validators';
import { AuthService } from 'src/app/_services/auth.service';
import { ILogin } from 'src/app/interfaces/auth/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  form: FormGroup
  LogIndata: ILogin;
  loading: boolean;
  validationMessages = Messages.validation_messages
  constructor(public formBuilder: FormBuilder, public router :Router, private authService:AuthService) {
  }

  ngOnInit() {
    this.validateForm();
  }

  onSubmit() {
    this.LogIndata = this.form.value;
    this.authService.login(this.LogIndata).pipe(finalize(() => {
      this.loading = false
    })).subscribe((result: any) => {
      if (result.token) {
        TokenHelper.setToken(result.token);
        localStorage.setItem("user", result.userName);
        localStorage.setItem("userId",result.id);
        this.authService.UserId=result.id;
        this.form.reset();
        this.router.navigateByUrl('/main')
      }
    });
    // console.log(this.form.value)
    // TokenHelper.setAccessToken('testToken')
    // this.router.navigateByUrl('/main')
  }

  validateForm() {
    this.form = this.formBuilder.group({
      username: new FormControl(),
      password: new FormControl(),
    })
  }

}


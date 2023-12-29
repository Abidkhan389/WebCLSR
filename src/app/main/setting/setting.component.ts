import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages, NoWhitespaceValidator } from 'src/app/_common/Validators';
import { DropDownUtils } from 'src/app/_common/_helper';
import { ResetPasswordService } from 'src/app/_services/administration/reset-password.service';
import { LookupService } from 'src/app/_services/lookup.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent extends DropDownUtils implements OnInit {
  resetpasswordForm: FormGroup;
  UserDetails: any;
  PasswordButtonClicked:boolean=true;
  userId: any;
  validationMessages = Messages.validation_messages;
  constructor(protected lookupService: LookupService,protected router:Router,private fb: FormBuilder,
    private resetPasswordService:ResetPasswordService) 
    {
      super(lookupService, router)
      this.userId = localStorage.getItem('userId');
      this.userProfile(this.userId, data => this.UserDetails = data);
    }

  ngOnInit(): void {
    this.validateform() 
  }
  Submit() 
  {
    this.userId = localStorage.getItem("userId");
    let model = Object.assign({}, this.resetpasswordForm.getRawValue());
    model.id = this.userId
    this.resetPasswordService.updateUserProfile(model).subscribe((data:any)=>{
    //this.router.navigate(['/recommendation'], { queryParams: { courseId: this.courseId } })
    });
  }
  validateform()
   {
    this.resetpasswordForm = this.fb.group({
      OldPassword: [null, Validators.compose([NoWhitespaceValidator, Validators.required])],
      password: [null, Validators.compose([NoWhitespaceValidator, Validators.required])],
      confirmPassword: [null,Validators.compose([NoWhitespaceValidator, Validators.required])],
    },{ validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) 
  {
    let password = group.controls.password.value;
    let confirmPassword = group.controls.confirmPassword.value;

    return password === confirmPassword ? null : { notSame: true };
  }
  ResetPassword()
  {
    this.PasswordButtonClicked = true // Toggle the property on click
  }

}

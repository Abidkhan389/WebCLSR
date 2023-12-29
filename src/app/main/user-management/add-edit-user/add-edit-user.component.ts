import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { helpers } from 'chart.js';
import { finalize } from 'rxjs/operators';
import { Messages, NoWhitespaceValidator, Patterns } from 'src/app/_common/Validators';
import { Helpers } from 'src/app/_common/_helper';
import { getuserbyid, userdetails } from 'src/app/_common/_helper/enum';
import { Gender } from 'src/app/_common/enum';
import { UsermanagementService } from 'src/app/_services/administration/usermanagement.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.sass']
})
export class AddEditUserComponent implements OnInit {
  loading: any;
  isreadOnly: boolean = false;
  UserForm: FormGroup;
  genderType: Object[] = [];
  validationMessages = Messages.validation_messages;
  constructor(private usermanagementService: UsermanagementService,
    private fb: FormBuilder, private dilog: MatDialog, protected router: Router,
    private dialogref: MatDialogRef<AddEditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.genderType = Helpers.enumStringToArray(Gender);
  }

  ngOnInit(): void {
    this.validateform();
    if (this.data.userId) {
      this.GetUser()
    }
  }
  //Getting User By ID
  GetUser() {
    this.loading = true;
    // this.usermanagementService.GetUserById(this.data.userId).pipe(
    //   finalize(() => {
    //     this.loading = false;
    //   }))
    //   .subscribe(result => {
    //     if (result) {
    //       debugger
    //       this.UserForm.patchValue(result);
    //       if(this.data.IsReadOnly)
    //       {
    //         this.isreadOnly = true;
    //         this.UserForm.disable();
    //       }
    //     }
    //   },
    //     error => {
    //       showErrorMessage(ResultMessages.serverError);
    //     });
    let userresult = getuserbyid;
   
    if (userresult) {
      debugger
      // this.userresultempt.gender = this.userresultempt.gender === 'Male' ? 1 : this.userresultempt.gender === 'Female' ? 2 : 3;
      this.UserForm.patchValue(userresult);
      if (this.data.IsReadOnly) {
        this.isreadOnly = true;
        this.UserForm.disable();
      }
    this.loading = false;
    }
  }
  AddEditSubmit() {
    this.loading = true;
    let model = Object.assign({}, this.UserForm.getRawValue());
    if (this.data.userId)
      model.id = this.data.userId
    this.usermanagementService.addEditUser(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });
  }
  validateform() {
    this.UserForm = this.fb.group({
      fullName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100)])],
      email: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.emailRegex), Validators.maxLength(100)])],
      phoneNumber: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.maxLength(11), Validators.minLength(11)])],
      age: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.maxLength(3)])],
      gender: [null, Validators.required, Validators.compose([])],
    });
  }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
}

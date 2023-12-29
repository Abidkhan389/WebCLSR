import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenHelper } from 'src/app/_common';
import { Messages, NoWhitespaceValidator, Patterns } from 'src/app/_common/Validators';
import { Helpers } from 'src/app/_common/_helper';
import { userMessagesAndNotification } from 'src/app/_common/_helper/enum';
import { Interests, MaterialType, Nationality, Skills, Subscriptions } from 'src/app/_common/enum';
import { UserProfileService } from 'src/app/_services/administration/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {
  UserId:any;
  UserForm: FormGroup;
  interests: Object[] = [];
  subscriptions: Object[] = [];
  skills: Object[] = [];
  nationality: Object[] = [];
  materialType: Object[] = [];
  loading: any;
  validationMessages = Messages.validation_messages;
  count:number=4;
  user=TokenHelper.getUserName();
  userdetailsmsgsnotifications:any;
  constructor(private router: Router,private fb: FormBuilder,  private route: ActivatedRoute, private userprofile: UserProfileService) {
   

    this.materialType = Helpers.enumStringToArray(MaterialType);
    this.interests = Helpers.enumStringToArray(Interests);
    this.subscriptions = Helpers.enumStringToArray(Subscriptions);
    this.skills = Helpers.enumStringToArray(Skills);
    this.nationality = Helpers.enumStringToArray(Nationality);
   }
  ngOnInit(): void {
    this.validateform();
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.UserId = params.userId
        if (this.UserId)
          this.GetUserById();
      }
    })
  }
  
  validateform() {
    this.UserForm = this.fb.group({
      education: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100)])],
      City: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)])],
      address: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(200)])],
      description: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(500)])],
      intrests: [null, Validators.required],
      skills: [null, Validators.required],
      nationality: [null, Validators.required],
      maritalstatus: [null, Validators.required],
      subscriptions: [null, Validators.required],
    });
  }
  Submitdetails(){
    this.loading = true;
    let model = Object.assign({}, this.UserForm.getRawValue());
      model.id = this.UserId
    this.userprofile.updateUserProfile(model).subscribe((data: any) => {
      this.UserForm.reset();
    });
  }
  GetUserById(){
    this.loading = true;
    this.userdetailsmsgsnotifications = userMessagesAndNotification.find(user => user.id === this.UserId);
    // this.usertempdata=this.userdetailsmsgsnotifications.userinfo
    this.UserForm.patchValue(this.userdetailsmsgsnotifications.userinfo);
    this.loading = false;

  }
}

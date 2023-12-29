import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Messages, NoWhitespaceValidator, Patterns } from 'src/app/_common/Validators';
import { AddEditUserComponent } from '../../user-management/add-edit-user/add-edit-user.component';
import { ContentManagementService } from 'src/app/_services/administration/content-management.service';
import { getQuestionbyid } from 'src/app/_common/_helper/enum';
import { Helpers } from 'src/app/_common/_helper';
import { CLSRQuestionTypes } from 'src/app/_common/enum';
import { finalize } from 'rxjs/operators';
import { showErrorMessage } from 'src/app/_common/messages';
import { ResultMessages } from 'src/app/_common/constant';

@Component({
  selector: 'app-add-edit-content-management',
  templateUrl: './add-edit-content-management.component.html',
  styleUrls: ['./add-edit-content-management.component.sass']
})
export class AddEditContentManagementComponent implements OnInit {

  loading: any;
  isreadOnly: boolean = false;
  QuestionForm: FormGroup;
  questionOption: any = [];
  isShowOptions : boolean  = false;

  validationMessages = Messages.validation_messages;
  questionType: Object[] = [];
  constructor(private contentManagementService: ContentManagementService,
    private fb: FormBuilder, private dilog: MatDialog, protected router: Router,
    private dialogref: MatDialogRef<AddEditContentManagementComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.questionType = Helpers.enumToArray(CLSRQuestionTypes);
  }

  ngOnInit(): void {
    this.validateform();
    if (this.data.questionId) {
      this.GetQuestion(this.data.questionId, data => {
        this.QuestionForm.patchValue(data);
        if (data)
          this.questionOption = this.QuestionForm.get('options') as FormArray;
        while (this.questionOption.length);
        this.questionOption.removeAt(0);
        if (data.medicine.length > 0) {
          data.medicine.forEach((item, ind) => {
            this.addOption()
            this.questionOption.controls[ind].patchValue(item)
          });
        }
        if (this.data.IsReadOnly) {
          this.QuestionForm.disable();
          this.questionOption.disable();
          this.isreadOnly = true;

        }
      })
    }
    else {
      this.ngOnChanges();
    }
  }
  ngOnChanges(){
    this.QuestionForm.get('questiontype').valueChanges.subscribe(val => {
      debugger
      while (this.questionOption.length) {
        this.questionOption.removeAt(0);
      }
    })

  }
  //Getting Question By ID
  GetQuestion(id: any, callback) {
    this.loading = true;
    // this.contentManagementService.GetquestionById(id).pipe(
    //   finalize(() => {
    //     this.loading = false;
    //   }))
    //   .subscribe(result => {
    //     if (result) {
    //       callback(result);
    //     }
    //   },
    //     error => {
    //       showErrorMessage(ResultMessages.serverError);
    //     });
    let questionresult = getQuestionbyid;

    if (questionresult) {
      debugger
      // this.userresultempt.gender = this.userresultempt.gender === 'Male' ? 1 : this.userresultempt.gender === 'Female' ? 2 : 3;
      this.QuestionForm.patchValue(questionresult);
          this.questionOption = this.QuestionForm.get('options') as FormArray;
        while (this.questionOption.length);
        this.questionOption.removeAt(0);
        if (questionresult.options.length > 0) {
          questionresult.options.forEach((item, ind) => {
            this.addOption()
            this.questionOption.controls[ind].patchValue(item)
          });
        }
        if (this.data.IsReadOnly) {
          this.QuestionForm.disable();
          this.questionOption.disable();
          this.isreadOnly = true;

        }
      this.loading = false;
    }
  }
  AddEditSubmit() {
    this.loading = true;
    let model = Object.assign({}, this.QuestionForm.getRawValue());
    model.options.map((element, index) => {
      model.options.optionNo = element.optionNo = index + 1;
    })
    if (this.data.userId)
      model.id = this.data.userId
    this.contentManagementService.addEditquestion(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });
  }
  //Add Question  Option
  addOption(val?, type?) {
    this.questionOption = this.QuestionForm.get('options') as FormArray;
    this.questionOption.push(this.createoOtionForm(val, type));
  }
  createoOtionForm(item?, type?) {
    return this.fb.group({
      optionTitle: new FormControl({ value: item ? item.value : null, disabled: item ? true : false }, Validators.compose([
        Validators.required,
        NoWhitespaceValidator,
      ])),
      optionNo: ['', Validators.compose([])],
      isAnswer: new FormControl(item ? item.type : type, Validators.compose([
        Validators.required,
      ])),
      isAnswered: ['', Validators.compose([])],
    });
  }
    //Changing Values of Options
  valueChange(i) {
    this.questionOptions.controls.forEach((item, indx) => {
      if (indx == i) {
        item.get('isAnswer').setValue(true);
      } else {
        item.get('isAnswer').setValue(false);
      }
    })
  }
  get questionOptions(): FormArray {
    return this.QuestionForm.get('options') as FormArray;
  }
  validateform() {
    this.QuestionForm = this.fb.group({
      question: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100)])],
      options: this.fb.array([]),
      questiontype: [null, Validators.required, Validators.compose([])],


    });
  }
  // Remove option at a specific index
  removeoption(index: number) {
    this.getMedicineArray().removeAt(index);
  }
  // Get the option FormArray
  getMedicineArray(): FormArray {
    return this.QuestionForm.get('options') as FormArray;
  }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
}


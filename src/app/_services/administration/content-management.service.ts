import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Table } from 'src/app/interfaces/ITable';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { APIPaths } from 'src/app/_common/constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  } 
  getAllQuestions(model:Table) {
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllQuestions,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  updateQuestion(model: any) {
    let onSuccess = (value) => {
      let data = value;
      return data
    };
    return this.service(this.post(APIPaths.updateQuestion, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  addEditquestion(model: any) {
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        showSuccessMessage(data.message)
        return true;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.addEditquestion, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetquestionById(Id: any) {
    let params = new HttpParams().set('Id', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.GetquestionById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Table } from 'src/app/interfaces/ITable';
import { map } from 'rxjs/operators';
import { userdetails } from 'src/app/_common/_helper/enum';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { APIPaths } from 'src/app/_common/constant';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  } 
  getAllUsers(model:Table) {
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllusers,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  updateUser(model: any) {
    let onSuccess = (value) => {
      let data = value;
      return data
    };
    return this.service(this.post(APIPaths.updateUser, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  addEditUser(model: any) {
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
    return this.service(this.post(APIPaths.addEditUser, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetUserById(Id: any) {
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
    return this.service(this.get(APIPaths.getUserById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}

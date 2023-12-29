import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APIPaths } from 'src/app/_common/constant';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  } 
  updateUserProfile(model: any) {
    let onSuccess = (value) => {
      let data = value;
      return data
    };
    return this.service(this.post(APIPaths.updateUserManagementProfile, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}

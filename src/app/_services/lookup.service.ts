import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { APIPaths } from '../_common/constant';
import { showErrorMessage, showInfoMessage } from '../_common/messages';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LookupService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
}
UserProfile(userId: any) {
  let params = new HttpParams();
  params = params.append('UserId', userId);
  let onSuccess = (value) => {
    let data = value;
    if (data.success) {
      return data.data;
    } else if (!data.success) {
      showErrorMessage(data.message)
      return data;
    }
  };
  return this.service(this.get(APIPaths.GetUserProfile, params)).pipe(
    map(value => this.processPayload(value)),
    map(onSuccess)
  );
}
//Get ALl Courses With Id And Name
// getAllCoursesForDDL()
// {
//   let onSuccess = (value) => {
//     let data = value;
//     if (data.success) {
//       return data.data;
//     } else {
//       showErrorMessage(data.message)
//       return false;
//     }
//   };
//   return this.service(this.get(APIPaths.getAllCoursesDDL)).pipe(
//     map(value => this.processPayload(value)),
//     map(onSuccess)
//   );
// }
}

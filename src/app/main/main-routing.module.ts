import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { SettingComponent } from './setting/setting.component';
import { EditAdminprofileComponent } from './admin-profile/edit-adminprofile/edit-adminprofile.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'',
    component:MainComponent
  },
  {
    path: 'Management',
    component: UserManagementComponent
  },
  {
    path: 'userprofile',
    component: UserProfileComponent
  },
  {
    path: 'messages',
    component: UserMessagesComponent
  },
  {
    path: 'notifications',
    component: UserNotificationsComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'editprofile',
    component: EditAdminprofileComponent
  },
  {
    path: 'contentManagement',
    component: ContentManagementComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

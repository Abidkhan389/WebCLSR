import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserManagementComponent } from './user-management/user-management.component';
import { ShareModule } from '../-share/-share.module';
import { AddEditUserComponent } from './user-management/add-edit-user/add-edit-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { SettingComponent } from './setting/setting.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { AddEditContentManagementComponent } from './content-management/add-edit-content-management/add-edit-content-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarchartComponent } from './barchart/barchart.component';
import { LinechartComponent } from './linechart/linechart.component';



@NgModule({
  declarations: [
    MainComponent,
    UserManagementComponent,
    AddEditUserComponent,
    UserProfileComponent,
    UserMessagesComponent,
    UserNotificationsComponent,
    SettingComponent,
    ContentManagementComponent,
    AddEditContentManagementComponent,
    DashboardComponent,
    BarchartComponent,
    LinechartComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MainRoutingModule,
    ShareModule
    
  ]
})
export class MainModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'src/app/interfaces/ITable';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { helpers } from 'chart.js';
import {  userdetails } from 'src/app/_common/_helper/enum';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { finalize } from 'rxjs/operators';
import { UsermanagementService } from 'src/app/_services/administration/usermanagement.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { Messages, NoWhitespaceValidator, Patterns } from 'src/app/_common/Validators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.sass']
})
export class UserManagementComponent implements OnInit {
  tableParams: Table;
  @ViewChild('myTable') table: any;
  validationMessages = Messages.validation_messages;
  form: FormGroup;
  loading: boolean = true;
  UserList: any;
  noData: boolean = false;
  modalOptions: NgbModalOptions = {};
  isCollapsed: boolean = true;
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['sn.', 'status', 'fullName', 'email', 'phoneNumber', 'gender', 'age', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  currentPage = 1;
  count: number = 0;
  CurrentUserId: any;
  user: any[] = [];
  isHovered = false;
  constructor(private fb: FormBuilder, protected router: Router,
    private dilog: MatDialog, private modalService: NgbModal, private usermanagementService: UsermanagementService) {
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
    
  }

  ngOnInit(): void {
    this.validateForm();
    this.fetchAllUsers();
  }
  validateForm() {
    this.form = this.fb.group({
      gender: ['',],
      freeUsers: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)])],
      status: ['',],
    });
  }
  // On Advance Search Submit
  onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.fetchAllUsers();
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.fetchAllUsers();
  }
  // Pagination with server side
  pageChanged(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllUsers()
  }
  //Sorting on Coloum With MatSort
  onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllUsers();
  }
  ViewCourse(Id: any) {
    this.CurrentUserId = Id;
    this.AddEdit(this.CurrentUserId, true);
  }
  updateStatus(event, user) {
    this.loading = false;
    let model = {
      id: user.id,
      status: event.checked ? 1 : 0
    }
     //return this.usermanagementService.updateUser(model)
    //   .pipe(
    //     finalize(() => {
    //       this.loading = false;
    //     }))
    //   .subscribe(data => {
    //     if (data.success) {
    //       showSuccessMessage(data.message)
    //       user.status = event
    //     }
    //     else {
    //       showErrorMessage(data.message)
    //       user.status = !event
    //     }
    //   },
    //     error => {
    //       showErrorMessage(ResultMessages.serverError);
    //     });
  }
  fetchAllUsers() {
    this.loading = true;
    this.UserList = userdetails;
    this.dataSource = this.UserList;
    this.loading = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Object.assign(this.tableParams, this.form.value);
    // this.usermanagementService.getAllUsers(this.tableParams)
    //   .pipe(
    //     finalize(() => {
    //       this.loading = false;
    //     }))
    //   .subscribe(result => {
    //     if (result) {
    //       this.count = result.totalCount;
    //       this.dataSource = result.dataList;
    //       if (this.count == 0) {
    //         this.noData = true;
    //       }
    //       else{
    //         this.noData = false
    //       }
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     }
    //   });
  }
  //Add Edit With Mat Dialoge Modal Ref
  AddEdit(Id?: any, IsReadOnly?: any) {
    const dialogref = this.dilog.open(AddEditUserComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        userId: Id,
        IsReadOnly: IsReadOnly
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllUsers();
        }
      },
    });
  }
  userprofile(Id: any) {
    this.router.navigate(['/main/userprofile'], { queryParams: { userId: Id } })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TokenHelper } from 'src/app/_common';
import { Messages, NoWhitespaceValidator, Patterns } from 'src/app/_common/Validators';
import { Table } from 'src/app/interfaces/ITable';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.sass']
})
export class UserNotificationsComponent implements OnInit {
  user=TokenHelper.getUserName();
  tableParams: Table;
  @ViewChild('myTable') table: any;
  form: FormGroup;
  loading: boolean = true;
  messageList: any;
  noData: boolean = false;
  modalOptions: NgbModalOptions = {};
  isCollapsed: boolean = true;
  dataSource !: MatTableDataSource<any>;
  // displayedColumns: string[] = ['sn.', 'status', 'fullName', 'email', 'phoneNumber', 'gender', 'age', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  currentPage = 1;
  count: number = 0;
  validationMessages = Messages.validation_messages;
  constructor(private fb: FormBuilder, protected router: Router,
    private dilog: MatDialog, private modalService: NgbModal) {
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };

     }

  ngOnInit(): void {
    this.validateForm();
    if(this.user.userId)
    {
      this.AllMessagesByUser();
    }
  }
  // On Advance Search Submit
  onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.AllMessagesByUser();
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.AllMessagesByUser();
  }
  // Pagination with server side
  pageChanged(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.AllMessagesByUser()
  }
  //Sorting on Coloum With MatSort
  onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.AllMessagesByUser();
  }
  AllMessagesByUser()
  {

  }
  validateForm() {
    this.form = this.fb.group({
      premiumUser: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)])],
      gender: ['',],
      ageRange: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.Num), Validators.maxLength(50)])],
      freeUsers: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)])],
      status: ['',],
    });
  }

}

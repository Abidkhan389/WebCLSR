import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Messages, NoWhitespaceValidator, Patterns } from 'src/app/_common/Validators';
import { ContentManagementService } from 'src/app/_services/administration/content-management.service';
import { Table } from 'src/app/interfaces/ITable';
import { AddEditContentManagementComponent } from './add-edit-content-management/add-edit-content-management.component';
import { QuestionDetails, userdetails } from 'src/app/_common/_helper/enum';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.sass']
})
export class ContentManagementComponent implements OnInit {
  tableParams: Table;
  @ViewChild('myTable') table: any;
  validationMessages = Messages.validation_messages;
  form: FormGroup;
  loading: boolean = true;
  QuestionList: any;
  noData: boolean = false;
  modalOptions: NgbModalOptions = {};
  isCollapsed: boolean = true;
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['sn.', 'status', 'Question', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  currentPage = 1;
  count: number = 0;
  CurrentUserId: any;
  user: any[] = [];
  constructor(private fb: FormBuilder, protected router: Router,
    private dilog: MatDialog, private modalService: NgbModal, private contentManagementService: ContentManagementService) {
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
    
  }

  ngOnInit(): void {
    this.validateForm();
    this.fetchAllQuestions();
  }
  validateForm() {
    this.form = this.fb.group({
      question: ['',],
      status: ['',],
    });
  }
  // On Advance Search Submit
  onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.fetchAllQuestions();
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.fetchAllQuestions();
  }
  // Pagination with server side
  pageChanged(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllQuestions()
  }
  //Sorting on Coloum With MatSort
  onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllQuestions();
  }
  ViewQuestion(Id: any) {
    this.CurrentUserId = Id;
    this.AddEdit(this.CurrentUserId, true);
  }
  updateStatus(event, user) {
    this.loading = false;
    let model = {
      id: user.id,
      status: event.checked ? 1 : 0
    }
    // return this.contentManagementService.updateQuestion(model)
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
  fetchAllQuestions() {
    this.loading = true;
    this.QuestionList = QuestionDetails;
    this.dataSource = this.QuestionList;
    this.loading = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Object.assign(this.tableParams, this.form.value);
    // this.contentManagementService.getAllQuestions(this.tableParams)
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
    const dialogref = this.dilog.open(AddEditContentManagementComponent, {
      disableClose: true,
      autoFocus: false,
      width: '600px',
      data: {
        questionId: Id,
        IsReadOnly: IsReadOnly
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllQuestions();
        }
      },
    });
  }
}

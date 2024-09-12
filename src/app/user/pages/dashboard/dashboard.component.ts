import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  id: any;
  name: any
  todayDate: any;
  todaytranscript: any;
  pendingtranscript: any;
  readytocollect: any;
  closedtranscript: any;
  underprocesstranscript: any;
  transcripts: any[] = []

  constructor(
    private datePipe: DatePipe,
    private userService: UserService
  ) { }
  ngOnInit() {

    this.id = localStorage.getItem('id');
    this.name = localStorage.getItem('name');
    this.todayDate = new Date();

  }

  getDashboardcount() {
    const role = Number(localStorage.getItem('role'));
    const d = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd'
    )

    if (role == 1 || role == 2) {
      //superadmin
      this.userService.getDashbaordCount(d).subscribe((dcount) => {
        this.todaytranscript = dcount[0].today_request;
        this.underprocesstranscript = dcount[0].underprocess_request;
        this.closedtranscript = dcount[0].complete_request;
        this.pendingtranscript = dcount[0].pending_request;
        this.readytocollect = dcount[0].readytocollect_request;

      });
    } else {
      this.userService.mygetDashbaordCount(d).subscribe((dcount) => {
        this.todaytranscript = dcount[0].today_request;
        this.underprocesstranscript = dcount[0].underprocess_request;
        this.closedtranscript = dcount[0].complete_request;
        this.pendingtranscript = dcount[0].pending_request;
        this.readytocollect = dcount[0].readytocollect_request;
      });

    }
  }

  get getDatePipe() {
    return this.datePipe;
  }


}

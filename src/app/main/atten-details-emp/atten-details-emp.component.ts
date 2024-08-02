import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AttenServiceService } from '../../services/atten-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atten-details-emp',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './atten-details-emp.component.html',
  styleUrl: './atten-details-emp.component.scss',
  providers: [DatePipe],
})
export class AttenDetailsEmpComponent implements OnInit {
  router = inject(Router);
  arouter = inject(ActivatedRoute);
  service = inject(AttenServiceService);
  toaster = inject(ToastrService);
  datePipe = inject(DatePipe);
  id!: string;
  presentDate: any;
  totalDays: any;
  availComp: any;
  weekOffArr: any = [];
  week = new FormControl('');
  Compdate = new FormControl('');

  data: any = [];
  currentComp: any = [];
  today: any;
  oldDateLastMon: any;
  showAddComp: boolean = false;
  showDedComp: boolean = false;
  compDateStatus: any = [];
  currentMonth: any;
  timeForm = new FormGroup({
    empId: new FormControl(''),
    date: new FormControl('', Validators.required),
    fromTime: new FormControl('', Validators.required),
    toTime: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    month: new FormControl(''),
    year: new FormControl(''),
  });
  globalMonth: any = '';
  permissionArr: any = [];
  showDlperm: boolean = false;
  dltPerm: any = [];
  @ViewChild('perm', { static: false })
  permBtn!: ElementRef;
  @ViewChild('addPerm', { static: false })
  AddpermBtn!: ElementRef;
  @ViewChild('closePerm', { static: false })
  closePermBtn!: ElementRef;
  checkmonth: any;
  changeMonth(v: any) {
    console.log(v)
    const newDate = new Date(v);
    const newDateMonth = new Date(v);
    this.checkmonth = this.datePipe.transform(newDateMonth, 'YYYY-MM');
    // if ( this.checkmonth == this.currentMonth) {
    //   this.totalDays = newDateMonth.getDate();
    // }

    let monthName = newDate.toLocaleString('default', { month: 'long' });
    this.globalMonth = monthName;
    let monthNum = newDateMonth.getMonth();

    let newMonthDate = new Date();
    newMonthDate.setMonth(monthNum);
    let year = newDateMonth.getFullYear();

    this.checkmonth == this.currentMonth
      ? (this.totalDays = newMonthDate.getDate())
      : (this.totalDays = new Date(year, monthNum +1, 0).getDate());
    console.log(
      monthName,
      'total days',
      this.totalDays,
      newMonthDate,
      newMonthDate.getDate(),
      'month num',
      monthNum
    );
    this.getDetails(this.globalMonth);
    this.getPermission();
    console.log(this.checkmonth !== this.currentMonth, 'month check');
  }
  ngOnInit(): void {
    this.arouter.queryParams.subscribe((res: any) => {
      this.id = res.id;
    });
    console.log(this.id);
    var currentDate = new Date();
    this.totalDays = currentDate.getDate();
    this.currentMonth = this.datePipe.transform(currentDate, 'YYYY-MM');
    let monthName = currentDate.toLocaleString('default', { month: 'long' });
    this.globalMonth = monthName;
    this.checkmonth = this.currentMonth;
    console.log(
      this.checkmonth,
      this.currentMonth,
      this.checkmonth !== this.currentMonth,
      'month check'
    );

    // let newDate = currentDate.toLocaleDateString().split('/');

    // this.today =
    //   newDate[2] +
    //   '-' +
    //   this.addZero(newDate[0]) +
    //   '-' +
    //   this.addZero(newDate[1]);
    this.getDetails(this.globalMonth);
    this.getLastDayOfPreviousMonth();
    this.getPermission();
    //  this.getWeekoff()
  }
  getDetails(month: any) {
    let data = {
      month: month,
    };
    this.service.attenDetailForEmployee(this.id, data).subscribe((res: any) => {
      console.log(res);
      this.data = res[0];
      this.availComp = res.compOff;
      this.presentDate =
        this.totalDays -
        this.data.LOP -
        this.data.casualLeave -
        this.data.sickleave -
        this.data.holiday -
        this.data.Weekoffleave;
      console.log(this.presentDate, 'present date', this.totalDays);
      if (this.data.Weekoffleave > 0 || this.data.holiday > 0) {
        this.getWeekoff();
        this.showAddComp = true;
      }
      if (res.compOff > 0) {
        this.getCompOff();
        this.showDedComp = true;
      }
    });
  }
  getWeekoff() {
    this.service.getWeekOffById(this.id).subscribe((res: any) => {
      this.weekOffArr = res;
      console.log(res, 'weekoff');
      this.getCompOff();
    });
  }
  createComp() {
    let v = this.week.value ? this.week.value?.split('T') : [];
    let data = {
      weekOffId: v[0],
      date: v[1],
      empId: this.id,
      leavetype: v[2],
    };

    console.log(data);

    this.service.createCompOff(data).subscribe(
      (res: any) => {
        this.toaster.success('Comp Off ', 'Added Successfully !');
        this.getDetails(this.globalMonth);
      },
      (err) => {
        this.toaster.error('', err.error.message);
      }
    );
  }
  addZero(num: string): string {
    // Check if the number is below 10
    let newNum = Number(num);
    if (newNum < 10) {
      // If yes, add a leading zero and return as string
      return '0' + newNum;
    } else {
      // If not, just return the number as string
      return num.toString();
    }
  }
  getLastDayOfPreviousMonth() {
    let currentDate = new Date();
    // Set the date to the first day of the current month
    currentDate.setDate(1);
    console.log(currentDate);
    let formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.oldDateLastMon = formattedDate;
    return formattedDate;
  }
  getCompOff() {
    this.service.getCompOff(this.id).subscribe((res: any) => {
      console.log(res, 'avail comp off');
      this.currentComp = res;
    });
  }
  getStatus(date: any) {
    console.log('changeing');
    let v = date.value;
    let body = {
      id: this.id,
      date: v,
    };
    console.log(body);

    this.service.getStatusId(body).subscribe((res: any) => {
      console.log(res);
      this.compDateStatus = res[0];
    });
  }

  works() {
    console.log('works');
  }
  compId: any;
  dateChange(v: any) {
    let val = this.currentComp[v.target.value].weekOffDate;
    this.compId = this.currentComp[v.target.value]._id;
    console.log(val);
    this.oldDateLastMon = new Date();
    let nowDate = new Date(val);
    this.today = this.datePipe.transform(val, 'YYYY-MM-dd');
    this.oldDateLastMon.setDate(nowDate.getDate() + 30);
    console.log(this.oldDateLastMon, 'added date');

    // this.today = newDate[2] + '-'+ this.addZero( newDate[0]) + '-'+ this.addZero( newDate[1])
    console.log(this.today, 'today');
  }
  dedComp(getdate: any) {
    const date = new Date(getdate.value);
    let newDate = date.toLocaleDateString().split('/');
    let localDate =
      newDate[2] +
      '-' +
      this.addZero(newDate[0]) +
      '-' +
      this.addZero(newDate[1]);
    let monthName = date.toLocaleString('default', { month: 'long' });
    let data = {
      attendance: 0,
      empId: this.id,
      leavetype: 'Comp Off',
      date: localDate,
      month: monthName,
    };
    console.log(data);
    let deductData = {
      date: localDate,
    };
    this.service
      .deductCompOff(this.compId, deductData)
      .subscribe((res: any) => {
        console.log(res);
        this.getDetails(this.globalMonth);
        this.toaster.success('', 'Comp off deducted successfully!');
        if (this.compDateStatus._id) {
          this.service
            .updateAttenById(this.compDateStatus._id, [data])
            .subscribe((res: any) => {
              this.toaster.warning('', 'Attendance updated!');
            });
        } else {
          this.service.createAtten([data]).subscribe((res: any) => {
            this.toaster.success('', 'Attendance Created!');
          });
        }
      });

    // this.service.createAtten(data).subscribe((res:any)=>{

    // })
  }

  // permisson
  permStatus: any = [];
  getStatusPerm(date: any) {
    console.log('changeing');
    let v = date.value;
    this.timeForm.get('date')?.setValue(v);
    if (date.value == '') {
      this.toaster.error('', 'Select a date!');
    } else {
      let body = {
        empId: this.id,
        date: v,
      };
      console.log(body);

      this.service.getPermissionStatus(body).subscribe((res: any) => {
        console.log(res);
        // this.permStatus = res[0]
      });
    }
  }
  timeDiffr: any;
  timeDuration: any = 'Select From and To Time';
  getTime() {
    let v = this.timeForm.get('fromTime')?.value;
    let v2 = this.timeForm.get('toTime')?.value;

    if (v && v2) {
      // Assuming time values are in the format "HH:mm"
      let [hoursA, minutesA] = v.split(':').map(Number);
      let [hoursB, minutesB] = v2.split(':').map(Number);

      // Construct Date objects with today's date
      let today = new Date();
      let timeA = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hoursA,
        minutesA
      );
      let timeB = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hoursB,
        minutesB
      );

      const difference = Math.abs(timeB.getTime() - timeA.getTime());
      const hoursDiff = Math.floor(difference / (60 * 60 * 1000));
      const minutesDiff = Math.floor(
        (difference % (60 * 60 * 1000)) / (60 * 1000)
      );
      this.timeDuration = `${hoursDiff} hours and ${minutesDiff} minutes`;
      this.timeForm.get('duration')?.setValue(`${hoursDiff}:${minutesDiff}`);
    } else {
      console.error('One or both time values are null or undefined.');
    }
  }
  editPermission() {
    let date = this.timeForm.get('date')?.value;

    let newDate = new Date(date ? date : 0);
    this.timeForm.get('empId')?.setValue(this.id);
    this.timeForm.get('year')?.setValue(String(newDate.getFullYear()));
    this.timeForm
      .get('month')
      ?.setValue(String(newDate.toLocaleString('default', { month: 'long' })));

    console.log(this.timeForm.value);
    if (this.timeForm.valid) {
      this.service
        .editPermission(this.dltPerm._id, this.timeForm.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.timeForm.reset();
            this.timeDuration = 'Select From and To Time';
            // this.toaster.success('', 'Permission created successfully');
            // this.AddpermBtn.nativeElement.click();
            this.toaster.warning('', 'Permission updated successfully');
            this.getPermission();
            this.editPerm = false;
            this.AddPremBox(0)
          },
          (error) => {
            console.log(error.error.message);
            this.toaster.error('', error.error.message);
          }
        );
    }
  }
  submitPermission() {
    let date = this.timeForm.get('date')?.value;

    let newDate = new Date(date ? date : 0);
    this.timeForm.get('empId')?.setValue(this.id);
    this.timeForm.get('year')?.setValue(String(newDate.getFullYear()));
    this.timeForm
      .get('month')
      ?.setValue(String(newDate.toLocaleString('default', { month: 'long' })));

    console.log(this.timeForm.value);
    if (this.timeForm.valid) {
      this.service.createPermission(this.timeForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.timeForm.reset();
          this.timeDuration = 'Select From and To Time';
          this.toaster.success('', 'Permission created successfully');

          this.AddPremBox(0)
          this.getPermission();
        },
        (error) => {
          console.log(error.error.message);
          this.toaster.error('', error.error.message);
        }
      );
    } else {
      this.toaster.error('', 'Form is invalid!');
    }
  }
  getPermission() {
    let data = {
      month: this.globalMonth,
      empId: this.id,
    };
    this.service.getAllPermission(data).subscribe((res: any) => {
      console.log(res, 'permission');
      this.permissionArr = res;
    });
  }

  assignPerm(v: any) {
    this.dltPerm = v;
  }
  editPerm: boolean = false;
  assignPermEdit(v: any) {
    this.editPerm = true;
    this.dltPerm = v;
    console.log('clicked');

    this.timeForm.patchValue(v);
    this.getTime();
    this.AddPremBox(1)
    
  }
  closePrem() {
    this.permBtn.nativeElement.click();
  }
  AddPremBox(val: number) {
    val == 0
      ? this.closePermBtn.nativeElement.click()
      : this.AddpermBtn.nativeElement.click();
  }

  dltperm() {
    this.service.deletePermission(this.dltPerm._id).subscribe((res: any) => {
      this.toaster.error('', 'Deleted Permission');
      console.log(res);
      this.closePrem();
      this.getPermission();
      this.dltPerm = [];
    });
  }
  openPerm() {
    this.timeForm.reset();
    this.editPerm = false;
    this.timeDuration = 'Select From and To Time';
    this.AddPremBox(1)
  }
}

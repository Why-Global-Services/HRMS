import { Component, OnInit, inject } from '@angular/core';
import { roles } from '../../environtment';
import { CommonModule, DatePipe } from '@angular/common';
import { AttenServiceService } from '../../services/atten-service.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, DatePipe,RouterModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
  providers: [DatePipe]
})
export class AttendanceComponent implements OnInit {
  service = inject(AttenServiceService);
  allEmp: any = [];
  name: any = '';
  dep: any = '';
  newToday = new Date();
  date: any ;
  sendData: any = [];
  globalAtten: any;
  nextDay:any
  toaster = inject(ToastrService)
  datePipe = inject(DatePipe)
  ngOnInit(): void {
    const currentDate = new Date();
    var nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    this.nextDay = nextDate.toISOString().split('T')[0];
    let newDate = currentDate.toLocaleDateString().split("/")
  
    this.today = newDate[2] + '-'+ this.addZero( newDate[0]) + '-'+ this.addZero( newDate[1])
    console.log('next day',this.nextDay,'today',this.today)
    this.date =this.datePipe.transform(this.newToday,'YYYY-MM-dd')
    this.getAll();
    // this.getLastDayOfPreviousMonth()
  }

  GattenArr = [
    'Late',
    'Week off',
    'Casual Leave',
    'Sick Leave',
    'Absent',
    'Half day',
    'Holiday',
    'Work from home'
  ];
  attenArr = [
    'Late',
    'Week off',
    'Casual Leave',
    'Sick Leave',
    'Absent',
    'Holiday',
    'Half day',
    'Work from home',
    'Present',
  ];
  roles = roles.all;
  today: any;

  depChange(v: any) {
    this.dep = v.target.value;
    this.getAll();
  }
  dateChange(v: any) {
    // let cDate = new Date(v.value,'dd-MM-yyyy')
    // let date = this.datePipe.transform(v.value,'dd-MM-yyyy')
    console.log(v.value);
    this.date = v.value;
    this.getAll();
  }
  searchName(v: any) {
    this.name = v.value;
    this.getAll();
  }
  getAll() {
    this.service
      .getAllEmployees(this.dep, this.name, this.date)
      .subscribe((res: any) => {
        console.log(res);
        this.allEmp = res;
      });
  }
  changeGlobal(v: any) {
    this.sendData = [];
    console.log(this.sendData);

    this.globalAtten = v.target.value;
  }
  checkTheBox(v: any) {
    console.log(v.target.checked, v.target.value);
    let val = v.target.value;
    let index = this.sendData.findIndex((data: any) => {
      console.log(data.empId, val);
      return data.empId == val;
    });
    let newAtten = 0;
    if (v.target.checked) {
      if (index > 0) {
      } else {
        switch (this.globalAtten) {
          case 'Casual Leave' || 'Sick Leave' || 'Absent':
            newAtten = 1;
            break;
          case 'Half day':
            newAtten = 0.5;
            break;
        }
        console.log(this.date)
        const date = new Date();
        let newDate = date.toLocaleDateString().split("/")
        let localDate = newDate[2] + '-'+ this.addZero( newDate[0]) + '-'+ this.addZero( newDate[1])
        let monthName = date.toLocaleString('default', { month: 'long' });
        let yearName = date.getFullYear()
        let data = {
          attendance: newAtten,
          empId: val,
          leavetype: this.globalAtten,
          date: this.date,
          month:monthName,
          year:yearName
        };
        this.sendData.push(data);
      }
    } else {
      this.sendData.splice(index, 1);
    }
    console.log(this.sendData);
  }
  isChecked(v: any): boolean {
    let val = v;
    let index = this.sendData.findIndex((data: any) => {
      //  console.log(data._id, val,data._id == val);
      return data.empId == val;
    });
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
  submitAtten() {
    console.log(this.sendData.length);
    if (this.sendData.length > 0) {
      this.service.createAtten(this.sendData).subscribe((res: any) => {
        console.log(res,'created and submitted');
        this.toaster.success('','Attendance Created successfully')
        this.sendData = [];
        this.getAll();
      });
    }
  }
  // datePipe = inject(DatePipe)

  oneAtten(id:any,v:any){
    this.sendData=[]
    let newAtten =0
    let val = v.target.value
    switch (val) {
      case 'Casual Leave':
        newAtten = 1;
        break;
      case 'Half day':
        newAtten = 0.5;
        break;
      case 'Sick Leave':
        newAtten = 1;
        break;
      case 'Absent':
        newAtten = 1;
        break;
    }
    const date = this.date ? new Date(this.date)  :new Date()

    console.log('this is date',date,this.date);
    
    // let localDate = date.toISOString().split('T')[0];
    let newDate = date
    let localDate = this.datePipe.transform(newDate,'YYYY-dd-MM')
    // let localDate = newDate[2] + '-'+ this.addZero( newDate[0]) + '-'+ this.addZero( newDate[1])
    console.log('send date',date,localDate,'new date',newDate);
    let monthName = date.toLocaleString('default', { month: 'long' });
    let yearName = date.getFullYear()
    let data = {
      attendance: newAtten,
      empId: id,
      leavetype:val,
      date: this.date,
      month:monthName,
      year:yearName
    }
    console.log(data,'data');
    
    let index = this.allEmp.findIndex((v:any)=>{  
      return v._id === id
    })
   
     this.sendData.push(data);
     console.log(index,"this is index")
     console.log(data,this.allEmp[index].attendanceId,typeof this.allEmp[index].attendanceId , "undefined")
     if( this.allEmp[index].attendanceId ){
       this.updateAtten(this.allEmp[index].attendanceId)
      console.log('try to update')
     }else{
      console.log("try to submit");
      
       this.submitAtten()
     }



  }
  updateAtten(id:any){
    this.service.updateAttenById(id,this.sendData).subscribe((res:any)=>{
      console.log(res,'updated')
      this.toaster.warning('','Attendance updated successfully')
      this.sendData = [];
      this.getAll();
    })
  }
  enableEdit(id:any){
    let index = this.allEmp.findIndex((v:any)=>{
      // console.log(v._id, id);
      
      return v._id === id
    })
    console.log(index)
    this.allEmp[index].attendanceId = undefined
  }
  addZero(num: string): string {
    // Check if the number is below 10
    let newNum = Number(num)
    if (newNum < 10) {
      // If yes, add a leading zero and return as string
      return '0' + newNum;
    } else {
      // If not, just return the number as string
      return num.toString();
    }
  }
  // getLastDayOfPreviousMonth() {
  //   let currentDate = new Date();
  //   // Go to previous month
  //   currentDate.setMonth(currentDate.getMonth() - 1);
  //   // Set the date to the last day of the previous month
  //   currentDate.setDate(0);
  //   // Format the date to display
  //   let formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  //   console.log(formattedDate);
  //   return formattedDate;
  // }
}

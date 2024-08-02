import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { DashboardComponent } from '../../parts/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AttenServiceService } from '../../services/atten-service.service';
import { roles } from '../../environtment';

@Component({
  selector: 'app-payslip-home',
  standalone: true,
  imports: [DashboardComponent,RouterModule,CommonModule],
  templateUrl: './payslip-home.component.html',
  styleUrl: './payslip-home.component.scss',
  providers: [DatePipe]
})
export class PayslipHomeComponent implements OnInit {
  ngOnInit(): void {
    let date = new Date();
    this.currentMonth = this.datePipe.transform(date, 'YYYY-MM');
    this.monthYear = this.currentMonth
    this.month = this.datePipe.transform(this.today,"MMMM")
    console.log(this.month,'month');
   this.getAll()
   this.totalWorkingDays =  this.getLastDay(this.currentMonth)
   
  }
  datePipe = inject(DatePipe)
  service = inject(AttenServiceService)
  allEmp:any =[]
  name:any=''
  dep:any=''
  monthYear:any=''
  today = new Date()
  totalNetSalary:any;
  month:any=''
  date = this.datePipe.transform(this.today,'YYYY-dd-MM')
  roles=roles.all
  currentMonth :any
  selectedEmp:any=[]
  totalWorkingDays:any
  @ViewChild('drawer', { static: false }) drawer!:ElementRef
  searchName(v: any) {
    this.name = v.value;
    this.getAll();
  }
  depChange(v: any) {
    this.dep = v.target.value;
    this.getAll();
  }
  monthChange(v:any){
    const newDateMonth = new Date(v);
    this.totalWorkingDays =  this.getLastDay(v)
    this.monthYear = v
    let monthName = newDateMonth.toLocaleString('default', { month: 'long' });
    this.month = monthName
    this.getAll()
  }
  getAll(){
    let data ={
      month:this.month,
      name:this.name,
      dept:this.dep,
      monthYear:this.monthYear
    }
    this.service.getALlemployeePayslip(data).subscribe((res:any)=>{
      console.log(res)
      this.allEmp = res[0]
      // this.totalNetSalary = this.allEmp.all.reduce((total, employee) => {
      //   return total + employee.netSalary;
      // }, 0);
    })
  }
  calcNetSalary(totaldays :any,paydays :any,salary:any){
    return Math.round((salary/totaldays )*paydays)
  }
  grossSalary:any
  basic:any
  hra:any
  Conveyance:any
  OA:any
  esi:any
  pf:any
   getLastDay(val:any){
    const newDate = new Date(val);
    let monthName = newDate.toLocaleString('default', { month: 'long' });
    let getMonth = monthName;
    let checkDate = new Date()
    let newMonthName = checkDate.toLocaleString('default', { month: 'long' });
  
    let totalDays
    let monthNum = newDate.getMonth();
    let newDatefMonth = new Date();
    newDatefMonth.setMonth(monthNum);
    console.log(  newDate,newMonthName , getMonth,monthNum)
    let year = newDate.getFullYear();
   
     totalDays = new Date(year, monthNum+1, 0).getDate()
    return totalDays
  }
  viewPayslip(val:any){
    this.drawer.nativeElement.click()
    this.selectedEmp = val
    console.log(val,'val',this.totalWorkingDays);
    
    this.grossSalary = Math.round((val.grossSalary/this.totalWorkingDays) * val.PayDay) 
    this.basic = Math.round( (this.grossSalary/ 100) *40) 
    this.hra = Math.round((this.basic /100) * 75)  
    this.Conveyance = Math.round((this.grossSalary /100)*10)  
    this.OA = Math.round( this.grossSalary - (this.basic + this.Conveyance)) 
    let pfWages = Math.round(this.basic + this.hra)  
    this.pf = Math.round( pfWages /100 * 12) 
    this.esi = Math.round(this.grossSalary /100 * 0.75)  

    
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { DashboardComponent } from '../../parts/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { roles } from '../../environtment';
import { AttenServiceService } from '../../services/atten-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mangage-employee',
  standalone: true,
  imports: [DashboardComponent,RouterModule],
  templateUrl: './mangage-employee.component.html',
  styleUrl: './mangage-employee.component.scss',
  providers: [DatePipe]
})
export class MangageEmployeeComponent implements OnInit {
  datePipe = inject(DatePipe)
  service = inject(AttenServiceService)
  allEmp:any =[]
  name:any=''
  dep:any=''
  today = new Date()
  date = this.datePipe.transform(this.today,'YYYY-dd-MM')
  ngOnInit(): void {
   this.getAll()
  }
  roles=roles.all
  searchName(v: any) {
    this.name = v.value;
    this.getAll();
  }
  depChange(v: any) {
    this.dep = v.target.value;
    this.getAll();
  }
  getAll(){
    this.service.getAllEmployees(this.dep,this.name,this.date).subscribe((res:any)=>{
      console.log(res)
      this.allEmp = res
    })
  }
}

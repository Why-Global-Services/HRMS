import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AttenServiceService } from '../../services/atten-service.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss'
})
export class ViewEmployeeComponent implements OnInit {
  service = inject(AttenServiceService)
  arouter = inject(ActivatedRoute)
  id:any
  data:any=[]
  ngOnInit(): void {
    this.arouter.queryParams.subscribe((res:any)=>{
      this.id = res.id
    })
    console.log(this.id,'id')
    this.getEmployee()
  }
  getEmployee(){
    this.service.getEmployeeById(this.id).subscribe((res:any)=>{
      console.log(res)
      this.data = res
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AttenServiceService } from '../../services/atten-service.service';
import { Base, roles } from '../../environtment';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { panValidator } from '../../shared/pan-validator';
import { uniqueValidator } from '../../shared/unique-validator';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  ngOnInit(): void {
    this.arouter.queryParams.subscribe((res: any) => {
      this.id = res.id;
    });
    if (this.id) {
      this.getEmployee();
    }
  }
  private fb = inject(FormBuilder);
  http = inject(HttpClient);
  toaster = inject(ToastrService);
  service = inject(AttenServiceService);
  arouter = inject(ActivatedRoute);
  router = inject(Router);

  @ViewChild('dep') departmentSelect: any;
  @ViewChild('gen') genSelect: any;
  @ViewChild('rel') relSelect: any;

  baseUrl = Base.api;
  roles = roles.all;
  id: any;
  data: any = [];
  NumSame: boolean = false;
  emailSame: boolean = false;
  //  constructor(private service:AttenServiceService){}
  public form = this.fb.group({
    empName: new FormControl('', Validators.required),
    empId: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    dataOfBirth: new FormControl('', Validators.required),
    dateOfJoining: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    head: new FormControl('', Validators.required),
    aadharNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(12),
    ]),
    panNo: new FormControl('', [Validators.required, panValidator()]),
    address: new FormControl('', Validators.required),
    currentAddress: new FormControl('', Validators.required),
    profEmail: new FormControl('', [Validators.required, Validators.email]),
    alternatePhone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    alternateName: new FormControl('', Validators.required),
    alternateRelation: new FormControl('', Validators.required),
    grossSalary: new FormControl(0, Validators.required),
  });
  // createEmployee(body:any){
  //   return this.http.post(this.baseUrl +'/v1/employer',body)
  //  }
  genderChange(v: any) {
    let value = v.target.value;
    this.form.get('gender')?.setValue(value);
  }
  relationChange(v: any) {
    let value = v.target.value;
    this.form.get('alternateRelation')?.setValue(value);
  }
  depChange(v: any) {
    let value = v.target.value;
    this.form.get('department')?.setValue(value);
  }
  getEmployee() {
    this.service.getEmployeeById(this.id).subscribe((res: any) => {
      console.log(res);
      this.data = res;
      this.departmentSelect.nativeElement.value = this.data.department;
      this.genSelect.nativeElement.value = this.data.gender;
      this.relSelect.nativeElement.value = this.data.alternateRelation;
      this.form.patchValue({
        empName: this.data.empName,
        empId: this.data.empId,
        gender: this.data.gender,
        head: this.data.head,
        designation: this.data.designation,
        department: this.data.department,
        dateOfJoining: this.data.dateOfJoining,
        dataOfBirth: this.data.dataOfBirth,
        phone: this.data.phone,
        email: this.data.email,
        aadharNo: this.data.aadharNo,
        panNo: this.data.panNo,
        address: this.data.address,
        currentAddress: this.data.currentAddress,
        profEmail: this.data.profEmail,
        alternatePhone: this.data.alternatePhone,
        alternateName: this.data.alternateName,
        grossSalary:this.data.grossSalary,
        alternateRelation: this.data.alternateRelation,
      });
    });
  }
  updateEmp() {
    console.log(this.form.value);
    if (
      this.form.get('phone')?.value == this.form.get('alternatePhone')?.value &&
      this.form.get('phone')?.value &&
      this.form.get('alternatePhone')?.value
    ) {
      this.NumSame = true;
      this.toaster.error('', 'Mobile number should not be same');
    } else this.NumSame = false;
    if (
      this.form.get('email')?.value == this.form.get('profEmail')?.value &&
      this.form.get('email')?.value &&
      this.form.get('profEmail')?.value
    ) {
      this.emailSame = true;
      this.toaster.error('', 'Email should not be same');
    } else this.emailSame = false;
    console.log(this.NumSame, 'num', this.emailSame, 'email');
    console.log(this.form.value);
    if (this.form.valid && !this.NumSame && !this.emailSame) {
      this.service.editEmployee(this.id, this.form.value).subscribe(
        (res: any) => {
          this.toaster.success('', 'Updated successfully');
          this.departmentSelect.nativeElement.value = 'Department';
          this.relSelect.nativeElement.value = 'Relation';
          this.genSelect.nativeElement.value = 'Gender';
          this.form.reset();
          this.router.navigateByUrl(
            '/dashboard/manage-employee/view?id=' + this.id
          );
        },
        (err) => {
          this.toaster.error('', err.error.message);
          console.log(err.error.message);
        }
      );
    }
  }
  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.toUpperCase();
    this.form.get('panNo')?.patchValue(inputValue, { emitEvent: false });
  }

  submitEmp() {
    console.log(this.form.value);
    if (
      this.form.get('phone')?.value == this.form.get('alternatePhone')?.value &&
      this.form.get('phone')?.value &&
      this.form.get('alternatePhone')?.value
    ) {
      this.NumSame = true;
      this.toaster.error('', 'Mobile number should not be same');
    } else this.NumSame = false;
    if (
      this.form.get('email')?.value == this.form.get('profEmail')?.value &&
      this.form.get('email')?.value &&
      this.form.get('profEmail')?.value
    ) {
      this.emailSame = true;
      this.toaster.error('', 'Email should not be same');
    } else this.emailSame = false;
    console.log(this.NumSame, 'num', this.emailSame, 'email');

    if (this.form.valid && !this.NumSame && !this.emailSame) {
      this.service.createEmployee(this.form.value).subscribe(
        (res: any) => {
          console.log(res, 'submitted successfully');
          this.toaster.success('', 'Submitted successfully');
          this.departmentSelect.nativeElement.value = 'Department';
          this.genSelect.nativeElement.value = 'Gender';
          this.relSelect.nativeElement.value = 'Relation';
          this.form.reset();
        },
        (err) => {
          this.toaster.error('', err.error.message);
          console.log(err.error.message);
        }
      );
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Base } from '../environtment';

@Injectable({
  providedIn: 'root'
})
export class AttenServiceService {
  http = inject(HttpClient)
  baseUrl = Base.api
  // constructor(  private http : HttpClient) { }
  login(body:any){
    return this.http.post(this.baseUrl + '/v1/auth/login', body)
  }
  createEmployee(body:any){
   return this.http.post(this.baseUrl +'/v1/employer',body)
  }

  getAllEmployees(dep:any,name:any,date:any){
    let changeDep= dep.toLocaleString()
    return this.http.get(this.baseUrl+`/v1/employer/get/all?dept=${changeDep}&name=${name}&date=${date}`)
  }
  getAllEmployeesAtten(dep:any,name:any,date:any,atten:any){
    let changeDep= dep.toLocaleString()
    return this.http.get(this.baseUrl+`/v1/employer/get/atten/?dept=${changeDep}&name=${name}&date=${date}&atten=${atten}`)
  }
  createAtten(body:any){
    return this.http.post(this.baseUrl+'/v1/employer/attendanceAll',body)
  }
  updateAttenById(id:any,body:any){
    return this.http.put(this.baseUrl+'/v1/employer/attendance/'+id,body[0])
  }
  editEmployee(id:any,body:any){
    return this.http.put(this.baseUrl+'/v1/employer/'+id,body)
  }
  getEmployeeById(id:any){
    return this.http.get(this.baseUrl+'/v1/employer/single/'+id)
  }
  attenDetailForEmployee(id:any,body:any){
    return this.http.post(this.baseUrl+'/v1/employer/get/atten/id/'+id,body)
  }
  getHomeDash(){
    return this.http.get(this.baseUrl+'/v1/employer/gettoday/report/counts')
  }
  getWeekOffById(Empid:any){
    return this.http.get(this.baseUrl+'/v1/employer/get/weekOff?id='+Empid)
  }
  createCompOff(body:any){
    return this.http.post(this.baseUrl+'/v1/employer/compoff',body)
  }
  getCompOff(empId:any){
    return this.http.get(this.baseUrl+'/v1/employer/getCompOff/'+empId)
  }
  deductCompOff(empId:any,body:any){
    return this.http.put(this.baseUrl+'/v1/employer/compoff/'+empId,body)
  }
  getStatusId(body:any){
    return this.http.post(this.baseUrl+'/v1/employer/get/status',body)
  }
  createPermission(body:any){
    return this.http.post(this.baseUrl+'/v1/employer/create/permission',body)
  }
  getPermissionStatus(body:any){
    return this.http.post(this.baseUrl+'/v1/employer/get/permissionStatus',body)
  }
  getAllPermission(body:any){
    return this.http.post(this.baseUrl+'/v1/employer/get/permission',body)
  }
  editPermission(id:any,body:any){
    return this.http.put(this.baseUrl+'/v1/employer/update/permission/'+id,body)
  }
  deletePermission(id:any){
    return this.http.delete(this.baseUrl+'/v1/employer/delete/permission/'+id)
  }
  //payslip
  getALlemployeePayslip(data:any){
    return this.http.post(this.baseUrl+'/v1/employer/get/payslip/all',data)
  }
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

export const sendHomeGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let toaster = inject(ToastrService)
  let token = Cookie.get('hrmsT')
  console.log(token,'dsfs')
  if(token){
    router.navigateByUrl('/dashboard/home')
    return true
  }else{
    toaster.error(token,'Please Login now!')
    router.navigateByUrl('/')
    return false
  }
};

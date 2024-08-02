import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

export const checkTokenGuard: CanActivateFn = (route, state) => {
  
  let router = inject(Router)
  let toaster = inject(ToastrService)
  let token = Cookie.get('hrmsT')
  if(token){
    return true
  }else{
    // console.log(token)
    toaster.error('','Please Login!')
    router.navigateByUrl('/')
    return false
  }
};

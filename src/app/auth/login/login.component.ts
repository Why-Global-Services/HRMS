import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AttenServiceService } from '../../services/atten-service.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  service = inject(AttenServiceService);
  router = inject(Router);
  toaster = inject(ToastrService)
  submitted: boolean = false;

  form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  login() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.login(this.form.value).subscribe(
        (res: any) => {
          this.submitted = false;
          console.log(res.tokens.access.token,res.tokens.access.expires);
          Cookie.set('hrmsT', res.tokens.access.token,1);
           this.router.navigateByUrl('/dashboard/home')
          console.log(res);
        },
        (err) => {
          this.submitted = false
          this.toaster.error('',err.error.message)
          console.log(err.error.message);
        }
      );
    }
  }
}

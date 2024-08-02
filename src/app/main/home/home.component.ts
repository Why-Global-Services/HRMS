import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../parts/dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,DashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  router = inject(Router)
  ngOnInit(): void {
  // this.router.navigateByUrl('/dashboard/home');
  }

}

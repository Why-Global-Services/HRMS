import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  ngOnInit(): void {
    this.service.isloadingnow.subscribe((e: any) => {
      this.showLoader = e;
      // this.cdref.detectChanges();
      //  console.log(e);
      //  alert(e);
    });
  }
  showLoader:boolean = false;
  service = inject(LoaderService)


}

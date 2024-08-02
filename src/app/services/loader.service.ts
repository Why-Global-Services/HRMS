import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingCount = 0;

  public show(): void {
    this.loadingCount++;
    this.isloadingnow.next(true);
    console.log(this.loadingCount);
  }

  public hide(): void {
    if (this.loadingCount > 0) {
      this.loadingCount--;
      console.log(this.loadingCount);
    }
    if (this.loadingCount == 0) {
      this.isloadingnow.next(false);
    }
  }
  isloadingnow :any= new BehaviorSubject(false);
}

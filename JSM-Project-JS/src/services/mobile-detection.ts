import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileDetectionService {
  private mobile = new BehaviorSubject<boolean>(false);
  isMobile = this.mobile.asObservable();



  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.mobile.next(window.innerWidth < 768);
    alert("resize")
  }
}

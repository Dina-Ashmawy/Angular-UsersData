import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    screenWidth: number = 0;
    isMobile: boolean = false;
    isTablet: boolean = false;

    checkDeviceWidth() {
        this.screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if(this.screenWidth < 768) {
          this.isMobile = true;
          this.isTablet = false;
        }
        else if(this.screenWidth < 1024) {
          this.isMobile = false;
          this.isTablet = true;
        }
        else {
          this.isMobile = false;
          this.isTablet = false;
        }
    }
}

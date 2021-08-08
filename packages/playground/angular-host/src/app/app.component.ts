import {Component, AfterViewInit, OnInit, ViewChild, ElementRef} from '@angular/core';
import {newInstance} from "@convodroid/bfrwebchat-core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild('WCRoot') WCRoot: ElementRef<HTMLDivElement> | undefined;

  title = 'angular-host';
  CWC = newInstance();

  ngOnInit() {
    this.CWC.Middlewares.DirectlineMWR.Config.secret = prompt('Enter Directline [angular-host]:');
  }

  ngAfterViewInit() {
    if (this.WCRoot){
      this.CWC.bootstrap({Element: this.WCRoot.nativeElement});
    }
  }

}

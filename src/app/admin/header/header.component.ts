import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFortcel = true;
  showAnalogit = false;
  showForm = false;
  showList = true;
  expand = false;
  
  constructor() { }

  ngOnInit(): void {
  }
  onResize(event:any) {
    if (window.innerWidth <= 768) {
      this.expand = false;
    }
  }

}

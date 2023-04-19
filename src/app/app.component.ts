import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.adjustSearchPosition();
  }

  ngOnInit(): void {}

  adjustSearchPosition() {
    const headerSearch = document.getElementById('headerSearch')!;
    const searchHeight = getComputedStyle(headerSearch).height;
    headerSearch.style.marginBottom = `-${parseInt(searchHeight) / 2}px`;
  }
}

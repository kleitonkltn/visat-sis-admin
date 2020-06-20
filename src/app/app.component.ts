import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  href: string;

  ngAfterViewInit() {
    // tslint:disable-next-line: no-shadowed-variable
    (($) => {
      'use strict';
      const path = window.location.href;
      $('#layoutSidenav_nav .sb-sidenav a.nav-link').each(() => {
        if (this.href === path) {
          $(this).addClass('active');
        }
      });

      $('#sidebarToggle').on('click', (e: any) => {
        e.preventDefault();
        $('body').toggleClass('sb-sidenav-toggled');
      });
    })($);
    // tslint:disable-next-line: deprecation

  }
}

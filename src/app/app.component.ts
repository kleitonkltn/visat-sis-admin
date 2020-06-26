import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { setTheme } from 'ngx-bootstrap/utils';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  href: string;
  loginMode = false;
  constructor(private router: Router, private authService: AuthService) {

  }
  ngOnInit() {
    this.verifyLogin()
  }

  verifyLogin() {
    this.loginMode = !this.authService.isAuthenticated();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        if (event['url'] === '/login' && this.loginMode === false) {
          this.router.navigateByUrl('/');
        }
      });
  }
  ngAfterViewInit() {
    (() => {
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
    })();
  }
}

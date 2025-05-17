import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { GlobalService } from '../_services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.globalService.eraseCredentials();
    this.globalService.clearRecords();
    this.router.navigate(['']);
  }
}

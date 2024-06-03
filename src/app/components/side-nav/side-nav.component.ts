import { AfterContentInit, Component, EventEmitter, Output } from '@angular/core';
import { loginAuthService } from '../../services/login-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements AfterContentInit {
  // isPersonalInfo: boolean = true;
  @Output() perAndConInfoEvent = new EventEmitter<Boolean>();
  // @Output() cInfoEvent = new EventEmitter<Boolean>();

  constructor(
    private authService: loginAuthService,
    private router: Router,
  ) {}

  ngAfterContentInit(): void {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        menuItems.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  pInfoShow() {
    this.perAndConInfoEvent.emit(true)
    // this.isPersonalInfo = true;
  }
  cInfoShow() {
    this.perAndConInfoEvent.emit(false)
    // this.isPersonalInfo = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

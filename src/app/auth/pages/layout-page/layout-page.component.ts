import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.sercive';
import { User } from '../../Interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado',   icons: 'label', url: './list' },
    { label: 'Añadir',    icons: 'add',   url: './new-hero' },
    { label: 'Buscar',   icons: 'search', url: './search' },
  ];

  constructor(
    private AuthService: AuthService,
    private router: Router
    ) {}

  get user(): User | undefined{
    return this.AuthService.currentUser;
  }

  onLogout() {
    this.AuthService.logout();
    this.router.navigate(['/auth/login'])
  }
}

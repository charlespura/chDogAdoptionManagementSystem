import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  template: `
    <div class="shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">PawAdopt</p>
          <h1>Dog Adoption Management System</h1>
        </div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/dogs" routerLinkActive="active">Dogs</a>
          <a *ngIf="isAdmin()" routerLink="/admin/dogs" routerLinkActive="active">Admin Dogs</a>
          <a *ngIf="isAdmin()" routerLink="/admin/applications" routerLinkActive="active">Applications</a>
          <a *ngIf="!auth.user()" routerLink="/login" routerLinkActive="active">Login</a>
          <a *ngIf="!auth.user()" routerLink="/register" routerLinkActive="active">Register</a>
          <button *ngIf="auth.user()" class="ghost" (click)="logout()">Logout</button>
        </nav>
      </header>

      <main class="page">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly isAdmin = computed(() => this.auth.user()?.role === 'admin');

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}

import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService, AuthUser } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <section class="panel auth-panel">
      <div>
        <p class="eyebrow">Welcome back</p>
        <h2>Login</h2>
        <p class="muted">Use the seeded admin account or create a user account.</p>
      </div>

      <form class="form-grid" (ngSubmit)="login()">
        <label>
          Email
          <input [(ngModel)]="email" name="email" type="email" required>
        </label>
        <label>
          Password
          <input [(ngModel)]="password" name="password" type="password" required>
        </label>
        <button type="submit">Login</button>
      </form>

      <p class="error" *ngIf="error">{{ error }}</p>
      <p class="hint">Seeded admin: <strong>admin&#64;pawadopt.local</strong> / <strong>admin123</strong></p>
    </section>
  `
})
export class LoginPageComponent {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = 'admin@pawadopt.local';
  password = 'admin123';
  error = '';

  async login(): Promise<void> {
    this.error = '';

    try {
      const query = `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
            user { id name email role }
          }
        }
      `;

      const data = await this.api.request<{ login: { token: string; user: AuthUser } }>(query, {
        input: { email: this.email, password: this.password }
      });

      this.auth.setSession(data.login.token, data.login.user);
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Login failed';
    }
  }
}

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
        <p class="eyebrow">New adopter</p>
        <h2>Create account</h2>
        <p class="muted">Register as a user and start browsing adoptable dogs.</p>
      </div>

      <form class="form-grid" (ngSubmit)="register()">
        <label>
          Name
          <input [(ngModel)]="name" name="name" required>
        </label>
        <label>
          Email
          <input [(ngModel)]="email" name="email" type="email" required>
        </label>
        <label>
          Password
          <input [(ngModel)]="password" name="password" type="password" required minlength="6">
        </label>
        <button type="submit">Register</button>
      </form>

      <p class="error" *ngIf="error">{{ error }}</p>
    </section>
  `
})
export class RegisterPageComponent {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';
  error = '';

  async register(): Promise<void> {
    this.error = '';

    try {
      const query = `
        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            token
            user { id name email role }
          }
        }
      `;

      const data = await this.api.request<{ register: { token: string; user: AuthUser } }>(query, {
        input: { name: this.name, email: this.email, password: this.password }
      });

      this.auth.setSession(data.register.token, data.register.user);
      await this.router.navigate(['/dogs']);
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Registration failed';
    }
  }
}

import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  status: string;
}

interface Application {
  id: string;
  status: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div>
        <p class="eyebrow">Adoption workflow</p>
        <h2>Manage dogs, applications, and approvals in one GraphQL system.</h2>
        <p class="muted">Users browse available dogs and apply. Admins manage listings and review applications.</p>
        <div class="hero-actions">
          <a routerLink="/dogs" class="button-link">Browse Dogs</a>
          <a *ngIf="isAdmin()" routerLink="/admin/dogs" class="button-link secondary">Open Admin Panel</a>
        </div>
      </div>
      <div class="stats-grid">
        <article class="stat-card">
          <span>Total dogs</span>
          <strong>{{ dogs.length }}</strong>
        </article>
        <article class="stat-card">
          <span>Available</span>
          <strong>{{ availableCount }}</strong>
        </article>
        <article class="stat-card">
          <span>Adopted</span>
          <strong>{{ adoptedCount }}</strong>
        </article>
        <article class="stat-card" *ngIf="isAdmin()">
          <span>Applications</span>
          <strong>{{ applications.length }}</strong>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Preview</p>
          <h3>Recently added dogs</h3>
        </div>
      </div>

      <div class="card-grid">
        <article class="dog-card compact" *ngFor="let dog of dogs.slice(0, 3)">
          <div class="dog-meta">
            <span class="tag">{{ dog.status }}</span>
            <h4>{{ dog.name }}</h4>
            <p>{{ dog.breed }} • {{ dog.age }} years • {{ dog.gender }}</p>
          </div>
        </article>
      </div>
      <p class="error" *ngIf="error">{{ error }}</p>
    </section>
  `
})
export class DashboardPageComponent {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);

  dogs: Dog[] = [];
  applications: Application[] = [];
  error = '';

  get availableCount(): number {
    return this.dogs.filter((dog) => dog.status === 'Available').length;
  }

  get adoptedCount(): number {
    return this.dogs.filter((dog) => dog.status === 'Adopted').length;
  }

  constructor() {
    void this.load();
  }

  isAdmin(): boolean {
    return this.auth.user()?.role === 'admin';
  }

  private async load(): Promise<void> {
    try {
      const dogsQuery = `query { getDogs { id name breed age gender status } }`;
      const dogsData = await this.api.request<{ getDogs: Dog[] }>(dogsQuery);
      this.dogs = dogsData.getDogs;

      if (this.isAdmin()) {
        const applicationsQuery = `query { getApplications { id status } }`;
        const applicationsData = await this.api.request<{ getApplications: Application[] }>(
          applicationsQuery,
          {},
          this.auth.token()
        );
        this.applications = applicationsData.getApplications;
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load dashboard';
    }
  }
}

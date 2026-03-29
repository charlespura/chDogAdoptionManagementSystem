import { Component, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface Application {
  id: string;
  userName: string;
  userEmail: string;
  dogName: string;
  message: string;
  status: string;
  createdAt: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  template: `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Admin</p>
          <h2>Application Management</h2>
        </div>
      </div>

      <p class="error" *ngIf="!isAdmin()">Admin access required.</p>

      <div *ngIf="isAdmin()" class="table-list">
        <article class="list-row tall" *ngFor="let application of applications">
          <div>
            <strong>{{ application.userName }}</strong>
            <p>{{ application.userEmail }} applied for <strong>{{ application.dogName }}</strong></p>
            <p class="muted">{{ application.message }}</p>
            <small>{{ application.createdAt | date:'medium' }}</small>
          </div>
          <div class="row-actions">
            <span class="tag">{{ application.status }}</span>
            <button (click)="updateStatus(application.id, 'approved')">Approve</button>
            <button class="ghost" (click)="updateStatus(application.id, 'rejected')">Reject</button>
          </div>
        </article>
      </div>

      <p class="error" *ngIf="error">{{ error }}</p>
      <p class="success" *ngIf="success">{{ success }}</p>
    </section>
  `
})
export class AdminApplicationsPageComponent {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);

  applications: Application[] = [];
  error = '';
  success = '';

  constructor() {
    void this.loadApplications();
  }

  isAdmin(): boolean {
    return this.auth.user()?.role === 'admin';
  }

  async loadApplications(): Promise<void> {
    if (!this.isAdmin()) return;

    try {
      const query = `
        query {
          getApplications {
            id userName userEmail dogName message status createdAt
          }
        }
      `;

      const data = await this.api.request<{ getApplications: Application[] }>(
        query,
        {},
        this.auth.token()
      );
      this.applications = data.getApplications;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load applications';
    }
  }

  async updateStatus(id: string, status: string): Promise<void> {
    this.error = '';
    this.success = '';

    try {
      const query = `
        mutation UpdateApplicationStatus($id: ID!, $status: String!) {
          updateApplicationStatus(id: $id, status: $status) { id status }
        }
      `;

      await this.api.request(query, { id, status }, this.auth.token());
      this.success = `Application ${status}.`;
      await this.loadApplications();
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to update status';
    }
  }
}

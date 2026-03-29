import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  status: string;
  imageUrl?: string | null;
  description?: string | null;
}

@Component({
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Available companions</p>
          <h2>Dog Listing</h2>
        </div>
        <form class="filter-row" (ngSubmit)="loadDogs()">
          <input [(ngModel)]="breedFilter" name="breedFilter" placeholder="Filter by breed">
          <select [(ngModel)]="statusFilter" name="statusFilter">
            <option value="">All statuses</option>
            <option value="Available">Available</option>
            <option value="Adopted">Adopted</option>
          </select>
          <button type="submit">Apply Filter</button>
        </form>
      </div>

      <div class="card-grid">
        <article class="dog-card" *ngFor="let dog of dogs">
          <img [src]="dog.imageUrl || fallbackImage" [alt]="dog.name">
          <div class="dog-meta">
            <div class="dog-title">
              <h3>{{ dog.name }}</h3>
              <span class="tag">{{ dog.status }}</span>
            </div>
            <p>{{ dog.breed }} • {{ dog.age }} years • {{ dog.gender }}</p>
            <p class="muted">{{ dog.description || 'Healthy, ready for a new home.' }}</p>
          </div>
          <form class="form-grid" *ngIf="canApply(dog)" (ngSubmit)="apply(dog.id)">
            <label>
              Why are you a good match?
              <textarea [(ngModel)]="messages[dog.id]" [name]="'message-' + dog.id" rows="3" required></textarea>
            </label>
            <button type="submit">Apply for Adoption</button>
          </form>
        </article>
      </div>

      <p class="error" *ngIf="error">{{ error }}</p>
      <p class="success" *ngIf="success">{{ success }}</p>
    </section>
  `
})
export class DogsPageComponent {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);

  dogs: Dog[] = [];
  messages: Record<string, string> = {};
  breedFilter = '';
  statusFilter = '';
  error = '';
  success = '';
  fallbackImage = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80';

  constructor() {
    void this.loadDogs();
  }

  canApply(dog: Dog): boolean {
    return !!this.auth.user() && this.auth.user()?.role === 'user' && dog.status === 'Available';
  }

  async loadDogs(): Promise<void> {
    this.error = '';
    const query = `
      query GetDogs($status: String, $breed: String) {
        getDogs(status: $status, breed: $breed) {
          id name breed age gender status imageUrl description
        }
      }
    `;

    try {
      const data = await this.api.request<{ getDogs: Dog[] }>(query, {
        status: this.statusFilter || null,
        breed: this.breedFilter || null
      });
      this.dogs = data.getDogs;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load dogs';
    }
  }

  async apply(dogId: string): Promise<void> {
    this.error = '';
    this.success = '';

    try {
      const query = `
        mutation Apply($input: AdoptionInput!) {
          applyAdoption(input: $input) { id status }
        }
      `;

      await this.api.request(
        query,
        { input: { dogId, message: this.messages[dogId] } },
        this.auth.token()
      );

      this.messages[dogId] = '';
      this.success = 'Application submitted successfully.';
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Application failed';
    }
  }
}

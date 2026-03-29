import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface DogForm {
  id?: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  status: string;
  imageUrl: string;
  description: string;
}

@Component({
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Admin</p>
          <h2>Dog Management</h2>
        </div>
      </div>

      <p class="error" *ngIf="!isAdmin()">Admin access required.</p>

      <div *ngIf="isAdmin()" class="admin-grid">
        <form class="form-grid panel subtle" (ngSubmit)="saveDog()">
          <h3>{{ form.id ? 'Edit Dog' : 'Add Dog' }}</h3>
          <label>
            Name
            <input [(ngModel)]="form.name" name="name" required>
          </label>
          <label>
            Breed
            <input [(ngModel)]="form.breed" name="breed" required>
          </label>
          <label>
            Age
            <input [(ngModel)]="form.age" name="age" type="number" required>
          </label>
          <label>
            Gender
            <select [(ngModel)]="form.gender" name="gender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            Status
            <select [(ngModel)]="form.status" name="status" required>
              <option value="Available">Available</option>
              <option value="Adopted">Adopted</option>
            </select>
          </label>
          <label>
            Image URL
            <input [(ngModel)]="form.imageUrl" name="imageUrl">
          </label>
          <label>
            Description
            <textarea [(ngModel)]="form.description" name="description" rows="4"></textarea>
          </label>
          <button type="submit">{{ form.id ? 'Update Dog' : 'Add Dog' }}</button>
          <button type="button" class="ghost" *ngIf="form.id" (click)="resetForm()">Cancel Edit</button>
        </form>

        <div class="panel subtle">
          <h3>Current Dogs</h3>
          <div class="table-list">
            <article class="list-row" *ngFor="let dog of dogs">
              <div>
                <strong>{{ dog.name }}</strong>
                <p>{{ dog.breed }} • {{ dog.status }}</p>
              </div>
              <div class="row-actions">
                <button class="ghost" (click)="editDog(dog)">Edit</button>
                <button class="danger" (click)="deleteDog(dog.id)">Delete</button>
              </div>
            </article>
          </div>
        </div>
      </div>

      <p class="error" *ngIf="error">{{ error }}</p>
      <p class="success" *ngIf="success">{{ success }}</p>
    </section>
  `
})
export class AdminDogsPageComponent {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);

  dogs: DogForm[] = [];
  error = '';
  success = '';
  form: DogForm = this.defaultForm();

  constructor() {
    void this.loadDogs();
  }

  isAdmin(): boolean {
    return this.auth.user()?.role === 'admin';
  }

  async loadDogs(): Promise<void> {
    if (!this.isAdmin()) return;
    const query = `query { getDogs { id name breed age gender status imageUrl description } }`;
    const data = await this.api.request<{ getDogs: DogForm[] }>(query);
    this.dogs = data.getDogs;
  }

  editDog(dog: DogForm): void {
    this.form = { ...dog, imageUrl: dog.imageUrl || '', description: dog.description || '' };
  }

  resetForm(): void {
    this.form = this.defaultForm();
  }

  async saveDog(): Promise<void> {
    this.error = '';
    this.success = '';

    try {
      if (this.form.id) {
        const query = `
          mutation UpdateDog($id: ID!, $input: DogInput!) {
            updateDog(id: $id, input: $input) { id }
          }
        `;
        await this.api.request(
          query,
          { id: this.form.id, input: this.buildInput() },
          this.auth.token()
        );
        this.success = 'Dog updated.';
      } else {
        const query = `
          mutation AddDog($input: DogInput!) {
            addDog(input: $input) { id }
          }
        `;
        await this.api.request(query, { input: this.buildInput() }, this.auth.token());
        this.success = 'Dog added.';
      }

      this.resetForm();
      await this.loadDogs();
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Save failed';
    }
  }

  async deleteDog(id?: string): Promise<void> {
    if (!id) return;

    try {
      const query = `mutation DeleteDog($id: ID!) { deleteDog(id: $id) }`;
      await this.api.request(query, { id }, this.auth.token());
      this.success = 'Dog deleted.';
      await this.loadDogs();
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Delete failed';
    }
  }

  private buildInput() {
    return {
      name: this.form.name,
      breed: this.form.breed,
      age: Number(this.form.age),
      gender: this.form.gender,
      status: this.form.status,
      imageUrl: this.form.imageUrl || null,
      description: this.form.description || null
    };
  }

  private defaultForm(): DogForm {
    return {
      name: '',
      breed: '',
      age: 1,
      gender: 'Male',
      status: 'Available',
      imageUrl: '',
      description: ''
    };
  }
}

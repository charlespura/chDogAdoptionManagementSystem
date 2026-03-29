import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function DogsPageComponent_article_19_form_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 21);
    i0.ɵɵlistener("ngSubmit", function DogsPageComponent_article_19_form_12_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const dog_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.apply(dog_r2.id)); });
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, " Why are you a good match? ");
    i0.ɵɵelementStart(3, "textarea", 22);
    i0.ɵɵtwoWayListener("ngModelChange", function DogsPageComponent_article_19_form_12_Template_textarea_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r1); const dog_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.messages[dog_r2.id], $event) || (ctx_r2.messages[dog_r2.id] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 9);
    i0.ɵɵtext(5, "Apply for Adoption");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const dog_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.messages[dog_r2.id]);
    i0.ɵɵproperty("name", "message-" + dog_r2.id);
} }
function DogsPageComponent_article_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 14);
    i0.ɵɵelement(1, "img", 15);
    i0.ɵɵelementStart(2, "div", 16)(3, "div", 17)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 18);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 19);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, DogsPageComponent_article_19_form_12_Template, 6, 2, "form", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dog_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", dog_r2.imageUrl || ctx_r2.fallbackImage, i0.ɵɵsanitizeUrl)("alt", dog_r2.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(dog_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dog_r2.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", dog_r2.breed, " \u2022 ", dog_r2.age, " years \u2022 ", dog_r2.gender, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dog_r2.description || "Healthy, ready for a new home.");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.canApply(dog_r2));
} }
function DogsPageComponent_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.error);
} }
function DogsPageComponent_p_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.success);
} }
export class DogsPageComponent {
    constructor() {
        this.api = inject(ApiService);
        this.auth = inject(AuthService);
        this.dogs = [];
        this.messages = {};
        this.breedFilter = '';
        this.statusFilter = '';
        this.error = '';
        this.success = '';
        this.fallbackImage = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80';
        void this.loadDogs();
    }
    canApply(dog) {
        return !!this.auth.user() && this.auth.user()?.role === 'user' && dog.status === 'Available';
    }
    async loadDogs() {
        this.error = '';
        const query = `
      query GetDogs($status: String, $breed: String) {
        getDogs(status: $status, breed: $breed) {
          id name breed age gender status imageUrl description
        }
      }
    `;
        try {
            const data = await this.api.request(query, {
                status: this.statusFilter || null,
                breed: this.breedFilter || null
            });
            this.dogs = data.getDogs;
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Failed to load dogs';
        }
    }
    async apply(dogId) {
        this.error = '';
        this.success = '';
        try {
            const query = `
        mutation Apply($input: AdoptionInput!) {
          applyAdoption(input: $input) { id status }
        }
      `;
            await this.api.request(query, { input: { dogId, message: this.messages[dogId] } }, this.auth.token());
            this.messages[dogId] = '';
            this.success = 'Application submitted successfully.';
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Application failed';
        }
    }
    static { this.ɵfac = function DogsPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DogsPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DogsPageComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 22, vars: 5, consts: [[1, "panel"], [1, "section-heading"], [1, "eyebrow"], [1, "filter-row", 3, "ngSubmit"], ["name", "breedFilter", "placeholder", "Filter by breed", 3, "ngModelChange", "ngModel"], ["name", "statusFilter", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "Available"], ["value", "Adopted"], ["type", "submit"], [1, "card-grid"], ["class", "dog-card", 4, "ngFor", "ngForOf"], ["class", "error", 4, "ngIf"], ["class", "success", 4, "ngIf"], [1, "dog-card"], [3, "src", "alt"], [1, "dog-meta"], [1, "dog-title"], [1, "tag"], [1, "muted"], ["class", "form-grid", 3, "ngSubmit", 4, "ngIf"], [1, "form-grid", 3, "ngSubmit"], ["rows", "3", "required", "", 3, "ngModelChange", "ngModel", "name"], [1, "error"], [1, "success"]], template: function DogsPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Available companions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h2");
            i0.ɵɵtext(6, "Dog Listing");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "form", 3);
            i0.ɵɵlistener("ngSubmit", function DogsPageComponent_Template_form_ngSubmit_7_listener() { return ctx.loadDogs(); });
            i0.ɵɵelementStart(8, "input", 4);
            i0.ɵɵtwoWayListener("ngModelChange", function DogsPageComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.breedFilter, $event) || (ctx.breedFilter = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "select", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function DogsPageComponent_Template_select_ngModelChange_9_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event); return $event; });
            i0.ɵɵelementStart(10, "option", 6);
            i0.ɵɵtext(11, "All statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "option", 7);
            i0.ɵɵtext(13, "Available");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "option", 8);
            i0.ɵɵtext(15, "Adopted");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "button", 9);
            i0.ɵɵtext(17, "Apply Filter");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "div", 10);
            i0.ɵɵtemplate(19, DogsPageComponent_article_19_Template, 13, 9, "article", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, DogsPageComponent_p_20_Template, 2, 1, "p", 12)(21, DogsPageComponent_p_21_Template, 2, 1, "p", 13);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.breedFilter);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.statusFilter);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.dogs);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.success);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, NgFor, NgIf], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DogsPageComponent, [{
        type: Component,
        args: [{
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
            }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DogsPageComponent, { className: "DogsPageComponent" }); })();
//# sourceMappingURL=dogs-page.component.js.map
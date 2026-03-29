import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
function DashboardPageComponent_a_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1, "Open Admin Panel");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_article_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 7)(1, "span");
    i0.ɵɵtext(2, "Applications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.applications.length);
} }
function DashboardPageComponent_article_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 15)(1, "div", 16)(2, "span", 17);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h4");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const dog_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(dog_r2.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dog_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", dog_r2.breed, " \u2022 ", dog_r2.age, " years \u2022 ", dog_r2.gender, "");
} }
function DashboardPageComponent_p_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
export class DashboardPageComponent {
    get availableCount() {
        return this.dogs.filter((dog) => dog.status === 'Available').length;
    }
    get adoptedCount() {
        return this.dogs.filter((dog) => dog.status === 'Adopted').length;
    }
    constructor() {
        this.api = inject(ApiService);
        this.auth = inject(AuthService);
        this.dogs = [];
        this.applications = [];
        this.error = '';
        void this.load();
    }
    isAdmin() {
        return this.auth.user()?.role === 'admin';
    }
    async load() {
        try {
            const dogsQuery = `query { getDogs { id name breed age gender status } }`;
            const dogsData = await this.api.request(dogsQuery);
            this.dogs = dogsData.getDogs;
            if (this.isAdmin()) {
                const applicationsQuery = `query { getApplications { id status } }`;
                const applicationsData = await this.api.request(applicationsQuery, {}, this.auth.token());
                this.applications = applicationsData.getApplications;
            }
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Failed to load dashboard';
        }
    }
    static { this.ɵfac = function DashboardPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPageComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 39, vars: 7, consts: [[1, "hero"], [1, "eyebrow"], [1, "muted"], [1, "hero-actions"], ["routerLink", "/dogs", 1, "button-link"], ["routerLink", "/admin/dogs", "class", "button-link secondary", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card"], ["class", "stat-card", 4, "ngIf"], [1, "panel"], [1, "section-heading"], [1, "card-grid"], ["class", "dog-card compact", 4, "ngFor", "ngForOf"], ["class", "error", 4, "ngIf"], ["routerLink", "/admin/dogs", 1, "button-link", "secondary"], [1, "dog-card", "compact"], [1, "dog-meta"], [1, "tag"], [1, "error"]], template: function DashboardPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3, "Adoption workflow");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h2");
            i0.ɵɵtext(5, "Manage dogs, applications, and approvals in one GraphQL system.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 2);
            i0.ɵɵtext(7, "Users browse available dogs and apply. Admins manage listings and review applications.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 3)(9, "a", 4);
            i0.ɵɵtext(10, "Browse Dogs");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, DashboardPageComponent_a_11_Template, 2, 0, "a", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 6)(13, "article", 7)(14, "span");
            i0.ɵɵtext(15, "Total dogs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "strong");
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "article", 7)(19, "span");
            i0.ɵɵtext(20, "Available");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "strong");
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "article", 7)(24, "span");
            i0.ɵɵtext(25, "Adopted");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "strong");
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(28, DashboardPageComponent_article_28_Template, 5, 1, "article", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "section", 9)(30, "div", 10)(31, "div")(32, "p", 1);
            i0.ɵɵtext(33, "Preview");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "h3");
            i0.ɵɵtext(35, "Recently added dogs");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(36, "div", 11);
            i0.ɵɵtemplate(37, DashboardPageComponent_article_37_Template, 8, 5, "article", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(38, DashboardPageComponent_p_38_Template, 2, 1, "p", 13);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngIf", ctx.isAdmin());
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.dogs.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.availableCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.adoptedCount);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isAdmin());
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngForOf", ctx.dogs.slice(0, 3));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
        } }, dependencies: [NgFor, NgIf, RouterLink], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPageComponent, [{
        type: Component,
        args: [{
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
            }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPageComponent, { className: "DashboardPageComponent" }); })();
//# sourceMappingURL=dashboard-page.component.js.map
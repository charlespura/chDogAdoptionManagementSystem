import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';
import * as i0 from "@angular/core";
function AppComponent_a_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 11);
    i0.ɵɵtext(1, "Admin Dogs");
    i0.ɵɵelementEnd();
} }
function AppComponent_a_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵtext(1, "Applications");
    i0.ɵɵelementEnd();
} }
function AppComponent_a_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 13);
    i0.ɵɵtext(1, "Login");
    i0.ɵɵelementEnd();
} }
function AppComponent_a_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1, "Register");
    i0.ɵɵelementEnd();
} }
function AppComponent_button_16_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function AppComponent_button_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵtext(1, "Logout");
    i0.ɵɵelementEnd();
} }
export class AppComponent {
    constructor() {
        this.auth = inject(AuthService);
        this.router = inject(Router);
        this.isAdmin = computed(() => this.auth.user()?.role === 'admin');
    }
    logout() {
        this.auth.logout();
        void this.router.navigate(['/login']);
    }
    static { this.ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 19, vars: 5, consts: [[1, "shell"], [1, "topbar"], [1, "eyebrow"], ["routerLink", "/dashboard", "routerLinkActive", "active"], ["routerLink", "/dogs", "routerLinkActive", "active"], ["routerLink", "/admin/dogs", "routerLinkActive", "active", 4, "ngIf"], ["routerLink", "/admin/applications", "routerLinkActive", "active", 4, "ngIf"], ["routerLink", "/login", "routerLinkActive", "active", 4, "ngIf"], ["routerLink", "/register", "routerLinkActive", "active", 4, "ngIf"], ["class", "ghost", 3, "click", 4, "ngIf"], [1, "page"], ["routerLink", "/admin/dogs", "routerLinkActive", "active"], ["routerLink", "/admin/applications", "routerLinkActive", "active"], ["routerLink", "/login", "routerLinkActive", "active"], ["routerLink", "/register", "routerLinkActive", "active"], [1, "ghost", 3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "PawAdopt");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Dog Adoption Management System");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "nav")(8, "a", 3);
            i0.ɵɵtext(9, "Dashboard");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "a", 4);
            i0.ɵɵtext(11, "Dogs");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(12, AppComponent_a_12_Template, 2, 0, "a", 5)(13, AppComponent_a_13_Template, 2, 0, "a", 6)(14, AppComponent_a_14_Template, 2, 0, "a", 7)(15, AppComponent_a_15_Template, 2, 0, "a", 8)(16, AppComponent_button_16_Template, 2, 0, "button", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "main", 10);
            i0.ɵɵelement(18, "router-outlet");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngIf", ctx.isAdmin());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isAdmin());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.auth.user());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.auth.user());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.auth.user());
        } }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, NgIf], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{
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
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent" }); })();
//# sourceMappingURL=app.component.js.map
import { Component, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
function AdminApplicationsPageComponent_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1, "Admin access required.");
    i0.ɵɵelementEnd();
} }
function AdminApplicationsPageComponent_div_8_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 9)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p", 10);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "small");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 11)(14, "span", 12);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 13);
    i0.ɵɵlistener("click", function AdminApplicationsPageComponent_div_8_article_1_Template_button_click_16_listener() { const application_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateStatus(application_r2.id, "approved")); });
    i0.ɵɵtext(17, "Approve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 14);
    i0.ɵɵlistener("click", function AdminApplicationsPageComponent_div_8_article_1_Template_button_click_18_listener() { const application_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateStatus(application_r2.id, "rejected")); });
    i0.ɵɵtext(19, "Reject");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const application_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(application_r2.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", application_r2.userEmail, " applied for ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(application_r2.dogName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(application_r2.message);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 6, application_r2.createdAt, "medium"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(application_r2.status);
} }
function AdminApplicationsPageComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, AdminApplicationsPageComponent_div_8_article_1_Template, 20, 9, "article", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.applications);
} }
function AdminApplicationsPageComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.error);
} }
function AdminApplicationsPageComponent_p_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.success);
} }
export class AdminApplicationsPageComponent {
    constructor() {
        this.api = inject(ApiService);
        this.auth = inject(AuthService);
        this.applications = [];
        this.error = '';
        this.success = '';
        void this.loadApplications();
    }
    isAdmin() {
        return this.auth.user()?.role === 'admin';
    }
    async loadApplications() {
        if (!this.isAdmin())
            return;
        try {
            const query = `
        query {
          getApplications {
            id userName userEmail dogName message status createdAt
          }
        }
      `;
            const data = await this.api.request(query, {}, this.auth.token());
            this.applications = data.getApplications;
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Failed to load applications';
        }
    }
    async updateStatus(id, status) {
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
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Failed to update status';
        }
    }
    static { this.ɵfac = function AdminApplicationsPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminApplicationsPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminApplicationsPageComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 11, vars: 4, consts: [[1, "panel"], [1, "section-heading"], [1, "eyebrow"], ["class", "error", 4, "ngIf"], ["class", "table-list", 4, "ngIf"], ["class", "success", 4, "ngIf"], [1, "error"], [1, "table-list"], ["class", "list-row tall", 4, "ngFor", "ngForOf"], [1, "list-row", "tall"], [1, "muted"], [1, "row-actions"], [1, "tag"], [3, "click"], [1, "ghost", 3, "click"], [1, "success"]], template: function AdminApplicationsPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Admin");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h2");
            i0.ɵɵtext(6, "Application Management");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(7, AdminApplicationsPageComponent_p_7_Template, 2, 0, "p", 3)(8, AdminApplicationsPageComponent_div_8_Template, 2, 1, "div", 4)(9, AdminApplicationsPageComponent_p_9_Template, 2, 1, "p", 3)(10, AdminApplicationsPageComponent_p_10_Template, 2, 1, "p", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", !ctx.isAdmin());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isAdmin());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.success);
        } }, dependencies: [NgFor, NgIf, DatePipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminApplicationsPageComponent, [{
        type: Component,
        args: [{
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
            }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminApplicationsPageComponent, { className: "AdminApplicationsPageComponent" }); })();
//# sourceMappingURL=admin-applications-page.component.js.map
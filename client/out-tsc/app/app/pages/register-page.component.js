import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function RegisterPageComponent_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
export class RegisterPageComponent {
    constructor() {
        this.api = inject(ApiService);
        this.auth = inject(AuthService);
        this.router = inject(Router);
        this.name = '';
        this.email = '';
        this.password = '';
        this.error = '';
    }
    async register() {
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
            const data = await this.api.request(query, {
                input: { name: this.name, email: this.email, password: this.password }
            });
            this.auth.setSession(data.register.token, data.register.user);
            await this.router.navigate(['/dogs']);
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Registration failed';
        }
    }
    static { this.ɵfac = function RegisterPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RegisterPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RegisterPageComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 21, vars: 4, consts: [[1, "panel", "auth-panel"], [1, "eyebrow"], [1, "muted"], [1, "form-grid", 3, "ngSubmit"], ["name", "name", "required", "", 3, "ngModelChange", "ngModel"], ["name", "email", "type", "email", "required", "", 3, "ngModelChange", "ngModel"], ["name", "password", "type", "password", "required", "", "minlength", "6", 3, "ngModelChange", "ngModel"], ["type", "submit"], ["class", "error", 4, "ngIf"], [1, "error"]], template: function RegisterPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3, "New adopter");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h2");
            i0.ɵɵtext(5, "Create account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 2);
            i0.ɵɵtext(7, "Register as a user and start browsing adoptable dogs.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "form", 3);
            i0.ɵɵlistener("ngSubmit", function RegisterPageComponent_Template_form_ngSubmit_8_listener() { return ctx.register(); });
            i0.ɵɵelementStart(9, "label");
            i0.ɵɵtext(10, " Name ");
            i0.ɵɵelementStart(11, "input", 4);
            i0.ɵɵtwoWayListener("ngModelChange", function RegisterPageComponent_Template_input_ngModelChange_11_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.name, $event) || (ctx.name = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "label");
            i0.ɵɵtext(13, " Email ");
            i0.ɵɵelementStart(14, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function RegisterPageComponent_Template_input_ngModelChange_14_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.email, $event) || (ctx.email = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "label");
            i0.ɵɵtext(16, " Password ");
            i0.ɵɵelementStart(17, "input", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function RegisterPageComponent_Template_input_ngModelChange_17_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.password, $event) || (ctx.password = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "button", 7);
            i0.ɵɵtext(19, "Register");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(20, RegisterPageComponent_p_20_Template, 2, 1, "p", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵtwoWayProperty("ngModel", ctx.name);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.email);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.password);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.error);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.MinLengthValidator, i1.NgModel, i1.NgForm, NgIf], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RegisterPageComponent, [{
        type: Component,
        args: [{
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
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RegisterPageComponent, { className: "RegisterPageComponent" }); })();
//# sourceMappingURL=register-page.component.js.map
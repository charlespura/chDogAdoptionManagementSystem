import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function LoginPageComponent_p_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
export class LoginPageComponent {
    constructor() {
        this.api = inject(ApiService);
        this.auth = inject(AuthService);
        this.router = inject(Router);
        this.email = 'admin@pawadopt.local';
        this.password = 'admin123';
        this.error = '';
    }
    async login() {
        this.error = '';
        try {
            const query = `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
            user { id name email role }
          }
        }
      `;
            const data = await this.api.request(query, {
                input: { email: this.email, password: this.password }
            });
            this.auth.setSession(data.login.token, data.login.user);
            await this.router.navigate(['/dashboard']);
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Login failed';
        }
    }
    static { this.ɵfac = function LoginPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginPageComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 25, vars: 3, consts: [[1, "panel", "auth-panel"], [1, "eyebrow"], [1, "muted"], [1, "form-grid", 3, "ngSubmit"], ["name", "email", "type", "email", "required", "", 3, "ngModelChange", "ngModel"], ["name", "password", "type", "password", "required", "", 3, "ngModelChange", "ngModel"], ["type", "submit"], ["class", "error", 4, "ngIf"], [1, "hint"], [1, "error"]], template: function LoginPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3, "Welcome back");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h2");
            i0.ɵɵtext(5, "Login");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 2);
            i0.ɵɵtext(7, "Use the seeded admin account or create a user account.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "form", 3);
            i0.ɵɵlistener("ngSubmit", function LoginPageComponent_Template_form_ngSubmit_8_listener() { return ctx.login(); });
            i0.ɵɵelementStart(9, "label");
            i0.ɵɵtext(10, " Email ");
            i0.ɵɵelementStart(11, "input", 4);
            i0.ɵɵtwoWayListener("ngModelChange", function LoginPageComponent_Template_input_ngModelChange_11_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.email, $event) || (ctx.email = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "label");
            i0.ɵɵtext(13, " Password ");
            i0.ɵɵelementStart(14, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function LoginPageComponent_Template_input_ngModelChange_14_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.password, $event) || (ctx.password = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "button", 6);
            i0.ɵɵtext(16, "Login");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(17, LoginPageComponent_p_17_Template, 2, 1, "p", 7);
            i0.ɵɵelementStart(18, "p", 8);
            i0.ɵɵtext(19, "Seeded admin: ");
            i0.ɵɵelementStart(20, "strong");
            i0.ɵɵtext(21, "admin@pawadopt.local");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(22, " / ");
            i0.ɵɵelementStart(23, "strong");
            i0.ɵɵtext(24, "admin123");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵtwoWayProperty("ngModel", ctx.email);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.password);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.error);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, NgIf], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginPageComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [FormsModule, NgIf],
                template: `
    <section class="panel auth-panel">
      <div>
        <p class="eyebrow">Welcome back</p>
        <h2>Login</h2>
        <p class="muted">Use the seeded admin account or create a user account.</p>
      </div>

      <form class="form-grid" (ngSubmit)="login()">
        <label>
          Email
          <input [(ngModel)]="email" name="email" type="email" required>
        </label>
        <label>
          Password
          <input [(ngModel)]="password" name="password" type="password" required>
        </label>
        <button type="submit">Login</button>
      </form>

      <p class="error" *ngIf="error">{{ error }}</p>
      <p class="hint">Seeded admin: <strong>admin&#64;pawadopt.local</strong> / <strong>admin123</strong></p>
    </section>
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginPageComponent, { className: "LoginPageComponent" }); })();
//# sourceMappingURL=login-page.component.js.map
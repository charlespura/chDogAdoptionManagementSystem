import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AdminDogsPageComponent_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1, "Admin access required.");
    i0.ɵɵelementEnd();
} }
function AdminDogsPageComponent_div_8_button_35_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function AdminDogsPageComponent_div_8_button_35_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.resetForm()); });
    i0.ɵɵtext(1, "Cancel Edit");
    i0.ɵɵelementEnd();
} }
function AdminDogsPageComponent_div_8_article_40_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 26)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 27)(7, "button", 28);
    i0.ɵɵlistener("click", function AdminDogsPageComponent_div_8_article_40_Template_button_click_7_listener() { const dog_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.editDog(dog_r5)); });
    i0.ɵɵtext(8, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 29);
    i0.ɵɵlistener("click", function AdminDogsPageComponent_div_8_article_40_Template_button_click_9_listener() { const dog_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteDog(dog_r5.id)); });
    i0.ɵɵtext(10, "Delete");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const dog_r5 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(dog_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", dog_r5.breed, " \u2022 ", dog_r5.status, "");
} }
function AdminDogsPageComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "form", 8);
    i0.ɵɵlistener("ngSubmit", function AdminDogsPageComponent_div_8_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveDog()); });
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, " Name ");
    i0.ɵɵelementStart(6, "input", 9);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminDogsPageComponent_div_8_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "label");
    i0.ɵɵtext(8, " Breed ");
    i0.ɵɵelementStart(9, "input", 10);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminDogsPageComponent_div_8_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.breed, $event) || (ctx_r1.form.breed = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, " Age ");
    i0.ɵɵelementStart(12, "input", 11);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminDogsPageComponent_div_8_Template_input_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.age, $event) || (ctx_r1.form.age = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, " Gender ");
    i0.ɵɵelementStart(15, "select", 12);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminDogsPageComponent_div_8_Template_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.gender, $event) || (ctx_r1.form.gender = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(16, "option", 13);
    i0.ɵɵtext(17, "Male");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "option", 14);
    i0.ɵɵtext(19, "Female");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵtext(21, " Status ");
    i0.ɵɵelementStart(22, "select", 15);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminDogsPageComponent_div_8_Template_select_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.status, $event) || (ctx_r1.form.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(23, "option", 16);
    i0.ɵɵtext(24, "Available");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "option", 17);
    i0.ɵɵtext(26, "Adopted");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28, " Image URL ");
    i0.ɵɵelementStart(29, "input", 18);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminDogsPageComponent_div_8_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.imageUrl, $event) || (ctx_r1.form.imageUrl = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "label");
    i0.ɵɵtext(31, " Description ");
    i0.ɵɵelementStart(32, "textarea", 19);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminDogsPageComponent_div_8_Template_textarea_ngModelChange_32_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.description, $event) || (ctx_r1.form.description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "button", 20);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(35, AdminDogsPageComponent_div_8_button_35_Template, 2, 0, "button", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 22)(37, "h3");
    i0.ɵɵtext(38, "Current Dogs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 23);
    i0.ɵɵtemplate(40, AdminDogsPageComponent_div_8_article_40_Template, 11, 3, "article", 24);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.form.id ? "Edit Dog" : "Add Dog");
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.breed);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.age);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.gender);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.status);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.imageUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.form.id ? "Update Dog" : "Add Dog");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.form.id);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r1.dogs);
} }
function AdminDogsPageComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function AdminDogsPageComponent_p_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.success);
} }
export class AdminDogsPageComponent {
    constructor() {
        this.api = inject(ApiService);
        this.auth = inject(AuthService);
        this.dogs = [];
        this.error = '';
        this.success = '';
        this.form = this.defaultForm();
        void this.loadDogs();
    }
    isAdmin() {
        return this.auth.user()?.role === 'admin';
    }
    async loadDogs() {
        if (!this.isAdmin())
            return;
        const query = `query { getDogs { id name breed age gender status imageUrl description } }`;
        const data = await this.api.request(query);
        this.dogs = data.getDogs;
    }
    editDog(dog) {
        this.form = { ...dog, imageUrl: dog.imageUrl || '', description: dog.description || '' };
    }
    resetForm() {
        this.form = this.defaultForm();
    }
    async saveDog() {
        this.error = '';
        this.success = '';
        try {
            if (this.form.id) {
                const query = `
          mutation UpdateDog($id: ID!, $input: DogInput!) {
            updateDog(id: $id, input: $input) { id }
          }
        `;
                await this.api.request(query, { id: this.form.id, input: this.buildInput() }, this.auth.token());
                this.success = 'Dog updated.';
            }
            else {
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
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Save failed';
        }
    }
    async deleteDog(id) {
        if (!id)
            return;
        try {
            const query = `mutation DeleteDog($id: ID!) { deleteDog(id: $id) }`;
            await this.api.request(query, { id }, this.auth.token());
            this.success = 'Dog deleted.';
            await this.loadDogs();
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : 'Delete failed';
        }
    }
    buildInput() {
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
    defaultForm() {
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
    static { this.ɵfac = function AdminDogsPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminDogsPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminDogsPageComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 11, vars: 4, consts: [[1, "panel"], [1, "section-heading"], [1, "eyebrow"], ["class", "error", 4, "ngIf"], ["class", "admin-grid", 4, "ngIf"], ["class", "success", 4, "ngIf"], [1, "error"], [1, "admin-grid"], [1, "form-grid", "panel", "subtle", 3, "ngSubmit"], ["name", "name", "required", "", 3, "ngModelChange", "ngModel"], ["name", "breed", "required", "", 3, "ngModelChange", "ngModel"], ["name", "age", "type", "number", "required", "", 3, "ngModelChange", "ngModel"], ["name", "gender", "required", "", 3, "ngModelChange", "ngModel"], ["value", "Male"], ["value", "Female"], ["name", "status", "required", "", 3, "ngModelChange", "ngModel"], ["value", "Available"], ["value", "Adopted"], ["name", "imageUrl", 3, "ngModelChange", "ngModel"], ["name", "description", "rows", "4", 3, "ngModelChange", "ngModel"], ["type", "submit"], ["type", "button", "class", "ghost", 3, "click", 4, "ngIf"], [1, "panel", "subtle"], [1, "table-list"], ["class", "list-row", 4, "ngFor", "ngForOf"], ["type", "button", 1, "ghost", 3, "click"], [1, "list-row"], [1, "row-actions"], [1, "ghost", 3, "click"], [1, "danger", 3, "click"], [1, "success"]], template: function AdminDogsPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Admin");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h2");
            i0.ɵɵtext(6, "Dog Management");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(7, AdminDogsPageComponent_p_7_Template, 2, 0, "p", 3)(8, AdminDogsPageComponent_div_8_Template, 41, 11, "div", 4)(9, AdminDogsPageComponent_p_9_Template, 2, 1, "p", 3)(10, AdminDogsPageComponent_p_10_Template, 2, 1, "p", 5);
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
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, NgFor, NgIf], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminDogsPageComponent, [{
        type: Component,
        args: [{
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
            }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminDogsPageComponent, { className: "AdminDogsPageComponent" }); })();
//# sourceMappingURL=admin-dogs-page.component.js.map
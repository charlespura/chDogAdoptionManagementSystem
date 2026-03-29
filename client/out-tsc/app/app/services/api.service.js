import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import * as i0 from "@angular/core";
export class ApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.endpoint = 'http://localhost:4000/graphql';
    }
    async request(query, variables = {}, token) {
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();
        const response = await firstValueFrom(this.http.post(this.endpoint, { query, variables }, { headers }));
        if (response.errors?.length) {
            throw new Error(response.errors[0].message);
        }
        if (!response.data) {
            throw new Error('No data returned from API');
        }
        return response.data;
    }
    static { this.ɵfac = function ApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=api.service.js.map
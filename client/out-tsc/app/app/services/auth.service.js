import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class AuthService {
    constructor() {
        this.token = signal(localStorage.getItem('token'));
        this.user = signal(this.readUser());
    }
    setSession(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.token.set(token);
        this.user.set(user);
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.token.set(null);
        this.user.set(null);
    }
    readUser() {
        const raw = localStorage.getItem('user');
        if (!raw)
            return null;
        try {
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=auth.service.js.map
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from '../services/global-services.service';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, globalservice) {
        this.router = router;
        this.globalservice = globalservice;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var userAuthenticated = this.globalservice.isLoggedIn();
        if (!userAuthenticated) {
            this.router.navigateByUrl('/login');
        }
        return userAuthenticated;
    };
    AuthGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Router, GlobalServicesService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map
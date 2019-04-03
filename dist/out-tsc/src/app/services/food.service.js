import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var FoodService = /** @class */ (function () {
    function FoodService(http) {
        this.http = http;
        this.url = "http://www.omdbapi.com/?apikey=ef8b3047";
        //fatsecret API
        //REST API Consumer Key: e2cc4056c58d4d73b55ccbce157683f8
        //REST API Shared Secret: ce1af7d3363b444a9561294afe839f71
        this.API_PATH = 'https://platform.fatsecret.com/rest/server.api';
        this.ACCESS_KEY = 'e2cc4056c58d4d73b55ccbce157683f8';
        this.APP_SECRET = 'ce1af7d3363b444a9561294afe839f71';
        this.OAUTH_VERSION = '1.0';
        this.OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';
    }
    FoodService.prototype.searchData = function (title) {
        return this.http.get(this.url + "&s=" + encodeURI(title))
            .pipe(map(function (results) {
            //console.log("food services says:");
            //console.log(results['Search']);
            return results['Search'];
        }));
    };
    FoodService.prototype.getOauthParameters = function () {
        var timestamp = Math.round(new Date().getTime() / 1000);
        return {
            oauth_consumer_key: this.ACCESS_KEY,
            oauth_nonce: "" + timestamp + Math.floor(Math.random() * 1000),
            oauth_signature_method: this.OAUTH_SIGNATURE_METHOD,
            oauth_timestamp: timestamp,
            oauth_version: this.OAUTH_VERSION,
        };
    };
    FoodService.prototype.getSignature = function (queryParams, httpMethod) {
        if (httpMethod === void 0) { httpMethod = 'GET'; }
        var signatureBaseString = [
            httpMethod,
            encodeURIComponent(this.API_PATH),
            //encodeURIComponent(stringify(queryParams)),
            encodeURIComponent(Object.keys(queryParams).map(function (key) { return key + '=' + queryParams[key]; }).join('&')),
        ].join('&');
        var signatureKey = this.APP_SECRET + "&";
        return this.b64_hmac_sha1(signatureKey, signatureBaseString, null, null);
    };
    FoodService.prototype.b64_hmac_sha1 = function (k, d, _p, _z) {
        // heavily optimized and compressed version of http://pajhome.org.uk/crypt/md5/sha1.js
        // _p = b64pad, _z = character size; not used here but I left them available just in case
        if (!_p) {
            _p = '=';
        }
        if (!_z) {
            _z = 8;
        }
        function _f(t, b, c, d) { if (t < 20) {
            return (b & c) | ((~b) & d);
        } if (t < 40) {
            return b ^ c ^ d;
        } if (t < 60) {
            return (b & c) | (b & d) | (c & d);
        } return b ^ c ^ d; }
        function _k(t) { return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514; }
        function _s(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF), m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
        function _r(n, c) { return (n << c) | (n >>> (32 - c)); }
        function _c(x, l) { x[l >> 5] |= 0x80 << (24 - l % 32); x[((l + 64 >> 9) << 4) + 15] = l; var w = [80], a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776; for (var i = 0; i < x.length; i += 16) {
            var o = a, p = b, q = c, r = d, s = e;
            for (var j = 0; j < 80; j++) {
                if (j < 16) {
                    w[j] = x[i + j];
                }
                else {
                    w[j] = _r(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                }
                var t = _s(_s(_r(a, 5), _f(j, b, c, d)), _s(_s(e, w[j]), _k(j)));
                e = d;
                d = c;
                c = _r(b, 30);
                b = a;
                a = t;
            }
            a = _s(a, o);
            b = _s(b, p);
            c = _s(c, q);
            d = _s(d, r);
            e = _s(e, s);
        } return [a, b, c, d, e]; }
        function _b(s) { var b = [], m = (1 << _z) - 1; for (var i = 0; i < s.length * _z; i += _z) {
            b[i >> 5] |= (s.charCodeAt(i / 8) & m) << (32 - _z - i % 32);
        } return b; }
        function _h(k, d) { var b = _b(k); if (b.length > 16) {
            b = _c(b, k.length * _z);
        } var p = [16], o = [16]; for (var i = 0; i < 16; i++) {
            p[i] = b[i] ^ 0x36363636;
            o[i] = b[i] ^ 0x5C5C5C5C;
        } var h = _c(p.concat(_b(d)), 512 + d.length * _z); return _c(o.concat(h), 512 + 160); }
        function _n(b) { var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = ''; for (var i = 0; i < b.length * 4; i += 3) {
            var r = (((b[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((b[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((b[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > b.length * 32) {
                    s += _p;
                }
                else {
                    s += t.charAt((r >> 6 * (3 - j)) & 0x3F);
                }
            }
        } return s; }
        function _x(k, d) { return _n(_h(k, d)); }
        return _x(k, d);
    };
    FoodService.prototype.makeApiCall = function (methodParams, httpMethod) {
        if (httpMethod === void 0) { httpMethod = 'GET'; }
        var queryParams = tslib_1.__assign({}, this.getOauthParameters(), methodParams, { format: 'json' });
        queryParams['oauth_signature'] = this.getSignature(queryParams, httpMethod);
        return fetch(this.API_PATH + "?" + Object.keys(queryParams).map(function (key) { return key + '=' + queryParams[key]; }).join('&'), { method: httpMethod });
    };
    FoodService.prototype.searchFood = function (query, maxResults) {
        if (maxResults === void 0) { maxResults = 8; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var methodParams, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        methodParams = {
                            method: 'foods.search',
                            max_results: maxResults,
                            search_expression: query,
                        };
                        return [4 /*yield*/, this.makeApiCall(methodParams)];
                    case 1:
                        response = _a.sent();
                        alert(response);
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    FoodService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], FoodService);
    return FoodService;
}());
export { FoodService };
//# sourceMappingURL=food.service.js.map
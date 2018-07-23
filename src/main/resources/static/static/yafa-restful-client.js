(function (l, c) {
    var a = function () {
        this.options = {
            async: true, cache: false, complete: function (t, s) {
            }, contentType: "application/json", dataType: "json", error: function (u, s, t) {
            }, success: function (t, s, u) {
            }, timeout: 30000, url: "", type: "POST"
        }
    };
    a.prototype.get = function (s, t) {
        this.options["url"] = s;
        this.options["type"] = "GET";
        this.options["success"] = t;
        this.options["beforeSend"] = function (u) {
            u.setRequestHeader("System-Code", "CMS");
            u.setRequestHeader("Token", e(s))
        };
        c.ajax(this.options)
    };
    a.prototype.post = function (t, u, v, s) {
        var u = JSON.stringify(u);
        this.options["url"] = t;
        this.options["type"] = "POST";
        this.options["data"] = u;
        this.options["success"] = v;
        this.options["error"] = s;
        this.options["beforeSend"] = function (w) {
            w.setRequestHeader("System-Code", "CMS");
            w.setRequestHeader("Token", e(t + u))
        };
        c.ajax(this.options)
    };
    a.prototype.config = function (s) {
        this.options = c.extend(this.options, s || {});
        return this
    };
    l.RestfulClient = new a();
    var g = 0;

    function e(t) {
        return o(p(h("token" + t)))
    }

    function p(t) {
        return m(q(f(t), t.length * 8))
    }

    function o(u) {
        try {
            g
        } catch (y) {
            g = 0
        }
        var w = g ? "0123456789ABCDEF" : "0123456789abcdef";
        var t = "";
        var s;
        for (var v = 0; v < u.length; v++) {
            s = u.charCodeAt(v);
            t += w.charAt((s >>> 4) & 15) + w.charAt(s & 15)
        }
        return t
    }

    function h(u) {
        var t = "";
        var v = -1;
        var s, w;
        while (++v < u.length) {
            s = u.charCodeAt(v);
            w = v + 1 < u.length ? u.charCodeAt(v + 1) : 0;
            if (55296 <= s && s <= 56319 && 56320 <= w && w <= 57343) {
                s = 65536 + ((s & 1023) << 10) + (w & 1023);
                v++
            }
            if (s <= 127) {
                t += String.fromCharCode(s)
            } else {
                if (s <= 2047) {
                    t += String.fromCharCode(192 | ((s >>> 6) & 31), 128 | (s & 63))
                } else {
                    if (s <= 65535) {
                        t += String.fromCharCode(224 | ((s >>> 12) & 15), 128 | ((s >>> 6) & 63), 128 | (s & 63))
                    } else {
                        if (s <= 2097151) {
                            t += String.fromCharCode(240 | ((s >>> 18) & 7), 128 | ((s >>> 12) & 63), 128 | ((s >>> 6) & 63), 128 | (s & 63))
                        }
                    }
                }
            }
        }
        return t
    }

    function f(t) {
        var s = Array(t.length >> 2);
        for (var u = 0; u < s.length; u++) {
            s[u] = 0
        }
        for (var u = 0; u < t.length * 8; u += 8) {
            s[u >> 5] |= (t.charCodeAt(u / 8) & 255) << (u % 32)
        }
        return s
    }

    function m(t) {
        var s = "";
        for (var u = 0; u < t.length * 32; u += 8) {
            s += String.fromCharCode((t[u >> 5] >>> (u % 32)) & 255)
        }
        return s
    }

    function q(D, y) {
        D[y >> 5] |= 128 << ((y) % 32);
        D[(((y + 64) >>> 9) << 4) + 14] = y;
        var C = 1732584193;
        var B = -271733879;
        var A = -1732584194;
        var z = 271733878;
        for (var u = 0; u < D.length; u += 16) {
            var w = C;
            var v = B;
            var t = A;
            var s = z;
            C = j(C, B, A, z, D[u + 0], 7, -680876936);
            z = j(z, C, B, A, D[u + 1], 12, -389564586);
            A = j(A, z, C, B, D[u + 2], 17, 606105819);
            B = j(B, A, z, C, D[u + 3], 22, -1044525330);
            C = j(C, B, A, z, D[u + 4], 7, -176418897);
            z = j(z, C, B, A, D[u + 5], 12, 1200080426);
            A = j(A, z, C, B, D[u + 6], 17, -1473231341);
            B = j(B, A, z, C, D[u + 7], 22, -45705983);
            C = j(C, B, A, z, D[u + 8], 7, 1770035416);
            z = j(z, C, B, A, D[u + 9], 12, -1958414417);
            A = j(A, z, C, B, D[u + 10], 17, -42063);
            B = j(B, A, z, C, D[u + 11], 22, -1990404162);
            C = j(C, B, A, z, D[u + 12], 7, 1804603682);
            z = j(z, C, B, A, D[u + 13], 12, -40341101);
            A = j(A, z, C, B, D[u + 14], 17, -1502002290);
            B = j(B, A, z, C, D[u + 15], 22, 1236535329);
            C = r(C, B, A, z, D[u + 1], 5, -165796510);
            z = r(z, C, B, A, D[u + 6], 9, -1069501632);
            A = r(A, z, C, B, D[u + 11], 14, 643717713);
            B = r(B, A, z, C, D[u + 0], 20, -373897302);
            C = r(C, B, A, z, D[u + 5], 5, -701558691);
            z = r(z, C, B, A, D[u + 10], 9, 38016083);
            A = r(A, z, C, B, D[u + 15], 14, -660478335);
            B = r(B, A, z, C, D[u + 4], 20, -405537848);
            C = r(C, B, A, z, D[u + 9], 5, 568446438);
            z = r(z, C, B, A, D[u + 14], 9, -1019803690);
            A = r(A, z, C, B, D[u + 3], 14, -187363961);
            B = r(B, A, z, C, D[u + 8], 20, 1163531501);
            C = r(C, B, A, z, D[u + 13], 5, -1444681467);
            z = r(z, C, B, A, D[u + 2], 9, -51403784);
            A = r(A, z, C, B, D[u + 7], 14, 1735328473);
            B = r(B, A, z, C, D[u + 12], 20, -1926607734);
            C = d(C, B, A, z, D[u + 5], 4, -378558);
            z = d(z, C, B, A, D[u + 8], 11, -2022574463);
            A = d(A, z, C, B, D[u + 11], 16, 1839030562);
            B = d(B, A, z, C, D[u + 14], 23, -35309556);
            C = d(C, B, A, z, D[u + 1], 4, -1530992060);
            z = d(z, C, B, A, D[u + 4], 11, 1272893353);
            A = d(A, z, C, B, D[u + 7], 16, -155497632);
            B = d(B, A, z, C, D[u + 10], 23, -1094730640);
            C = d(C, B, A, z, D[u + 13], 4, 681279174);
            z = d(z, C, B, A, D[u + 0], 11, -358537222);
            A = d(A, z, C, B, D[u + 3], 16, -722521979);
            B = d(B, A, z, C, D[u + 6], 23, 76029189);
            C = d(C, B, A, z, D[u + 9], 4, -640364487);
            z = d(z, C, B, A, D[u + 12], 11, -421815835);
            A = d(A, z, C, B, D[u + 15], 16, 530742520);
            B = d(B, A, z, C, D[u + 2], 23, -995338651);
            C = i(C, B, A, z, D[u + 0], 6, -198630844);
            z = i(z, C, B, A, D[u + 7], 10, 1126891415);
            A = i(A, z, C, B, D[u + 14], 15, -1416354905);
            B = i(B, A, z, C, D[u + 5], 21, -57434055);
            C = i(C, B, A, z, D[u + 12], 6, 1700485571);
            z = i(z, C, B, A, D[u + 3], 10, -1894986606);
            A = i(A, z, C, B, D[u + 10], 15, -1051523);
            B = i(B, A, z, C, D[u + 1], 21, -2054922799);
            C = i(C, B, A, z, D[u + 8], 6, 1873313359);
            z = i(z, C, B, A, D[u + 15], 10, -30611744);
            A = i(A, z, C, B, D[u + 6], 15, -1560198380);
            B = i(B, A, z, C, D[u + 13], 21, 1309151649);
            C = i(C, B, A, z, D[u + 4], 6, -145523070);
            z = i(z, C, B, A, D[u + 11], 10, -1120210379);
            A = i(A, z, C, B, D[u + 2], 15, 718787259);
            B = i(B, A, z, C, D[u + 9], 21, -343485551);
            C = k(C, w);
            B = k(B, v);
            A = k(A, t);
            z = k(z, s)
        }
        return Array(C, B, A, z)
    }

    function b(A, w, v, u, z, y) {
        return k(n(k(k(w, A), k(u, y)), z), v)
    }

    function j(w, v, B, A, u, z, y) {
        return b((v & B) | ((~v) & A), w, v, u, z, y)
    }

    function r(w, v, B, A, u, z, y) {
        return b((v & A) | (B & (~A)), w, v, u, z, y)
    }

    function d(w, v, B, A, u, z, y) {
        return b(v ^ B ^ A, w, v, u, z, y)
    }

    function i(w, v, B, A, u, z, y) {
        return b(B ^ (v | (~A)), w, v, u, z, y)
    }

    function k(s, v) {
        var u = (s & 65535) + (v & 65535);
        var t = (s >> 16) + (v >> 16) + (u >> 16);
        return (t << 16) | (u & 65535)
    }

    function n(s, t) {
        return (s << t) | (s >>> (32 - t))
    }
})(window, jQuery);
﻿(function (f, c, z) {
    function n(h) { for (var e = {}, k, a, w = 0; w < h.length; w++)a = h[w], k = a.r + a.s + a.m, a.c && (e[k] || (e[k] = []), e[k].push(h[w])); return e } function u(h) { for (var e = 1; e < arguments.length; e++) { var k = arguments[e]; try { if (k.isSupported) return k.send(h) } catch (a) { } } } function g() { if (b.length) { for (var h = 0; h < r.length; h++)r[h](); a._flhs += 1; m(); u(n(b.splice(0, b.length)), A, H, F) } L = E = 0 } function m() { q && l({ k: "chk", f: a._flhs, l: a._lpn, s: "full" }, "csm") } function l(h, e, k) {
        k = k || {}; 0 === k.bf && a.isBF || (h = {
            r: k.r || a.rid, s: k.s || f.ue_sid,
            m: k.m || f.ue_mid, mkt: k.mkt || f.ue_mkt, sn: k.sn || f.ue_sn, c: e, d: h, t: k.t || a.d(), cs: k.c && f.ue_qsl
        }, a._lpn[e] = (a._lpn[e] || 0) + 1, k.b ? u(n([h]), A, F) : k.nb ? u(n([h]), A, H, F) : k.img || Q[e] ? u(n([h]), F) : k.ff ? (b.push(h), g()) : k.n ? (b.push(h), 0 === M ? g() : L || (L = c.setTimeout(g, M))) : (b.push(h), E || (E = c.setTimeout(g, J))))
    } function v(h, e, k) { K++; K == C && l({ m: "Max number of Forester Logs exceeded", f: "forester-client.js", logLevel: "ERROR" }, c.ue_err_chan || "jserr"); (K < C || k && k.il) && l(h, e, k) } function D() {
        if (!N) {
            for (var h = 0; h < p.length; h++)p[h]();
            for (h = 0; h < r.length; h++)r[h](); a._flhs += 1; m(); u(n(b.splice(0, b.length)), A, F); N = !0
        }
    } var y = {}; (function () {
        function h(e) { return 10 > e ? "0" + e : e } function e(e) { a.lastIndex = 0; return a.test(e) ? '"' + e.replace(a, function (e) { var k = b[e]; return "string" === typeof k ? k : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + e + '"' } function k(h, a) {
            var b, P, t, A, R = w, U, c = a[h]; c && "object" === typeof c && "function" === typeof c.toJSON && (c = c.toJSON(h)); "function" === typeof f && (c = f.call(a, h, c)); switch (typeof c) {
                case "string": return e(c);
                case "number": return isFinite(c) ? String(c) : "null"; case "boolean": case "null": return String(c); case "object": if (!c) return "null"; w += d; U = []; if ("[object Array]" === Object.prototype.toString.apply(c)) { A = c.length; for (b = 0; b < A; b += 1)U[b] = k(b, c) || "null"; t = 0 === U.length ? "[]" : w ? "[\n" + w + U.join(",\n" + w) + "\n" + R + "]" : "[" + U.join(",") + "]"; w = R; return t } if (f && "object" === typeof f) for (A = f.length, b = 0; b < A; b += 1)"string" === typeof f[b] && (P = f[b], (t = k(P, c)) && U.push(e(P) + (w ? ": " : ":") + t)); else for (P in c) Object.prototype.hasOwnProperty.call(c,
                    P) && (t = k(P, c)) && U.push(e(P) + (w ? ": " : ":") + t); t = 0 === U.length ? "{}" : w ? "{\n" + w + U.join(",\n" + w) + "\n" + R + "}" : "{" + U.join(",") + "}"; w = R; return t
            }
        } "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function (e) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + h(this.getUTCMonth() + 1) + "-" + h(this.getUTCDate()) + "T" + h(this.getUTCHours()) + ":" + h(this.getUTCMinutes()) + ":" + h(this.getUTCSeconds()) + "Z" : null }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) { return this.valueOf() });
        var a = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, w, d, b = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, f; "function" !== typeof y.stringify && (y.stringify = function (e, h, a) { var b; d = w = ""; if ("number" === typeof a) for (b = 0; b < a; b += 1)d += " "; else "string" === typeof a && (d = a); if ((f = h) && "function" !== typeof h && ("object" !== typeof h || "number" !== typeof h.length)) throw Error("JSON.stringify"); return k("", { "": e }) })
    })();
    var x = function () {
        function h(e, k) { if (null == e) return k.push("!n"); if ("number" === typeof e) return k.push("!" + e); if ("string" === typeof e) return "\\" == e[e.length - 1] ? k.push("'" + e.replace(/'/g, "\\'") + "u005C'") : k.push("'" + e.replace(/'/g, "\\'") + "'"); if ("boolean" === typeof e) return k.push(e ? "!t" : "!f"); if (e instanceof Array) { k.push("*"); for (var a = 0; a < e.length; a++)h(e[a], k); return k.push(")") } if ("object" == typeof e) { k.push("("); for (a in e) e.hasOwnProperty(a) && (k.push(a), h(e[a], k)); return k.push(")") } return k.push("!n") }
        return { stringify: function (e) { var k = []; h(e, k); return k.join("") } }
    }(), O = f.ue_qsl || 2E3, C = 1E3, q = 1 === window.ue_ddq, B = function () { }, G = c.JSON && c.JSON.stringify || y && y.stringify, d = x.stringify, a = f.ue || {}, x = f.uet || B; (f.uet || B)("bb", "ue_frst_v2", { wb: 1 }); var t = "//" + f.ue_furl + "/1/batch/1/OE/", b = [], p = [], r = [], N = !1, L, E, M = void 0 === f.ue_hpfi ? 1E3 : f.ue_hpfi, J = void 0 === f.ue_lpfi ? 1E4 : f.ue_lpfi, Q = { "scheduled-delivery": 1 }, K = 0, H = function () {
        function h() {
            if (c.XDomainRequest) {
                var e = new XDomainRequest; e.onerror = B; e.ontimeout = B;
                e.onprogress = B; e.onload = B; e.timeout = 0; return e
            } if (c.XMLHttpRequest) { e = new XMLHttpRequest; if (!("withCredentials" in e)) throw ""; return e } if (c.ActiveXObject) { for (var k = 0; k < d.length && !e; k++)try { e = new ActiveXObject(d[k]), d = [d[k]] } catch (h) { } return e }
        } function e(e) { for (var k = [], h = e[0] || {}, d = 0; d < e.length; d++) { var b = {}; b[e[d].c] = e[d].d; k.push(b) } return { rid: h.r || a.rid, sid: h.s || f.ue_sid, mid: h.m || f.ue_mid, mkt: h.mkt || f.ue_mkt, sn: h.sn || f.ue_sn, reqs: k } } function k(k) {
            var a = e(k), d = h(); if (!d) throw ""; d.onerror = function () {
                for (var e =
                    0; e < k.length; e++)b.push(k[e]); H.isSupported = !1
            }; d.open("POST", t, !0); d.setRequestHeader && d.setRequestHeader("Content-type", "text/plain"); d.send(G(a))
        } var d = "MSXML2.XMLHTTP.6.0 MSXML2.XMLHTTP.5.0 MSXML2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP".split(" "); return { send: function (e) { for (var h in e) e.hasOwnProperty(h) && e[h].length && k(e[h]) }, buildPOSTBodyLog: e, isSupported: !0 }
    }(), F = function () {
        return {
            send: function (h) {
                for (var e in h) if (h.hasOwnProperty(e)) {
                    for (var k = h[e], b = k, w = {}, I = void 0,
                        A = 0; A < b.length; A++)I = b[A].c, w[I] || (w[I] = []), w[I].push(b[A]); var k = k[0] || {}, b = k.sn || f.ue_sn, k = t + (k.m || f.ue_mid) + ":" + (k.s || f.ue_sid) + ":" + (k.r || a.rid) + (b ? ":" + b : ""), b = [], I = k, A = [], c = void 0; for (c in w) if (w.hasOwnProperty(c)) for (var T = 0; T < w[c].length; T++) { var p = w[c][T], r = encodeURIComponent((p.cs ? d : G)(p.d)); A.push({ l: r, t: p.t, p: 1, c: c, d: p.cs ? "c" : "j" }) } w = A; A = void 0; c = "$"; for (p = 0; p < w.length;) {
                            T = w[p]; A != T.c ? (I += c + T.c + "=", c = "&", A = T.c) : I += ","; var r = I, l = T.d + ":", g = T, I = (g.l.match(".{1," + (O - I.length) + "}[^%]{0,2}") ||
                                [])[0] || ""; g.l = g.l.substr(I.length); I = r + (l + I + ":" + T.t); if (T.l) I += ":" + T.p++ + "_", b.push(I), I = k, c = "$", A = 0; else if (p++ , 1 != T.p) for (I += ":" + T.p + "_" + T.p, r = 0; r < T.p - 1; r++)b[b.length - r - 1] += T.p
                        } b.push(I); k = b; for (b = 0; b < k.length; b++)(new Image).src = k[b]
                }
            }, isSupported: !0
        }
    }(), A = function () { return { send: function (h) { for (var e in h) if (h.hasOwnProperty(e)) { var k = H.buildPOSTBodyLog(h[e]); if (!navigator.sendBeacon(t, G(k))) throw ""; } }, isSupported: !!navigator.sendBeacon } }(); a._fic = F; a._fac = H; a._fbc = A; a._flq = b; a.sid = a.sid || f.ue_sid;
    a.mid = a.mid || f.ue_mid; a.furl = a.furl || f.ue_furl; a.sn = a.sn || f.ue_sn; a.isBF = function () { var h = c.performance || c.webkitPerformance, e = z.ue_backdetect && z.ue_backdetect.ue_back && document.ue_backdetect.ue_back.value, k = a.bfini; return h && h.navigation && 2 === h.navigation.type || 1 < k || !k && 1 < e }(); a._flhs = a._flhs || 0; a._lpn = a._lpn || {}; try { c.amznJQ && c.amznJQ.declareAvailable && c.amznJQ.declareAvailable("forester-client"), c.P && c.P.register && c.P.register("forester-client", B) } catch (S) { f.ueLogError(S, { logLevel: "WARN" }) } (function () {
    a.log &&
        a.log.isStub && (a.log.replay(function (h, e, k) { var a = h[2] || {}; a.t = e; a.r = k; a.n = 1; v(h[0], h[1], a) }), a.onunload.replay(function (h) { p.push(h[0]) }), a.onflush.replay(function (h) { r.push(h[0]) }))
    })(); a.log = v; a.log.reset = function () { K = 0 }; a.onunload = function (h) { p.push(h) }; a.onflush = function (h) { r.push(h) }; a.attach("beforeunload", D); a.attach("pagehide", D); x("ld", "ue_frst_v2", { wb: 1 })
})(ue_csm, window, document);
(function (f, c) {
    function z(d) { if (d) return d.replace(/^\s+|\s+$/g, "") } function n(d, a) {
        if (!d) return {}; var t = "INFO" === a.logLevel; d.m && d.m.message && (d = d.m); var b = a.m || a.message || "", b = d.m && d.m.message ? b + d.m.message : d.m && d.m.target && d.m.target.tagName ? b + ("Error handler invoked by " + d.m.target.tagName + " tag") : d.m ? b + d.m : d.message ? b + d.message : b + "Unknown error", b = { m: b, name: d.name, type: d.type, csm: O + " " + (d.fromOnError ? "onerror" : "ueLogError") }, c, r, g = 0, l; b.logLevel = a.logLevel || v; a.adb && (b.adb = a.adb); if (c = a.attribution) b.attribution =
            "" + c; if (!t) {
            b.pageURL = a.pageURL || "" + (window.location ? window.location.href : "") || "missing"; b.f = d.f || d.sourceURL || d.fileName || d.filename || d.m && d.m.target && d.m.target.src; b.l = d.l || d.line || d.lineno || d.lineNumber; b.c = d.c ? "" + d.c : d.c; b.s = []; b.t = f.ue.d(); if ((t = d.stack || (d.err ? d.err.stack : "")) && t.split) for (b.csm += " stack", c = t.split("\n"); g < c.length && b.s.length < C;)(t = c[g++]) && b.s.push(z(t)); else for (b.csm += " callee", r = u(d.args || arguments, "callee"), c = g = 0; r && g < C;)l = q, r.skipTrace || (t = r.toString()) && t.substr && (l =
                0 === c ? 4 * q : l, l = 1 == c ? 2 * q : l, b.s.push(t.substr(0, l)), c++), r = u(r, "caller"), g++; if (!b.f && 0 < b.s.length && (g = b) && g.s) { var m, t = 0 < g.s.length ? g.s[0] : ""; c = 1 < g.s.length ? g.s[1] : ""; t && (m = t.match(G)); m && 3 == m.length || !c || (m = c.match(B)); m && 3 == m.length && (g.f = m[1], g.l = m[2]) }
            } return b
    } function u(d, a) { try { return d[a] } catch (f) { } } function g(d, a) {
        if (d) {
            var t = n(d, a), b = window.ue_err ? window.ue_err.addContextInfo : null; b && b(t); f.ue.log(t, a.channel || l, { nb: 1 }); "function" === typeof ue_err.elh && ue_err.elh(d, a); try {
                if (!d.fromOnError) {
                    var p =
                        c.console, r = c.JSON, b = "Error logged with the Track&Report JS errors API(http://tiny/1covqr6l8/wamazindeClieUserJava): "; if (p) { if (r && r.stringify) try { b += r.stringify(t) } catch (g) { b += "no info provided; converting to string failed" } else b += t.m; "function" === typeof p.error ? p.error(b, t) : "function" === typeof p.log && p.log(b, t) }
                }
            } catch (m) { }
        }
    } function m(d, a) {
        if (d && !(f.ue_err.ec > f.ue_err.mxe)) {
            f.ue_err.ter.push(d); a = a || {}; var t = d.logLevel || a.logLevel; a.logLevel = t; a.attribution = d.attribution || a.attribution; t && t !==
                v && t !== D && t !== y && t !== x || f.ue_err.ec++; t && t != v || ue_err.ecf++; g(d, a)
        }
    } if (!f.ueLogError || f.ueLogError.isStub) { var l = f.ue_err_chan || "jserr", v = "FATAL", D = "ERROR", y = "WARN", x = "DOWNGRADED", O = "v5", C = 20, q = 256, B = /\(?([^\s]*):(\d+):\d+\)?/, G = /.*@(.*):(\d*)/; g.skipTrace = 1; n.skipTrace = 1; m.skipTrace = 1; (function () { if (f.ue_err.erl) { var d = f.ue_err.erl.length, a, t; for (a = 0; a < d; a++)t = f.ue_err.erl[a], g(t.ex, t.info); ue_err.erl = [] } })(); f.ueLogError = m }
})(ue_csm, window);
ue_csm.ue.exec(function (f, c) {
    var z = function () { }, n = function () { return { send: function (f, m) { if (m && f) { var l; if (c.XDomainRequest) l = new XDomainRequest, l.onerror = z, l.ontimeout = z, l.onprogress = z, l.onload = z, l.timeout = 0; else if (c.XMLHttpRequest) { if (l = new XMLHttpRequest, !("withCredentials" in l)) throw ""; } else l = void 0; if (!l) throw ""; l.open("POST", f, !0); l.setRequestHeader && l.setRequestHeader("Content-type", "text/plain"); l.send(m) } }, isSupported: !0 } }(), u = function () {
        return {
            send: function (f, c) {
                if (f && c && !navigator.sendBeacon(f,
                    c)) throw "";
            }, isSupported: !!navigator.sendBeacon
        }
    }(); f.ue._ajx = n; f.ue._sBcn = u
}, "Transportation-clients")(ue_csm, window);
ue_csm.ue.exec(function (f, c) {
    function z() { for (var e = 0; e < arguments.length; e++) { var k = arguments[e]; try { var h; if (k.isSupported) { var a = S.buildPayload(p, t); h = k.send(d, a) } else throw dummyException; return h } catch (b) { } } B({ m: "All supported clients failed", attribution: "CSMSushiClient_TRANSPORTATION_FAIL", f: "sushi-client.js", logLevel: "ERROR" }, c.ue_err_chan || "jserr") } function n() { if (t.length) { for (var e = 0; e < J.length; e++)J[e](); z(q._sBcn || {}, q._ajx || {}); t = []; b = {}; p = {}; K = H = r = N = 0 } } function u() {
        var e = new Date, k = function (e) {
            return 10 >
                e ? "0" + e : e
        }; return Date.prototype.toISOString ? e.toISOString() : e.getUTCFullYear() + "-" + k(e.getUTCMonth() + 1) + "-" + k(e.getUTCDate()) + "T" + k(e.getUTCHours()) + ":" + k(e.getUTCMinutes()) + ":" + k(e.getUTCSeconds()) + "." + String((e.getUTCMilliseconds() / 1E3).toFixed(3)).slice(2, 5) + "Z"
    } function g(e) { try { return JSON.stringify(e) } catch (k) { } return null } function m(e, k, h, a) {
        var d = !1; a = a || {}; E++; E == y && B({ m: "Max number of Sushi Logs exceeded", f: "sushi-client.js", logLevel: "ERROR", attribution: "CSMSushiClient_MAX_CALLS" }, c.ue_err_chan ||
            "jserr"); var b; if (b = !(E >= y)) (b = e && -1 < e.constructor.toString().indexOf("Object") && k && -1 < k.constructor.toString().indexOf("String") && h && -1 < h.constructor.toString().indexOf("String")) || L++; b && (e.producerId = e.producerId || k, e.schemaId = e.schemaId || h, e.timestamp = u(), k = Date.now ? Date.now() : +new Date, e.messageId = f.ue_id + "-" + k + "-" + E, a && !a.ssd && (e.sessionId = e.sessionId || f.ue_sid, e.requestId = e.requestId || f.ue_id, e.obfuscatedMarketplaceId = e.obfuscatedMarketplaceId || f.ue_mid), (k = g(e)) ? (k = k.length, (t.length == x ||
                r + k > O) && n(), r += k, e = { data: S.compressEvent(e) }, t.push(e), (a || {}).n ? 0 === F ? n() : K || (K = c.setTimeout(n, F)) : H || (H = c.setTimeout(n, A)), d = !0) : d = !1); !d && f.ue_int && console.error("Invalid JS Nexus API call"); return d
    } function l() { if (!Q) { for (var e = 0; e < M.length; e++)M[e](); for (e = 0; e < J.length; e++)J[e](); t.length && z(q._sBcn || {}); Q = !0 } } function v(e) { M.push(e) } function D(e) { J.push(e) } var y = 1E3, x = 499, O = 524288, C = function () { }, q = f.ue || {}, B = q.log || C, G = f.uex || C; (f.uet || C)("bb", "ue_sushi_v1", { wb: 1 }); var d = f.ue_surl || "https://unagi-na.amazon.com/1/events/com.amazon.csm.nexusclient.gamma",
        a = ["messageId", "timestamp"], t = [], b = {}, p = {}, r = 0, N = 0, L = 0, E = 0, M = [], J = [], Q = !1, K, H, F = void 0 === f.ue_hpsi ? 1E3 : f.ue_hpsi, A = void 0 === f.ue_lpsi ? 1E4 : f.ue_lpsi, S = function () {
            function e(e) { b[e] = "#" + N++; p[b[e]] = e; return b[e] } function k(e) { if (e) switch (typeof e) { case "number": return !(isNaN(e) || Infinity === e) && e.toString().length > ("#" + N).length; case "boolean": break; case "string": return e.length > ("#" + N).length; default: return !0 }return !1 } function h(w) {
                if (k(w)) {
                    var d = 0; w instanceof Array ? d = 2 : w instanceof Function ? d = 0 : w instanceof
                        Object && (d = 1); switch (d) { case 0: w = b[w] ? b[w] : e(w); break; case 2: var f = w; w = []; for (var d = f.length, t = 0; t < d; t++)w[t] = h(f[t]); break; case 1: d = {}; for (f in w) w.hasOwnProperty(f) && (d[b[f] ? b[f] : e(f)] = -1 == a.indexOf(f) ? h(w[f]) : w[f]); w = d }
                } return w
            } return { compressEvent: h, buildPayload: function () { return g({ cs: { dct: p }, events: t }) } }
        }(); (function () { q.event && q.event.isStub && (q.event.replay(function (e) { e[3] = e[3] || {}; e[3].n = 1; m.apply(this, e) }), q.onSushiUnload.replay(function (e) { v(e[0]) }), q.onSushiFlush.replay(function (e) { D(e[0]) })) })();
    q.attach("beforeunload", l); q.attach("pagehide", l); q._cmps = S; q.event = m; q.event.reset = function () { E = 0 }; q.onSushiUnload = v; q.onSushiFlush = D; try { c.P && c.P.register && c.P.register("sushi-client", C) } catch (h) { f.ueLogError(h, { logLevel: "WARN" }) } G("ld", "ue_sushi_v1", { wb: 1 })
}, "Nxs-JS-Client")(ue_csm, window);
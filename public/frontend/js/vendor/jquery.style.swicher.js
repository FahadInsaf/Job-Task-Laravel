! function(o) {
    var t, i, s = {
            hasPreview: !0,
            defaultThemeId: "jssDefault",
            fullPath: "css/",
            cookie: {
                expires: "",
                isManagingLoad: !0
            }
        },
        a = "jss_selected";
    i = {
        getItem: function(e) {
            return e && decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
        },
        setItem: function(e, t, s, o, i, a) {
            if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
            var n = "";
            if (s) switch (s.constructor) {
                case Number:
                    n = s === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + s;
                    break;
                case String:
                    n = "; expires=" + s;
                    break;
                case Date:
                    n = "; expires=" + s.toUTCString()
            }
            return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + n + (i ? "; domain=" + i : "") + (o ? "; path=" + o : "") + (a ? "; secure" : ""), !0
        },
        removeItem: function(e, t, s) {
            return !!this.hasItem(e) && (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (s ? "; domain=" + s : "") + (t ? "; path=" + t : ""), !0)
        },
        hasItem: function(e) {
            return !!e && new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
        },
        keys: function() {
            for (var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), t = e.length, s = 0; s < t; s++) e[s] = decodeURIComponent(e[s]);
            return e
        }
    }, (t = function(e, t) {
        return this.init(e, t)
    }).prototype = {
        $root: null,
        config: {},
        $themeCss: null,
        defaultTheme: null,
        init: function(e, t) {
            this.$root = e, this.config = t || {}, this.setDefaultTheme(), this.defaultTheme ? (this.config.cookie && this.checkCookie(), this.config.hasPreview && this.addHoverEvents(), this.addClickEvents()) : this.$root.addClass("jssError error level0")
        },
        setDefaultTheme: function() {
            this.$themeCss = o("link[id=" + this.config.defaultThemeId + "]"), this.$themeCss.length && (this.defaultTheme = this.$themeCss.attr("href"))
        },
        resetStyle: function() {
            this.updateStyle(this.defaultTheme)
        },
        updateStyle: function(e) {
            this.$themeCss.attr("href", e)
        },
        getFullAssetPath: function(e) {
            return this.config.fullPath + e + ".css"
        },
        checkCookie: function() {
            var e;
            this.config.cookie && this.config.cookie.isManagingLoad && (e = i.getItem(a)) && (newStyle = this.getFullAssetPath(e), this.updateStyle(newStyle), this.defaultTheme = newStyle)
        },
        addHoverEvents: function() {
            var t = this;
            this.$root.find("a").hover(function() {
                var e = o(this).data("theme"),
                    e = t.getFullAssetPath(e);
                t.updateStyle(e)
            }, function() {
                t.resetStyle()
            })
        },
        addClickEvents: function() {
            var s = this;
            this.$root.find(".setColor").on("click", function() {
                var e = o(this).data("theme"),
                    t = s.getFullAssetPath(e);
                s.updateStyle(t), s.defaultTheme = t, s.config.cookie && i.setItem(a, e, s.config.cookie.expires, "/")
            })
        }
    }, o.fn.styleSwitcher = function(e) {
        return new t(this, o.extend(!0, s, e))
    }, o(function() {
        function e() {
            styleCookieVal = o("body").hasClass("active-dark-mode") ? "dark" : "light", Cookies.set("styleCookieName", styleCookieVal, {
                expires: 7
            })
        }
        "dark" == Cookies.get("styleCookieName") ? o("body").addClass("active-dark-mode") : (Cookies.get("styleCookieName"), o("body").removeClass("active-light-mode"));
        var t = Cookies.get("styleCookieName");
        "dark" == t ? (o("#my_switcher").find(".setColor.dark").addClass("active"), o("body").removeClass("active-light-mode").addClass("active-dark-mode")) : "light" == t ? (o("#my_switcher").find(".setColor.light").addClass("active"), o("body").removeClass("active-dark-mode").addClass("active-light-mode")) : o("body").hasClass("active-dark-mode") ? (o("#my_switcher").find(".setColor.light").removeClass("active"), o("#my_switcher").find(".setColor.dark").addClass("active")) : (o("#my_switcher").find(".setColor.dark").removeClass("active"), o("#my_switcher").find(".setColor.light").addClass("active")), o("#my_switcher .setColor").on("click", function() {
            o(this).closest("ul").find("li").siblings().find(".active").removeClass("active"), o(this).addClass("active"), e()
        }), o("#my_switcher .setColor.dark").on("click", function() {
            o("body").removeClass("active-light-mode").addClass("active-dark-mode"), e()
        }), o("#my_switcher .setColor.light").on("click", function() {
            o("body").removeClass("active-dark-mode").addClass("active-light-mode"), e()
        })
    })
}(jQuery);
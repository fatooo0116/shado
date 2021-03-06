! function(a, b) {
    "use strict";

    function c() {
        d.READY || (d.event.determineEventTypes(), d.utils.each(d.gestures, function(a) {
            d.detection.register(a)
        }), d.event.onTouch(d.DOCUMENT, d.EVENT_MOVE, d.detection.detect), d.event.onTouch(d.DOCUMENT, d.EVENT_END, d.detection.detect), d.READY = !0)
    }
    var d = function(a, b) {
        return new d.Instance(a, b || {})
    };
    d.defaults = {
        stop_browser_behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    }, d.HAS_POINTEREVENTS = a.navigator.pointerEnabled || a.navigator.msPointerEnabled, d.HAS_TOUCHEVENTS = "ontouchstart" in a, d.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i, d.NO_MOUSEEVENTS = d.HAS_TOUCHEVENTS && a.navigator.userAgent.match(d.MOBILE_REGEX), d.EVENT_TYPES = {}, d.DIRECTION_DOWN = "down", d.DIRECTION_LEFT = "left", d.DIRECTION_UP = "up", d.DIRECTION_RIGHT = "right", d.POINTER_MOUSE = "mouse", d.POINTER_TOUCH = "touch", d.POINTER_PEN = "pen", d.EVENT_START = "start", d.EVENT_MOVE = "move", d.EVENT_END = "end", d.DOCUMENT = a.document, d.plugins = d.plugins || {}, d.gestures = d.gestures || {}, d.READY = !1, d.utils = {
        extend: function(a, c, d) {
            for (var e in c) a[e] !== b && d || (a[e] = c[e]);
            return a
        },
        each: function(a, c, d) {
            var e, f;
            if ("forEach" in a) a.forEach(c, d);
            else if (a.length !== b) {
                for (e = 0, f = a.length; f > e; e++)
                    if (c.call(d, a[e], e, a) === !1) return
            } else
                for (e in a)
                    if (a.hasOwnProperty(e) && c.call(d, a[e], e, a) === !1) return
        },
        hasParent: function(a, b) {
            for (; a;) {
                if (a == b) return !0;
                a = a.parentNode
            }
            return !1
        },
        getCenter: function(a) {
            var b = [],
                c = [];
            return d.utils.each(a, function(a) {
                b.push("undefined" != typeof a.clientX ? a.clientX : a.pageX), c.push("undefined" != typeof a.clientY ? a.clientY : a.pageY)
            }), {
                pageX: (Math.min.apply(Math, b) + Math.max.apply(Math, b)) / 2,
                pageY: (Math.min.apply(Math, c) + Math.max.apply(Math, c)) / 2
            }
        },
        getVelocity: function(a, b, c) {
            return {
                x: Math.abs(b / a) || 0,
                y: Math.abs(c / a) || 0
            }
        },
        getAngle: function(a, b) {
            var c = b.pageY - a.pageY,
                d = b.pageX - a.pageX;
            return 180 * Math.atan2(c, d) / Math.PI
        },
        getDirection: function(a, b) {
            var c = Math.abs(a.pageX - b.pageX),
                e = Math.abs(a.pageY - b.pageY);
            return c >= e ? a.pageX - b.pageX > 0 ? d.DIRECTION_LEFT : d.DIRECTION_RIGHT : a.pageY - b.pageY > 0 ? d.DIRECTION_UP : d.DIRECTION_DOWN
        },
        getDistance: function(a, b) {
            var c = b.pageX - a.pageX,
                d = b.pageY - a.pageY;
            return Math.sqrt(c * c + d * d)
        },
        getScale: function(a, b) {
            return a.length >= 2 && b.length >= 2 ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]) : 1
        },
        getRotation: function(a, b) {
            return a.length >= 2 && b.length >= 2 ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]) : 0
        },
        isVertical: function(a) {
            return a == d.DIRECTION_UP || a == d.DIRECTION_DOWN
        },
        stopDefaultBrowserBehavior: function(a, b) {
            b && a && a.style && (d.utils.each(["webkit", "khtml", "moz", "Moz", "ms", "o", ""], function(c) {
                d.utils.each(b, function(b) {
                    c && (b = c + b.substring(0, 1).toUpperCase() + b.substring(1)), b in a.style && (a.style[b] = b)
                })
            }), "none" == b.userSelect && (a.onselectstart = function() {
                return !1
            }), "none" == b.userDrag && (a.ondragstart = function() {
                return !1
            }))
        }
    }, d.Instance = function(a, b) {
        var e = this;
        return c(), this.element = a, this.enabled = !0, this.options = d.utils.extend(d.utils.extend({}, d.defaults), b || {}), this.options.stop_browser_behavior && d.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), d.event.onTouch(a, d.EVENT_START, function(a) {
            e.enabled && d.detection.startDetect(e, a)
        }), this
    }, d.Instance.prototype = {
        on: function(a, b) {
            var c = a.split(" ");
            return d.utils.each(c, function(a) {
                this.element.addEventListener(a, b, !1)
            }, this), this
        },
        off: function(a, b) {
            var c = a.split(" ");
            return d.utils.each(c, function(a) {
                this.element.removeEventListener(a, b, !1)
            }, this), this
        },
        trigger: function(a, b) {
            b || (b = {});
            var c = d.DOCUMENT.createEvent("Event");
            c.initEvent(a, !0, !0), c.gesture = b;
            var e = this.element;
            return d.utils.hasParent(b.target, e) && (e = b.target), e.dispatchEvent(c), this
        },
        enable: function(a) {
            return this.enabled = a, this
        }
    };
    var e = null,
        f = !1,
        g = !1;
    d.event = {
        bindDom: function(a, b, c) {
            var e = b.split(" ");
            d.utils.each(e, function(b) {
                a.addEventListener(b, c, !1)
            })
        },
        onTouch: function(a, b, c) {
            var h = this;
            this.bindDom(a, d.EVENT_TYPES[b], function(i) {
                var j = i.type.toLowerCase();
                if (!j.match(/mouse/) || !g) {
                    j.match(/touch/) || j.match(/pointerdown/) || j.match(/mouse/) && 1 === i.which ? f = !0 : j.match(/mouse/) && !i.which && (f = !1), j.match(/touch|pointer/) && (g = !0);
                    var k = 0;
                    f && (d.HAS_POINTEREVENTS && b != d.EVENT_END ? k = d.PointerEvent.updatePointer(b, i) : j.match(/touch/) ? k = i.touches.length : g || (k = j.match(/up/) ? 0 : 1), k > 0 && b == d.EVENT_END ? b = d.EVENT_MOVE : k || (b = d.EVENT_END), (k || null === e) && (e = i), c.call(d.detection, h.collectEventData(a, b, h.getTouchList(e, b), i)), d.HAS_POINTEREVENTS && b == d.EVENT_END && (k = d.PointerEvent.updatePointer(b, i))), k || (e = null, f = !1, g = !1, d.PointerEvent.reset())
                }
            })
        },
        determineEventTypes: function() {
            var a;
            a = d.HAS_POINTEREVENTS ? d.PointerEvent.getEvents() : d.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], d.EVENT_TYPES[d.EVENT_START] = a[0], d.EVENT_TYPES[d.EVENT_MOVE] = a[1], d.EVENT_TYPES[d.EVENT_END] = a[2]
        },
        getTouchList: function(a) {
            return d.HAS_POINTEREVENTS ? d.PointerEvent.getTouchList() : a.touches ? a.touches : (a.identifier = 1, [a])
        },
        collectEventData: function(a, b, c, e) {
            var f = d.POINTER_TOUCH;
            return (e.type.match(/mouse/) || d.PointerEvent.matchType(d.POINTER_MOUSE, e)) && (f = d.POINTER_MOUSE), {
                center: d.utils.getCenter(c),
                timeStamp: (new Date).getTime(),
                target: e.target,
                touches: c,
                eventType: b,
                pointerType: f,
                srcEvent: e,
                preventDefault: function() {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                },
                stopPropagation: function() {
                    this.srcEvent.stopPropagation()
                },
                stopDetect: function() {
                    return d.detection.stopDetect()
                }
            }
        }
    }, d.PointerEvent = {
        pointers: {},
        getTouchList: function() {
            var a = this,
                b = [];
            return d.utils.each(a.pointers, function(a) {
                b.push(a)
            }), b
        },
        updatePointer: function(a, b) {
            return a == d.EVENT_END ? this.pointers = {} : (b.identifier = b.pointerId, this.pointers[b.pointerId] = b), Object.keys(this.pointers).length
        },
        matchType: function(a, b) {
            if (!b.pointerType) return !1;
            var c = b.pointerType,
                e = {};
            return e[d.POINTER_MOUSE] = c === b.MSPOINTER_TYPE_MOUSE || c === d.POINTER_MOUSE, e[d.POINTER_TOUCH] = c === b.MSPOINTER_TYPE_TOUCH || c === d.POINTER_TOUCH, e[d.POINTER_PEN] = c === b.MSPOINTER_TYPE_PEN || c === d.POINTER_PEN, e[a]
        },
        getEvents: function() {
            return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        },
        reset: function() {
            this.pointers = {}
        }
    }, d.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function(a, b) {
            this.current || (this.stopped = !1, this.current = {
                inst: a,
                startEvent: d.utils.extend({}, b),
                lastEvent: !1,
                name: ""
            }, this.detect(b))
        },
        detect: function(a) {
            if (this.current && !this.stopped) {
                a = this.extendEventData(a);
                var b = this.current.inst.options;
                return d.utils.each(this.gestures, function(c) {
                    return this.stopped || b[c.name] === !1 || c.handler.call(c, a, this.current.inst) !== !1 ? void 0 : (this.stopDetect(), !1)
                }, this), this.current && (this.current.lastEvent = a), a.eventType == d.EVENT_END && !a.touches.length - 1 && this.stopDetect(), a
            }
        },
        stopDetect: function() {
            this.previous = d.utils.extend({}, this.current), this.current = null, this.stopped = !0
        },
        extendEventData: function(a) {
            var b = this.current.startEvent;
            !b || a.touches.length == b.touches.length && a.touches !== b.touches || (b.touches = [], d.utils.each(a.touches, function(a) {
                b.touches.push(d.utils.extend({}, a))
            }));
            var c, e, f = a.timeStamp - b.timeStamp,
                g = a.center.pageX - b.center.pageX,
                h = a.center.pageY - b.center.pageY,
                i = d.utils.getVelocity(f, g, h);
            return "end" === a.eventType ? (c = this.current.lastEvent && this.current.lastEvent.interimAngle, e = this.current.lastEvent && this.current.lastEvent.interimDirection) : (c = this.current.lastEvent && d.utils.getAngle(this.current.lastEvent.center, a.center), e = this.current.lastEvent && d.utils.getDirection(this.current.lastEvent.center, a.center)), d.utils.extend(a, {
                deltaTime: f,
                deltaX: g,
                deltaY: h,
                velocityX: i.x,
                velocityY: i.y,
                distance: d.utils.getDistance(b.center, a.center),
                angle: d.utils.getAngle(b.center, a.center),
                interimAngle: c,
                direction: d.utils.getDirection(b.center, a.center),
                interimDirection: e,
                scale: d.utils.getScale(b.touches, a.touches),
                rotation: d.utils.getRotation(b.touches, a.touches),
                startEvent: b
            }), a
        },
        register: function(a) {
            var c = a.defaults || {};
            return c[a.name] === b && (c[a.name] = !0), d.utils.extend(d.defaults, c, !0), a.index = a.index || 1e3, this.gestures.push(a), this.gestures.sort(function(a, b) {
                return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
            }), this.gestures
        }
    }, d.gestures.Drag = {
        name: "drag",
        index: 50,
        defaults: {
            drag_min_distance: 10,
            correct_for_drag_min_distance: !0,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function(a, b) {
            if (d.detection.current.name != this.name && this.triggered) return b.trigger(this.name + "end", a), void(this.triggered = !1);
            if (!(b.options.drag_max_touches > 0 && a.touches.length > b.options.drag_max_touches)) switch (a.eventType) {
                case d.EVENT_START:
                    this.triggered = !1;
                    break;
                case d.EVENT_MOVE:
                    if (a.distance < b.options.drag_min_distance && d.detection.current.name != this.name) return;
                    if (d.detection.current.name != this.name && (d.detection.current.name = this.name, b.options.correct_for_drag_min_distance && a.distance > 0)) {
                        var c = Math.abs(b.options.drag_min_distance / a.distance);
                        d.detection.current.startEvent.center.pageX += a.deltaX * c, d.detection.current.startEvent.center.pageY += a.deltaY * c, a = d.detection.extendEventData(a)
                    }(d.detection.current.lastEvent.drag_locked_to_axis || b.options.drag_lock_to_axis && b.options.drag_lock_min_distance <= a.distance) && (a.drag_locked_to_axis = !0);
                    var e = d.detection.current.lastEvent.direction;
                    a.drag_locked_to_axis && e !== a.direction && (a.direction = d.utils.isVertical(e) ? a.deltaY < 0 ? d.DIRECTION_UP : d.DIRECTION_DOWN : a.deltaX < 0 ? d.DIRECTION_LEFT : d.DIRECTION_RIGHT), this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0), b.trigger(this.name, a), b.trigger(this.name + a.direction, a), (b.options.drag_block_vertical && d.utils.isVertical(a.direction) || b.options.drag_block_horizontal && !d.utils.isVertical(a.direction)) && a.preventDefault();
                    break;
                case d.EVENT_END:
                    this.triggered && b.trigger(this.name + "end", a), this.triggered = !1
            }
        }
    }, d.gestures.Hold = {
        name: "hold",
        index: 10,
        defaults: {
            hold_timeout: 500,
            hold_threshold: 1
        },
        timer: null,
        handler: function(a, b) {
            switch (a.eventType) {
                case d.EVENT_START:
                    clearTimeout(this.timer), d.detection.current.name = this.name, this.timer = setTimeout(function() {
                        "hold" == d.detection.current.name && b.trigger("hold", a)
                    }, b.options.hold_timeout);
                    break;
                case d.EVENT_MOVE:
                    a.distance > b.options.hold_threshold && clearTimeout(this.timer);
                    break;
                case d.EVENT_END:
                    clearTimeout(this.timer)
            }
        }
    }, d.gestures.Release = {
        name: "release",
        index: 1 / 0,
        handler: function(a, b) {
            a.eventType == d.EVENT_END && b.trigger(this.name, a)
        }
    }, d.gestures.Swipe = {
        name: "swipe",
        index: 40,
        defaults: {
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            swipe_velocity: .7
        },
        handler: function(a, b) {
            if (a.eventType == d.EVENT_END) {
                if (b.options.swipe_max_touches > 0 && a.touches.length < b.options.swipe_min_touches && a.touches.length > b.options.swipe_max_touches) return;
                (a.velocityX > b.options.swipe_velocity || a.velocityY > b.options.swipe_velocity) && (b.trigger(this.name, a), b.trigger(this.name + a.direction, a))
            }
        }
    }, d.gestures.Tap = {
        name: "tap",
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        handler: function(a, b) {
            if (a.eventType == d.EVENT_END && "touchcancel" != a.srcEvent.type) {
                var c = d.detection.previous,
                    e = !1;
                if (a.deltaTime > b.options.tap_max_touchtime || a.distance > b.options.tap_max_distance) return;
                c && "tap" == c.name && a.timeStamp - c.lastEvent.timeStamp < b.options.doubletap_interval && a.distance < b.options.doubletap_distance && (b.trigger("doubletap", a), e = !0), (!e || b.options.tap_always) && (d.detection.current.name = "tap", b.trigger(d.detection.current.name, a))
            }
        }
    }, d.gestures.Touch = {
        name: "touch",
        index: -1 / 0,
        defaults: {
            prevent_default: !1,
            prevent_mouseevents: !1
        },
        handler: function(a, b) {
            return b.options.prevent_mouseevents && a.pointerType == d.POINTER_MOUSE ? void a.stopDetect() : (b.options.prevent_default && a.preventDefault(), void(a.eventType == d.EVENT_START && b.trigger(this.name, a)))
        }
    }, d.gestures.Transform = {
        name: "transform",
        index: 45,
        defaults: {
            transform_min_scale: .01,
            transform_min_rotation: 1,
            transform_always_block: !1
        },
        triggered: !1,
        handler: function(a, b) {
            if (d.detection.current.name != this.name && this.triggered) return b.trigger(this.name + "end", a), void(this.triggered = !1);
            if (!(a.touches.length < 2)) switch (b.options.transform_always_block && a.preventDefault(), a.eventType) {
                case d.EVENT_START:
                    this.triggered = !1;
                    break;
                case d.EVENT_MOVE:
                    var c = Math.abs(1 - a.scale),
                        e = Math.abs(a.rotation);
                    if (c < b.options.transform_min_scale && e < b.options.transform_min_rotation) return;
                    d.detection.current.name = this.name, this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0), b.trigger(this.name, a), e > b.options.transform_min_rotation && b.trigger("rotate", a), c > b.options.transform_min_scale && (b.trigger("pinch", a), b.trigger("pinch" + (a.scale < 1 ? "in" : "out"), a));
                    break;
                case d.EVENT_END:
                    this.triggered && b.trigger(this.name + "end", a), this.triggered = !1
            }
        }
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return d
    }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = d : a.Hammer = d
}(this),
    function(a, b) {
        "use strict";

        function c(a, c) {
            a.event.bindDom = function(a, d, e) {
                c(a).on(d, function(a) {
                    var c = a.originalEvent || a;
                    c.pageX === b && (c.pageX = a.pageX, c.pageY = a.pageY), c.target || (c.target = a.target), c.which === b && (c.which = c.button), c.preventDefault || (c.preventDefault = a.preventDefault), c.stopPropagation || (c.stopPropagation = a.stopPropagation), e.call(this, c)
                })
            }, a.Instance.prototype.on = function(a, b) {
                return c(this.element).on(a, b)
            }, a.Instance.prototype.off = function(a, b) {
                return c(this.element).off(a, b)
            }, a.Instance.prototype.trigger = function(a, b) {
                var d = c(this.element);
                return d.has(b.target).length && (d = c(b.target)), d.trigger({
                    type: a,
                    gesture: b
                })
            }, c.fn.hammer = function(b) {
                return this.each(function() {
                    var d = c(this),
                        e = d.data("hammer");
                    e ? e && b && a.utils.extend(e.options, b) : d.data("hammer", new a(this, b || {}))
                })
            }
        }
        "function" == typeof define && "object" == typeof define.amd && define.amd ? define(["hammerjs", "jquery"], c) : c(a.Hammer, a.jQuery || a.Zepto)
    }(this);
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});
(function($) {
    $.transit = {
        version: "0.9.9",
        propertyMap: {
            marginLeft: 'margin',
            marginRight: 'margin',
            marginBottom: 'margin',
            marginTop: 'margin',
            paddingLeft: 'padding',
            paddingRight: 'padding',
            paddingBottom: 'padding',
            paddingTop: 'padding'
        },
        enabled: true,
        useTransitionEnd: false
    };
    var div = document.createElement('div');
    var support = {};

    function getVendorPropertyName(prop) {
        if (prop in div.style) return prop;
        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);
        if (prop in div.style) {
            return prop;
        }
        for (var i = 0; i < prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in div.style) {
                return vendorProp;
            }
        }
    }

    function checkTransform3dSupport() {
        div.style[support.transform] = '';
        div.style[support.transform] = 'rotateY(90deg)';
        return div.style[support.transform] !== '';
    }
    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    support.transition = getVendorPropertyName('transition');
    support.transitionDelay = getVendorPropertyName('transitionDelay');
    support.transform = getVendorPropertyName('transform');
    support.transformOrigin = getVendorPropertyName('transformOrigin');
    support.filter = getVendorPropertyName('Filter');
    support.transform3d = checkTransform3dSupport();
    var eventNames = {
        'transition': 'transitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    };
    var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;
    for (var key in support) {
        if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
            $.support[key] = support[key];
        }
    }
    div = null;
    $.cssEase = {
        '_default': 'ease',
        'in': 'ease-in',
        'out': 'ease-out',
        'in-out': 'ease-in-out',
        'snap': 'cubic-bezier(0,1,.5,1)',
        'easeOutCubic': 'cubic-bezier(.215,.61,.355,1)',
        'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
        'easeInCirc': 'cubic-bezier(.6,.04,.98,.335)',
        'easeOutCirc': 'cubic-bezier(.075,.82,.165,1)',
        'easeInOutCirc': 'cubic-bezier(.785,.135,.15,.86)',
        'easeInExpo': 'cubic-bezier(.95,.05,.795,.035)',
        'easeOutExpo': 'cubic-bezier(.19,1,.22,1)',
        'easeInOutExpo': 'cubic-bezier(1,0,0,1)',
        'easeInQuad': 'cubic-bezier(.55,.085,.68,.53)',
        'easeOutQuad': 'cubic-bezier(.25,.46,.45,.94)',
        'easeInOutQuad': 'cubic-bezier(.455,.03,.515,.955)',
        'easeInQuart': 'cubic-bezier(.895,.03,.685,.22)',
        'easeOutQuart': 'cubic-bezier(.165,.84,.44,1)',
        'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
        'easeInQuint': 'cubic-bezier(.755,.05,.855,.06)',
        'easeOutQuint': 'cubic-bezier(.23,1,.32,1)',
        'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
        'easeInSine': 'cubic-bezier(.47,0,.745,.715)',
        'easeOutSine': 'cubic-bezier(.39,.575,.565,1)',
        'easeInOutSine': 'cubic-bezier(.445,.05,.55,.95)',
        'easeInBack': 'cubic-bezier(.6,-.28,.735,.045)',
        'easeOutBack': 'cubic-bezier(.175, .885,.32,1.275)',
        'easeInOutBack': 'cubic-bezier(.68,-.55,.265,1.55)'
    };
    $.cssHooks['transit:transform'] = {
        get: function(elem) {
            return $(elem).data('transform') || new Transform();
        },
        set: function(elem, v) {
            var value = v;
            if (!(value instanceof Transform)) {
                value = new Transform(value);
            }
            if (support.transform === 'WebkitTransform' && !isChrome) {
                elem.style[support.transform] = value.toString(true);
            } else {
                elem.style[support.transform] = value.toString();
            }
            $(elem).data('transform', value);
        }
    };
    $.cssHooks.transform = {
        set: $.cssHooks['transit:transform'].set
    };
    $.cssHooks.filter = {
        get: function(elem) {
            return elem.style[support.filter];
        },
        set: function(elem, value) {
            elem.style[support.filter] = value;
        }
    };
    if ($.fn.jquery < "1.8") {
        $.cssHooks.transformOrigin = {
            get: function(elem) {
                return elem.style[support.transformOrigin];
            },
            set: function(elem, value) {
                elem.style[support.transformOrigin] = value;
            }
        };
        $.cssHooks.transition = {
            get: function(elem) {
                return elem.style[support.transition];
            },
            set: function(elem, value) {
                elem.style[support.transition] = value;
            }
        };
    }
    registerCssHook('scale');
    registerCssHook('translate');
    registerCssHook('rotate');
    registerCssHook('rotateX');
    registerCssHook('rotateY');
    registerCssHook('rotate3d');
    registerCssHook('perspective');
    registerCssHook('skewX');
    registerCssHook('skewY');
    registerCssHook('x', true);
    registerCssHook('y', true);

    function Transform(str) {
        if (typeof str === 'string') {
            this.parse(str);
        }
        return this;
    }
    Transform.prototype = {
        setFromString: function(prop, val) {
            var args = (typeof val === 'string') ? val.split(',') : (val.constructor === Array) ? val : [val];
            args.unshift(prop);
            Transform.prototype.set.apply(this, args);
        },
        set: function(prop) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            if (this.setter[prop]) {
                this.setter[prop].apply(this, args);
            } else {
                this[prop] = args.join(',');
            }
        },
        get: function(prop) {
            if (this.getter[prop]) {
                return this.getter[prop].apply(this);
            } else {
                return this[prop] || 0;
            }
        },
        setter: {
            rotate: function(theta) {
                this.rotate = unit(theta, 'deg');
            },
            rotateX: function(theta) {
                this.rotateX = unit(theta, 'deg');
            },
            rotateY: function(theta) {
                this.rotateY = unit(theta, 'deg');
            },
            scale: function(x, y) {
                if (y === undefined) {
                    y = x;
                }
                this.scale = x + "," + y;
            },
            skewX: function(x) {
                this.skewX = unit(x, 'deg');
            },
            skewY: function(y) {
                this.skewY = unit(y, 'deg');
            },
            perspective: function(dist) {
                this.perspective = unit(dist, 'px');
            },
            x: function(x) {
                this.set('translate', x, null);
            },
            y: function(y) {
                this.set('translate', null, y);
            },
            translate: function(x, y) {
                if (this._translateX === undefined) {
                    this._translateX = 0;
                }
                if (this._translateY === undefined) {
                    this._translateY = 0;
                }
                if (x !== null && x !== undefined) {
                    this._translateX = unit(x, 'px');
                }
                if (y !== null && y !== undefined) {
                    this._translateY = unit(y, 'px');
                }
                this.translate = this._translateX + "," + this._translateY;
            }
        },
        getter: {
            x: function() {
                return this._translateX || 0;
            },
            y: function() {
                return this._translateY || 0;
            },
            scale: function() {
                var s = (this.scale || "1,1").split(',');
                if (s[0]) {
                    s[0] = parseFloat(s[0]);
                }
                if (s[1]) {
                    s[1] = parseFloat(s[1]);
                }
                return (s[0] === s[1]) ? s[0] : s;
            },
            rotate3d: function() {
                var s = (this.rotate3d || "0,0,0,0deg").split(',');
                for (var i = 0; i <= 3; ++i) {
                    if (s[i]) {
                        s[i] = parseFloat(s[i]);
                    }
                }
                if (s[3]) {
                    s[3] = unit(s[3], 'deg');
                }
                return s;
            }
        },
        parse: function(str) {
            var self = this;
            str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
                self.setFromString(prop, val);
            });
        },
        toString: function(use3d) {
            var re = [];
            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    if ((!support.transform3d) && ((i === 'rotateX') || (i === 'rotateY') || (i === 'perspective') || (i === 'transformOrigin'))) {
                        continue;
                    }
                    if (i[0] !== '_') {
                        if (use3d && (i === 'scale')) {
                            re.push(i + "3d(" + this[i] + ",1)");
                        } else if (use3d && (i === 'translate')) {
                            re.push(i + "3d(" + this[i] + ",0)");
                        } else {
                            re.push(i + "(" + this[i] + ")");
                        }
                    }
                }
            }
            return re.join(" ");
        }
    };

    function callOrQueue(self, queue, fn) {
        if (queue === true) {
            self.queue(fn);
        } else if (queue) {
            self.queue(queue, fn);
        } else {
            fn();
        }
    }

    function getProperties(props) {
        var re = [];
        $.each(props, function(key) {
            key = $.camelCase(key);
            key = $.transit.propertyMap[key] || $.cssProps[key] || key;
            key = uncamel(key);
            if (support[key])
                key = uncamel(support[key]);
            if ($.inArray(key, re) === -1) {
                re.push(key);
            }
        });
        return re;
    }

    function getTransition(properties, duration, easing, delay) {
        var props = getProperties(properties);
        if ($.cssEase[easing]) {
            easing = $.cssEase[easing];
        }
        var attribs = '' + toMS(duration) + ' ' + easing;
        if (parseInt(delay, 10) > 0) {
            attribs += ' ' + toMS(delay);
        }
        var transitions = [];
        $.each(props, function(i, name) {
            transitions.push(name + ' ' + attribs);
        });
        return transitions.join(', ');
    }
    $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
        var self = this;
        var delay = 0;
        var queue = true;
        var theseProperties = jQuery.extend(true, {}, properties);
        if (typeof duration === 'function') {
            callback = duration;
            duration = undefined;
        }
        if (typeof duration === 'object') {
            easing = duration.easing;
            delay = duration.delay || 0;
            queue = duration.queue || true;
            callback = duration.complete;
            duration = duration.duration;
        }
        if (typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }
        if (typeof theseProperties.easing !== 'undefined') {
            easing = theseProperties.easing;
            delete theseProperties.easing;
        }
        if (typeof theseProperties.duration !== 'undefined') {
            duration = theseProperties.duration;
            delete theseProperties.duration;
        }
        if (typeof theseProperties.complete !== 'undefined') {
            callback = theseProperties.complete;
            delete theseProperties.complete;
        }
        if (typeof theseProperties.queue !== 'undefined') {
            queue = theseProperties.queue;
            delete theseProperties.queue;
        }
        if (typeof theseProperties.delay !== 'undefined') {
            delay = theseProperties.delay;
            delete theseProperties.delay;
        }
        if (typeof duration === 'undefined') {
            duration = $.fx.speeds._default;
        }
        if (typeof easing === 'undefined') {
            easing = $.cssEase._default;
        }
        duration = toMS(duration);
        var transitionValue = getTransition(theseProperties, duration, easing, delay);
        var work = $.transit.enabled && support.transition;
        var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;
        if (i === 0) {
            var fn = function(next) {
                self.css(theseProperties);
                if (callback) {
                    callback.apply(self);
                }
                if (next) {
                    next();
                }
            };
            callOrQueue(self, queue, fn);
            return self;
        }
        var oldTransitions = {};
        var run = function(nextCall) {
            var bound = false;
            var cb = function() {
                if (bound) {
                    self.unbind(transitionEnd, cb);
                }
                if (i > 0) {
                    self.each(function() {
                        this.style[support.transition] = (oldTransitions[this] || null);
                    });
                }
                if (typeof callback === 'function') {
                    callback.apply(self);
                }
                if (typeof nextCall === 'function') {
                    nextCall();
                }
            };
            if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
                bound = true;
                self.bind(transitionEnd, cb);
            } else {
                window.setTimeout(cb, i);
            }
            self.each(function() {
                if (i > 0) {
                    this.style[support.transition] = transitionValue;
                }
                $(this).css(properties);
            });
        };
        var deferredRun = function(next) {
            this.offsetWidth;
            run(next);
        };
        callOrQueue(self, queue, deferredRun);
        return this;
    };

    function registerCssHook(prop, isPixels) {
        if (!isPixels) {
            $.cssNumber[prop] = true;
        }
        $.transit.propertyMap[prop] = support.transform;
        $.cssHooks[prop] = {
            get: function(elem) {
                var t = $(elem).css('transit:transform');
                return t.get(prop);
            },
            set: function(elem, value) {
                var t = $(elem).css('transit:transform');
                t.setFromString(prop, value);
                $(elem).css({
                    'transit:transform': t
                });
            }
        };
    }

    function uncamel(str) {
        return str.replace(/([A-Z])/g, function(letter) {
            return '-' + letter.toLowerCase();
        });
    }

    function unit(i, units) {
        if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
            return i;
        } else {
            return "" + i + units;
        }
    }

    function toMS(duration) {
        var i = duration;
        if (typeof i === 'string' && (!i.match(/^[\-0-9\.]+/))) {
            i = $.fx.speeds[i] || $.fx.speeds._default;
        }
        return unit(i, 'ms');
    }
    $.transit.getTransitionValue = getTransition;
})(jQuery);
! function(a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function(f) {
        function g() {
            var b = 0;
            i.each(function() {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible"))
                    if (a.abovethetop(this, j) || a.leftofbegin(this, j));
                    else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                        if (++b > j.failure_limit) return !1
                    } else c.trigger("appear"), b = 0
            })
        }
        var h, i = this,
            j = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: b,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
            return g()
        }), this.each(function() {
            var b = this,
                c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function() {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function() {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function(a) {
                            return !a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function() {
            g()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function() {
                a(this).trigger("appear")
            })
        }), a(c).ready(function() {
            g()
        }), this
    }, a.belowthefold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function(b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function(b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function(b) {
            return a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document);
SHOPIFY_API_BASE_URL = 'http://www.grovemade.com/';
if ((typeof Shopify) === 'undefined') {
    Shopify = {};
}
Shopify.money_format = '$ {{amount}}';
Shopify.onError = function(XMLHttpRequest, textStatus) {
    var data = eval('(' + XMLHttpRequest.responseText + ')');
    if (!!data.message) {
        alert(data.message + '(' + data.status + '): ' + data.description);
    } else {
        alert('Error : ' + Shopify.fullMessagesFromErrors(data).join('; ') + '.');
    }
};
Shopify.fullMessagesFromErrors = function(errors) {
    var fullMessages = [];
    jQuery.each(errors, function(attribute, messages) {
        jQuery.each(messages, function(index, message) {
            fullMessages.push(attribute + ' ' + message);
        });
    });
    return fullMessages
}
Shopify.onCartUpdate = function(cart) {
    alert('There are now ' + cart.item_count + ' items in the cart.');
};
Shopify.onCartShippingRatesUpdate = function(rates, shipping_address) {
    var readable_address = '';
    if (shipping_address.zip) readable_address += shipping_address.zip + ', ';
    if (shipping_address.province) readable_address += shipping_address.province + ', ';
    readable_address += shipping_address.country
    alert('There are ' + rates.length + ' shipping rates available for ' + readable_address + ', starting at ' + Shopify.formatMoney(rates[0].price) + '.');
};
Shopify.onItemAdded = function(line_item) {
    alert(line_item.title + ' was added to your shopping cart.');
};
Shopify.onProduct = function(product) {
    alert('Received everything we ever wanted to know about ' + product.title);
};
Shopify.formatMoney = function(cents, format) {
    if (typeof cents == 'string') cents = cents.replace('.', '');
    var value = '';
    var patt = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || this.money_format);

    function addCommas(moneyString) {
        return moneyString.replace(/(\d+)(\d{3}[\.,]?)/, '$1,$2');
    }
    switch (formatString.match(patt)[1]) {
        case 'amount':
            value = addCommas(floatToString(cents / 100.0, 2));
            break;
        case 'amount_no_decimals':
            value = addCommas(floatToString(cents / 100.0, 0));
            break;
        case 'amount_with_comma_separator':
            value = floatToString(cents / 100.0, 2).replace(/\./, ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = addCommas(floatToString(cents / 100.0, 0)).replace(/\./, ',');
            break;
    }
    return formatString.replace(patt, value);
};
Shopify.resizeImage = function(image, size) {
    try {
        if (size == 'original') {
            return image;
        } else {
            var matches = image.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
            return matches[1] + '_' + size + '.' + matches[2];
        }
    } catch (e) {
        return image;
    }
};
Shopify.addItem = function(variant_id, quantity, callback) {
    var quantity = quantity || 1;
    var params = {
        type: 'POST',
        url: SHOPIFY_API_BASE_URL + 'cart/add.js',
        data: 'quantity=' + quantity + '&id=' + variant_id,
        dataType: 'json',
        success: function(line_item) {
            if ((typeof callback) === 'function') {
                callback(line_item);
            } else {
                Shopify.onItemAdded(line_item);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
};
Shopify.addItemFromForm = function(form_id, callback) {
    var params = {
        type: 'POST',
        url: SHOPIFY_API_BASE_URL + 'cart/add.js',
        data: jQuery('#' + form_id).serialize(),
        dataType: 'json',
        success: function(line_item) {
            if ((typeof callback) === 'function') {
                callback(line_item);
            } else {
                Shopify.onItemAdded(line_item);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
};
Shopify.getCart = function(callback) {
    jQuery.getJSON('/cart.js', function(cart, textStatus) {
        if ((typeof callback) === 'function') {
            callback(cart);
        } else {
            Shopify.onCartUpdate(cart);
        }
    });
};
Shopify.getCartShippingRatesForDestination = function(shipping_address, callback) {
    var params = {
        type: 'GET',
        url: SHOPIFY_API_BASE_URL + 'cart/shipping_rates.json',
        data: Shopify.param({
            'shipping_address': shipping_address
        }),
        dataType: 'json',
        success: function(response) {
            rates = response.shipping_rates
            if ((typeof callback) === 'function') {
                callback(rates, shipping_address);
            } else {
                Shopify.onCartShippingRatesUpdate(rates, shipping_address);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    }
    jQuery.ajax(params);
};
Shopify.getProduct = function(handle, callback) {
    jQuery.getJSON('/products/' + handle + '.js', function(product, textStatus) {
        if ((typeof callback) === 'function') {
            callback(product);
        } else {
            Shopify.onProduct(product);
        }
    });
};
Shopify.changeItem = function(variant_id, quantity, callback) {
    var params = {
        type: 'POST',
        url: SHOPIFY_API_BASE_URL + 'cart/change.js',
        data: 'quantity=' + quantity + '&id=' + variant_id,
        dataType: 'json',
        success: function(cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                Shopify.onCartUpdate(cart);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
};
Shopify.removeItem = function(variant_id, callback) {
    var params = {
        type: 'POST',
        url: SHOPIFY_API_BASE_URL + 'cart/change.js',
        data: 'quantity=0&id=' + variant_id,
        dataType: 'json',
        success: function(cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                Shopify.onCartUpdate(cart);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
};
Shopify.clear = function(callback) {
    var params = {
        type: 'POST',
        url: SHOPIFY_API_BASE_URL + 'cart/clear.js',
        data: '',
        dataType: 'json',
        success: function(cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                Shopify.onCartUpdate(cart);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
};
Shopify.updateCartFromForm = function(form_id, callback) {
    var params = {
        type: 'POST',
        url: SHOPIFY_API_BASE_URL + 'cart/update.js',
        data: jQuery('#' + form_id).serialize(),
        dataType: 'json',
        success: function(cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                Shopify.onCartUpdate(cart);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
};
Shopify.updateCartAttributes = function(attributes, callback) {
    var data = '';
    if (jQuery.isArray(attributes)) {
        jQuery.each(attributes, function(indexInArray, valueOfElement) {
            var key = attributeToString(valueOfElement.key);
            if (key !== '') {
                data += 'attributes[' + key + ']=' + attributeToString(valueOfElement.value) + '&';
            }
        });
    } else if ((typeof attributes === 'object') && attributes !== null) {
        jQuery.each(attributes, function(key, value) {
            data += 'attributes[' + attributeToString(key) + ']=' + attributeToString(value) + '&';
        });
    }
    var params = {
        type: 'POST',
        url: SHOPIFY_API_BASE_URL + 'cart/update.js',
        data: data,
        dataType: 'json',
        success: function(cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                Shopify.onCartUpdate(cart);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
};
Shopify.updateCartNote = function(note, callback) {
    var params = {
        type: 'POST',
        url: SHOPIFY_API_BASE_URL + 'cart/update.js',
        data: 'note=' + attributeToString(note),
        dataType: 'json',
        success: function(cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                Shopify.onCartUpdate(cart);
            }
        },
        error: function(XMLHttpRequest, textStatus) {
            Shopify.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
};
if (jQuery.fn.jquery >= '1.4') {
    Shopify.param = jQuery.param;
} else {
    Shopify.param = function(a) {
        var s = [],
            add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : value;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
        if (jQuery.isArray(a) || a.jquery) {
            jQuery.each(a, function() {
                add(this.name, this.value);
            });
        } else {
            for (var prefix in a) {
                Shopify.buildParams(prefix, a[prefix], add);
            }
        }
        return s.join("&").replace(/%20/g, "+");
    }
    Shopify.buildParams = function(prefix, obj, add) {
        if (jQuery.isArray(obj) && obj.length) {
            jQuery.each(obj, function(i, v) {
                if (rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    Shopify.buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, add);
                }
            });
        } else if (obj != null && typeof obj === "object") {
            if (Shopify.isEmptyObject(obj)) {
                add(prefix, "");
            } else {
                jQuery.each(obj, function(k, v) {
                    Shopify.buildParams(prefix + "[" + k + "]", v, add);
                });
            }
        } else {
            add(prefix, obj);
        }
    }
    Shopify.isEmptyObject = function(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    }
}

function floatToString(numeric, decimals) {
    var amount = numeric.toFixed(decimals).toString();
    if (amount.match(/^\.\d+/)) {
        return "0" + amount;
    } else {
        return amount;
    }
}

function attributeToString(attribute) {
    if ((typeof attribute) !== 'string') {
        attribute += '';
        if (attribute === 'undefined') {
            attribute = '';
        }
    }
    return jQuery.trim(attribute);
}
(function($) {
    function fnPjax(selector, container, options) {
        var context = this
        return this.on('click.pjax', selector, function(event) {
            var opts = $.extend({}, optionsFor(container, options))
            if (!opts.container)
                opts.container = $(this).attr('data-pjax') || context
            handleClick(event, opts)
        })
    }

    function handleClick(event, container, options) {
        options = optionsFor(container, options)
        var link = event.currentTarget
        if (link.tagName.toUpperCase() !== 'A')
            throw "$.fn.pjax or $.pjax.click requires an anchor element"
        if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return
        if (location.protocol !== link.protocol || location.hostname !== link.hostname)
            return
        if (link.hash && link.href.replace(link.hash, '') === location.href.replace(location.hash, ''))
            return
        if (link.href === location.href + '#')
            return
        var defaults = {
            url: link.href,
            container: $(link).attr('data-pjax'),
            target: link
        }
        var opts = $.extend({}, defaults, options)
        var clickEvent = $.Event('pjax:click')
        $(link).trigger(clickEvent, [opts])
        if (!clickEvent.isDefaultPrevented()) {
            pjax(opts)
            event.preventDefault()
        }
    }

    function handleSubmit(event, container, options) {
        options = optionsFor(container, options)
        var form = event.currentTarget
        if (form.tagName.toUpperCase() !== 'FORM')
            throw "$.pjax.submit requires a form element"
        var defaults = {
            type: form.method.toUpperCase(),
            url: form.action,
            data: $(form).serializeArray(),
            container: $(form).attr('data-pjax'),
            target: form
        }
        pjax($.extend({}, defaults, options))
        event.preventDefault()
    }

    function pjax(options) {
        options = $.extend(true, {}, $.ajaxSettings, pjax.defaults, options)
        if ($.isFunction(options.url)) {
            options.url = options.url()
        }
        var target = options.target
        var hash = parseURL(options.url).hash
        var context = options.context = findContainerFor(options.container)
        if (!options.data) options.data = {}
        options.data._pjax = context.selector

        function fire(type, args) {
            var event = $.Event(type, {
                relatedTarget: target
            })
            context.trigger(event, args)
            return !event.isDefaultPrevented()
        }
        var timeoutTimer
        options.beforeSend = function(xhr, settings) {
            if (settings.type !== 'GET') {
                settings.timeout = 0
            }
            xhr.setRequestHeader('X-PJAX', 'true')
            xhr.setRequestHeader('X-PJAX-Container', context.selector)
            if (!fire('pjax:beforeSend', [xhr, settings]))
                return false
            if (settings.timeout > 0) {
                timeoutTimer = setTimeout(function() {
                    if (fire('pjax:timeout', [xhr, options]))
                        xhr.abort('timeout')
                }, settings.timeout)
                settings.timeout = 0
            }
            options.requestUrl = parseURL(settings.url).href
        }
        options.complete = function(xhr, textStatus) {
            if (timeoutTimer)
                clearTimeout(timeoutTimer)
            fire('pjax:complete', [xhr, textStatus, options])
            fire('pjax:end', [xhr, options])
        }
        options.error = function(xhr, textStatus, errorThrown) {
            var container = extractContainer("", xhr, options)
            var allowed = fire('pjax:error', [xhr, textStatus, errorThrown, options])
            if (options.type == 'GET' && textStatus !== 'abort' && allowed) {
                locationReplace(container.url)
            }
        }
        options.success = function(data, status, xhr) {
            var currentVersion = (typeof $.pjax.defaults.version === 'function') ? $.pjax.defaults.version() : $.pjax.defaults.version
            var latestVersion = xhr.getResponseHeader('X-PJAX-Version')
            var container = extractContainer(data, xhr, options)
            if (currentVersion && latestVersion && currentVersion !== latestVersion) {
                locationReplace(container.url)
                return
            }
            if (!container.contents) {
                locationReplace(container.url)
                return
            }
            pjax.state = {
                id: options.id || uniqueId(),
                url: container.url,
                title: container.title,
                container: context.selector,
                fragment: options.fragment,
                timeout: options.timeout
            }
            if (options.push || options.replace) {
                window.history.replaceState(pjax.state, container.title, container.url)
            }
            document.activeElement.blur()
            if (container.title) document.title = container.title
            context.html(container.contents)
            var autofocusEl = context.find('input[autofocus], textarea[autofocus]').last()[0]
            if (autofocusEl && document.activeElement !== autofocusEl) {
                autofocusEl.focus();
            }
            executeScriptTags(container.scripts)
            if (typeof options.scrollTo === 'number')
                $(window).scrollTop(options.scrollTo)
            if (hash !== '') {
                var url = parseURL(container.url)
                url.hash = hash
                pjax.state.url = url.href
                window.history.replaceState(pjax.state, container.title, url.href)
                var target = $(url.hash)
                if (target.length) $(window).scrollTop(target.offset().top)
            }
            fire('pjax:success', [data, status, xhr, options])
        }
        if (!pjax.state) {
            pjax.state = {
                id: uniqueId(),
                url: window.location.href,
                title: document.title,
                container: context.selector,
                fragment: options.fragment,
                timeout: options.timeout
            }
            window.history.replaceState(pjax.state, document.title)
        }
        var xhr = pjax.xhr
        if (xhr && xhr.readyState < 4) {
            xhr.onreadystatechange = $.noop
            xhr.abort()
        }
        pjax.options = options
        var xhr = pjax.xhr = $.ajax(options)
        if (xhr.readyState > 0) {
            if (options.push && !options.replace) {
                cachePush(pjax.state.id, context.clone().contents())
                window.history.pushState(null, "", stripPjaxParam(options.requestUrl))
            }
            fire('pjax:start', [xhr, options])
            fire('pjax:send', [xhr, options])
        }
        return pjax.xhr
    }

    function pjaxReload(container, options) {
        var defaults = {
            url: window.location.href,
            push: false,
            replace: true,
            scrollTo: false
        }
        return pjax($.extend(defaults, optionsFor(container, options)))
    }

    function locationReplace(url) {
        window.history.replaceState(null, "", "#")
        window.location.replace(url)
    }
    var initialPop = true
    var initialURL = window.location.href
    var initialState = window.history.state
    if (initialState && initialState.container) {
        pjax.state = initialState
    }
    if ('state' in window.history) {
        initialPop = false
    }

    function onPjaxPopstate(event) {
        var state = event.state
        if (state && state.container) {
            if (initialPop && initialURL == state.url) return
            if (pjax.state.id === state.id) return
            var container = $(state.container)
            if (container.length) {
                var direction, contents = cacheMapping[state.id]
                if (pjax.state) {
                    direction = pjax.state.id < state.id ? 'forward' : 'back'
                    cachePop(direction, pjax.state.id, container.clone().contents())
                }
                var popstateEvent = $.Event('pjax:popstate', {
                    state: state,
                    direction: direction
                })
                container.trigger(popstateEvent)
                var options = {
                    id: state.id,
                    url: state.url,
                    container: container,
                    push: false,
                    fragment: state.fragment,
                    timeout: state.timeout,
                    scrollTo: false
                }
                if (contents) {
                    container.trigger('pjax:start', [null, options])
                    if (state.title) document.title = state.title
                    container.html(contents)
                    pjax.state = state
                    container.trigger('pjax:end', [null, options])
                } else {
                    pjax(options)
                }
                container[0].offsetHeight
            } else {
                locationReplace(location.href)
            }
        }
        initialPop = false
    }

    function fallbackPjax(options) {
        var url = $.isFunction(options.url) ? options.url() : options.url,
            method = options.type ? options.type.toUpperCase() : 'GET'
        var form = $('<form>', {
            method: method === 'GET' ? 'GET' : 'POST',
            action: url,
            style: 'display:none'
        })
        if (method !== 'GET' && method !== 'POST') {
            form.append($('<input>', {
                type: 'hidden',
                name: '_method',
                value: method.toLowerCase()
            }))
        }
        var data = options.data
        if (typeof data === 'string') {
            $.each(data.split('&'), function(index, value) {
                var pair = value.split('=')
                form.append($('<input>', {
                    type: 'hidden',
                    name: pair[0],
                    value: pair[1]
                }))
            })
        } else if (typeof data === 'object') {
            for (key in data)
                form.append($('<input>', {
                    type: 'hidden',
                    name: key,
                    value: data[key]
                }))
        }
        $(document.body).append(form)
        form.submit()
    }

    function uniqueId() {
        return (new Date).getTime()
    }

    function stripPjaxParam(url) {
        return url.replace(/\?_pjax=[^&]+&?/, '?').replace(/_pjax=[^&]+&?/, '').replace(/[\?&]$/, '')
    }

    function parseURL(url) {
        var a = document.createElement('a')
        a.href = url
        return a
    }

    function optionsFor(container, options) {
        if (container && options)
            options.container = container
        else if ($.isPlainObject(container))
            options = container
        else
            options = {
                container: container
            }
        if (options.container)
            options.container = findContainerFor(options.container)
        return options
    }

    function findContainerFor(container) {
        container = $(container)
        if (!container.length) {
            throw "no pjax container for " + container.selector
        } else if (container.selector !== '' && container.context === document) {
            return container
        } else if (container.attr('id')) {
            return $('#' + container.attr('id'))
        } else {
            throw "cant get selector for pjax container!"
        }
    }

    function findAll(elems, selector) {
        return elems.filter(selector).add(elems.find(selector));
    }

    function parseHTML(html) {
        return $.parseHTML(html, document, true)
    }

    function extractContainer(data, xhr, options) {
        var obj = {}
        obj.url = stripPjaxParam(xhr.getResponseHeader('X-PJAX-URL') || options.requestUrl)
        if (/<html/i.test(data)) {
            var $head = $(parseHTML(data.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]))
            var $body = $(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))
        } else {
            var $head = $body = $(parseHTML(data))
        }
        if ($body.length === 0)
            return obj
        obj.title = findAll($head, 'title').last().text()
        if (options.fragment) {
            if (options.fragment === 'body') {
                var $fragment = $body
            } else {
                var $fragment = findAll($body, options.fragment).first()
            }
            if ($fragment.length) {
                obj.contents = $fragment.contents()
                if (!obj.title)
                    obj.title = $fragment.attr('title') || $fragment.data('title')
            }
        } else if (!/<html/i.test(data)) {
            obj.contents = $body
        }
        if (obj.contents) {
            obj.contents = obj.contents.not(function() {
                return $(this).is('title')
            })
            obj.contents.find('title').remove()
            obj.scripts = findAll(obj.contents, 'script[src]').remove()
            obj.contents = obj.contents.not(obj.scripts)
        }
        if (obj.title) obj.title = $.trim(obj.title)
        return obj
    }

    function executeScriptTags(scripts) {
        if (!scripts) return
        var existingScripts = $('script[src]')
        scripts.each(function() {
            var src = this.src
            var matchedScripts = existingScripts.filter(function() {
                return this.src === src
            })
            if (matchedScripts.length) {
                return
                matchedScripts.remove();
            }
            console.error("FOUND SCRIPTS", scripts, matchedScripts.length);
            var script = document.createElement('script')
            script.type = $(this).attr('type') || 'text/javascript'
            script.src = $(this).attr('src')
            document.head.appendChild(script)
        })
    }
    var cacheMapping = {}
    var cacheForwardStack = []
    var cacheBackStack = []

    function cachePush(id, value) {
        cacheMapping[id] = value
        cacheBackStack.push(id)
        while (cacheForwardStack.length)
            delete cacheMapping[cacheForwardStack.shift()]
        while (cacheBackStack.length > pjax.defaults.maxCacheLength)
            delete cacheMapping[cacheBackStack.shift()]
    }

    function cachePop(direction, id, value) {
        var pushStack, popStack
        cacheMapping[id] = value
        if (direction === 'forward') {
            pushStack = cacheBackStack
            popStack = cacheForwardStack
        } else {
            pushStack = cacheForwardStack
            popStack = cacheBackStack
        }
        pushStack.push(id)
        if (id = popStack.pop())
            delete cacheMapping[id]
    }

    function findVersion() {
        return $('meta').filter(function() {
            var name = $(this).attr('http-equiv')
            return name && name.toUpperCase() === 'X-PJAX-VERSION'
        }).attr('content')
    }

    function enable() {
        $.fn.pjax = fnPjax
        $.pjax = pjax
        $.pjax.enable = $.noop
        $.pjax.disable = disable
        $.pjax.click = handleClick
        $.pjax.submit = handleSubmit
        $.pjax.reload = pjaxReload
        $.pjax.defaults = {
            timeout: 650,
            push: true,
            replace: false,
            type: 'GET',
            dataType: 'html',
            scrollTo: 0,
            maxCacheLength: 20,
            version: findVersion
        }
        $(window).on('popstate.pjax', onPjaxPopstate)
    }

    function disable() {
        $.fn.pjax = function() {
            return this
        }
        $.pjax = fallbackPjax
        $.pjax.enable = enable
        $.pjax.disable = $.noop
        $.pjax.click = $.noop
        $.pjax.submit = $.noop
        $.pjax.reload = function() {
            window.location.reload()
        }
        $(window).off('popstate.pjax', onPjaxPopstate)
    }
    if ($.inArray('state', $.event.props) < 0)
        $.event.props.push('state')
    $.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/)
    $.support.pjax ? enable() : disable()
})(jQuery);
! function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function(b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(b.target).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.submit(function(b) {
                function d() {
                    var d;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), !1) : !0
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() {
            var b, c;
            return a(this[0]).is("form") ? b = this.validate().form() : (b = !0, c = a(this[0].form).validate(), this.each(function() {
                b = c.element(this) && b
            })), b
        },
        removeAttrs: function(b) {
            var c = {},
                d = this;
            return a.each(b.split(/\s/), function(a, b) {
                c[b] = d.attr(b), d.removeAttr(b)
            }), c
        },
        rules: function(b, c) {
            var d, e, f, g, h, i, j = this[0];
            if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                case "add":
                    a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                    break;
                case "remove":
                    return c ? (i = {}, a.each(c.split(/\s/), function(b, c) {
                        i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
                    }), i) : (delete e[j.name], f)
            }
            return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                required: h
            }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                remote: h
            })), g
        }
    }), a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + a(b).val())
        },
        filled: function(b) {
            return !!a.trim("" + a(b).val())
        },
        unchecked: function(b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function(b, c) {
        return 1 === arguments.length ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(a)).hide())
            },
            onfocusout: function(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function(a, b) {
                (9 !== b.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastElement) && this.element(a)
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    var c = a.data(this[0].form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !this.is(e.ignore) && e[d].call(c, this[0], b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                        d[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", b).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", b), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(b) {
                var c = this.clean(b),
                    d = this.validationTargetFor(c),
                    e = !0;
                return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e
            },
            showErrors: function(b) {
                if (b) {
                    a.extend(this.errorMap, b), this.errorList = [];
                    for (var c in b) this.errorList.push({
                        message: b[c],
                        element: this.findByName(c)[0]
                    });
                    this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b, c = 0;
                for (b in a) c++;
                return c
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function(a) {
                    return a.element.name === b.name
                }).length && b
            },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a)
            },
            elementValue: function(b) {
                var c, d = a(b),
                    e = d.attr("type");
                return "radio" === e || "checkbox" === e ? a("input[name='" + d.attr("name") + "']:checked").val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f = a(b).rules(),
                    g = a.map(f, function(a, b) {
                        return b
                    }).length,
                    h = !1,
                    i = this.elementValue(b);
                for (d in f) {
                    e = {
                        method: d,
                        parameters: f[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;
                            continue
                        }
                        if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1
                    } catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j
                    }
                }
                if (!h) return this.objectLength(f) && this.successList.push(b), !0
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg" + c[0].toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a];
                return void 0
            },
            defaultMessage: function(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            },
            formatAndAdd: function(b, c) {
                var d = this.defaultMessage(b, c.method),
                    e = /\$?\{(\d+)\}/g;
                "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                    message: d,
                    element: b,
                    method: c.method
                }), this.errorMap[b.name] = d, this.submitted[b.name] = d
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(b, c) {
                var d = this.errorsFor(b);
                d.length ? (d.removeClass(this.settings.validClass).addClass(this.settings.errorClass), d.html(c)) : (d = a("<" + this.settings.errorElement + ">").attr("for", this.idOrName(b)).addClass(this.settings.errorClass).html(c || ""), this.settings.wrapper && (d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b))), !c && this.settings.success && (d.text(""), "string" == typeof this.settings.success ? d.addClass(this.settings.success) : this.settings.success(d, b)), this.toShow = this.toShow.add(d)
            },
            errorsFor: function(b) {
                var c = this.idOrName(b);
                return this.errors().filter(function() {
                    return a(this).attr("for") === c
                })
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(a) {
                return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + b + "']")
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(b, c) {
                    return !!a(b, c.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), /min|max/.test(c) && (null === g || /number|range|text/.test(g)) && (d = Number(d)), d || 0 === d ? e[c] = d : g === c && "range" !== g && (e[c] = !0);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b);
            for (c in a.validator.methods) d = f.data("rule" + c[0].toUpperCase() + c.substring(1).toLowerCase()), void 0 !== d && (e[c] = d);
            return e
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d]
                }
            }), a.each(b, function(d, e) {
                b[d] = a.isFunction(e) ? e(c) : e
            }), a.each(["minlength", "maxlength"], function() {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0
            },
            email: function(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            creditcard: function(a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                var c, d, e = 0,
                    f = 0,
                    g = !1;
                if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1;
                for (c = a.length - 1; c >= 0; c--) d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g;
                return e % 10 === 0
            },
            minlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || e >= d
            },
            maxlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || d >= e
            },
            rangelength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c
            },
            max: function(a, b, c) {
                return this.optional(b) || c >= a
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    a(c).valid()
                }), b === e.val()
            },
            remote: function(b, c, d) {
                if (this.optional(c)) return "dependency-mismatch";
                var e, f, g = this.previousValue(c);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && {
                    url: d
                } || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, {
                    url: d,
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: f,
                    context: e.currentForm,
                    success: function(d) {
                        var f, h, i, j = d === !0 || "true" === d;
                        e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    }), a.format = function() {
        throw "$.format has been deprecated. Please use $.validator.format instead."
    }
}(jQuery),
    function(a) {
        var b, c = {};
        a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
            var e = a.port;
            "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
        }) : (b = a.ajax, a.ajax = function(d) {
            var e = ("mode" in d ? d : a.ajaxSettings).mode,
                f = ("port" in d ? d : a.ajaxSettings).port;
            return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
        })
    }(jQuery),
    function(a) {
        a.extend(a.fn, {
            validateDelegate: function(b, c, d) {
                return this.bind(c, function(c) {
                    var e = a(c.target);
                    return e.is(b) ? d.apply(e, arguments) : void 0
                })
            }
        })
    }(jQuery);
(function() {
    var ExplodingWatchManager, Instafeed, NewsletterPopupHandler, RotatingWatchManager, ScrollSpyElement, clearAllIntervals, csrftoken, handleMainVideo, handleOverflows, handleParallax, handleSubnav, handleVideo, handleVideoPopup, handleWatchSignup, intervals, log, newsletterHandler, root, setClearableInterval, storedExitFunctions, storedKeyFunctions, storedMatchFunctions, _cleanData, _this = this,
        __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    csrftoken = $('meta[name=csrf-token]').attr('content');
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
                return xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    if (root.utils == null) {
        root.utils = {};
    }
    root.effects = {};
    root.controllers = {};
    root.components = {};
    root.variables = {};
    root.events = {};
    root.variables = {
        debug: true,
        controllers: {
            catchExceptions: false,
            logInit: false
        },
        navbarHeight: 50,
        breakpoints: {
            mobile: 768,
            desktop: 769,
            minWidth: 1000
        }
    };
    root.utils.isAtBreakpoint = function(breakpoint) {
        var breakpoints;
        breakpoints = root.variables.breakpoints;
        if (breakpoint === 'mobile' && window.is_mobile) {
            return $(window).width() < breakpoints.mobile;
        } else if (breakpoint === 'desktop') {
            return $(window).width() > breakpoints.desktop;
        } else if (breakpoint === 'tablet') {
            return $(window).width() > breakpoints.mobile;
        }
    };
    root.utils.getCurrentBreakpoint = function() {
        var breakpoint, isCurrent, px, _ref;
        _ref = root.variables.breakpoints;
        for (breakpoint in _ref) {
            px = _ref[breakpoint];
            isCurrent = root.utils.isAtBreakpoint(breakpoint);
            if (isCurrent) {
                return breakpoint;
            }
        }
    };
    root.utils.responsiveJS = function(args) {
        var responsiveJS, _base, _this = this;
        if ((_base = root.utils)._responsiveJSQueries == null) {
            _base._responsiveJSQueries = [];
        }
        root.utils._responsiveJSQueries.push(args);
        this.$window = $(window);
        (responsiveJS = function() {
            var matched, responsive, _i, _len, _ref, _results;
            _ref = root.utils._responsiveJSQueries;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                responsive = _ref[_i];
                if (_.isFunction(responsive.query)) {
                    matched = responsive.query(_this.$window);
                } else {
                    matched = root.utils.isAtBreakpoint(responsive.query);
                }
                if (matched && !responsive.active) {
                    responsive.active = true;
                    if (typeof responsive.enter === "function") {
                        responsive.enter();
                    }
                }
                if (!matched && responsive.active) {
                    responsive.active = false;
                    _results.push(typeof responsive.exit === "function" ? responsive.exit() : void 0);
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        })();
        return this.$window.on('resize', _.debounce(responsiveJS, 100));
    };
    root.utils.lockScroll = function(lock) {
        if (lock === void 0) {
            return $("html").toggleClass('no-scroll');
        } else if (lock) {
            return $("html").addClass('no-scroll');
        } else {
            return $("html").removeClass('no-scroll');
        }
    };
    root.utils.scrollTo = function($el, options) {
        var animate, _this = this;
        animate = function() {
            var top;
            top = $el.offset().top;
            return $("html, body").animate({
                scrollTop: top - (options.offset || 0)
            }, options.speed || 1000, options.easing || 'easeInOutExpo');
        };
        if (options.delay) {
            return _.delay(animate, options.delay);
        } else {
            return animate();
        }
    };
    root.utils.cookies = {
        set: function(name, value, days) {
            var date, expires;
            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            return document.cookie = name + "=" + value + expires + "; path=/";
        },
        get: function(name) {
            var c, ca, i, nameEQ;
            nameEQ = name + "=";
            ca = document.cookie.split(";");
            i = 0;
            while (i < ca.length) {
                c = ca[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
                i++;
            }
            return null;
        },
        "delete": function(name) {
            return setCookie(name, "", -1);
        }
    };
    root.utils.getControllerInstance = function(controllerName, $scope) {
        var $controllers, controller, instances;
        if (!$scope) {
            $scope = $('html');
        }
        $controllers = $scope.find("[js-controller=\"" + controllerName + "\"]");
        instances = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = $controllers.length; _i < _len; _i++) {
                controller = $controllers[_i];
                _results.push($(controller).data('js-controller'));
            }
            return _results;
        })();
        if (instances.length === 1) {
            return instances[0];
        }
        return instances;
    };
    root.utils.evalAttribute = function($element, attribute) {
        var ex;
        try {
            return eval("(" + ($element.attr(attribute)) + ")") || {};
        } catch (_error) {
            ex = _error;
            console.log("Get args exception: ", ex);
            return {};
        }
    };
    root.utils.getArgs = function($element) {
        return root.utils.evalAttribute($element, 'js-args');
    };
    root.utils.bindJSControllers = function($scope, force) {
        var bindJSFactory, ex, tagname, _ref;
        if (force == null) {
            force = false;
        }
        if (!$scope) {
            this.$scope = $('html');
        } else {
            this.$scope = $scope;
        }
        try {
            tagname = (((_ref = this.$scope.get(0)) != null ? _ref.tagName : void 0) != null) || '';
            console.log("Binding JS controllers/components for\n" + tagname + ":" + (this.$scope.get(0).className) + ". Force: " + force);
        } catch (_error) {
            ex = _error;
        }
        bindJSFactory = function(attrName, objectName, $scope) {
            var _this = this;
            this.attrName = attrName;
            this.objectName = objectName;
            this.loadedClass = "" + attrName + "-loaded";
            this.selector = "[" + attrName + "]";
            if (!force) {
                this.selector += ":not(." + loadedClass + ")";
            } else {
                console.log("Forcing re-binding");
            }
            return $scope.find(selector).each(function(index, el) {
                var bind, handler;
                bind = function($element) {
                    var controller, handler, handlerFunc, options;
                    handler = $element.attr(_this.attrName);
                    options = root.utils.getArgs($element);
                    controller = root[_this.objectName][handler];
                    if (controller) {
                        handlerFunc = new controller($element, options);
                    } else if (root.variables.controllers.logInit) {
                        console.log("Controller not found for handler " + handler);
                    }
                    $element.data(_this.attrName, handlerFunc);
                    $element.addClass(_this.loadedClass);
                    if (root.variables.controllers.logInit) {
                        return console.log("" + handler + " initialized with", {
                            options: options
                        });
                    }
                };
                if (root.variables.controllers.catchExceptions) {
                    try {
                        bind($(el));
                    } catch (_error) {
                        ex = _error;
                        handler = $(el).attr(_this.attrName);
                        console.error('Error initializing: ', handler, ex);
                    }
                } else {
                    bind($(el));
                }
            });
        };
        bindJSFactory('js-controller', 'controllers', this.$scope);
        return bindJSFactory('js-component', 'components', this.$scope);
    };
    root.effects.handleFadeInOnLoad = function() {
        if (window.is_safari) {
            window.onbeforeunload = function() {
                $("body").addClass('is-unloading');
            };
            $(window).bind("pageshow", function(ev) {
                if (ev.originalEvent.persisted) {
                    $("body").addClass('is-loading');
                }
            });
        } else {
            $(window).on('beforeunload', function() {
                $("body").addClass('is-unloading');
            });
        }
        return $("body").addClass('is-loading');
    };
    root.effects.resetAnimationState = function($scope) {
        var animated;
        if (!$scope) {
            this.$scope = $('html');
        } else {
            this.$scope = $scope;
        }
        animated = this.$scope.find('.a');
        return animated.removeClass('a--animated a--animating');
    };
    root.effects.handleScrollBasedAnimations = function() {
        var _this = this;
        this.$zeroHeightHiddenHelperCls = 'zero-height-hidden-helper';
        this.$zeroHeightHiddenHelperClsWithDot = '.zero-height-hidden-helper';
        $.extend($.expr[':'], {
            zeroheight: function(el, index, meta) {
                var $el, ex, noHeight, overflowHidden;
                $el = $(el);
                try {
                    noHeight = $el.height() === 0;
                    overflowHidden = $el.css('overflow') === 'hidden';
                } catch (_error) {
                    ex = _error;
                    console.log('failed getting height', ex);
                }
                if (noHeight && overflowHidden) {
                    return true;
                }
                return false;
            },
            notzeroheightparent: function(el, index, meta) {
                var $el, $zero;
                $el = $(el);
                $zero = $el.closest(_this.$zeroHeightHiddenHelperClsWithDot);
                if ($zero.is(':zeroheight')) {
                    return false;
                }
                return true;
            }
        });
        $(":zeroheight").each(function(index, el) {
            var $el;
            $el = $(el);
            return $el.addClass(_this.$zeroHeightHiddenHelperCls);
        });
        this.$animatedCls = 'a--animated';
        this.$animatingCls = 'a--animating';
        this.$delay = 10;
        this.$additionalDelay = 20;
        this.$queued = 0;
        this.getQueuedDelay = function() {
            var delay;
            delay = _this.$delay + (_this.$queued * _this.$additionalDelay);
            return delay;
        };
        this.$animationSelector = ".a\n:in-viewport\n:not(." + this.$animatedCls + ")\n:not(." + this.$animatingCls + ")\n:not(:hidden)\n:notzeroheightparent";
        this.animateInWindow = function() {
            var $toAnimate;
            $toAnimate = $(_this.$animationSelector);
            return $toAnimate.each(function(index, el) {
                var $el;
                $el = $(el);
                $el.addClass(_this.$animatingCls);
                _this.$queued += 1;
                return _.delay(function() {
                    $el.addClass(_this.$animatedCls);
                    return _this.$queued -= 1;
                }, _this.getQueuedDelay());
            });
        };
        $(window).on('scroll', _.debounce(this.animateInWindow, 500));
        setInterval(this.animateInWindow, 200);
        return setInterval(function() {
            return console.log("Queued: " + _this.$queued);
        }, 10000);
    };
    root.effects.handleNavbarFadeIn = function() {
        var _this = this;
        this.$navbar = $('[js-navbar]');
        if (this.$navbar.is(':hidden')) {
            return this.$navbar.addClass('notransition').delay(1000).fadeIn('slow', 'easeInOutExpo', function() {
                return _this.$navbar.removeClass('notransition');
            });
        }
    };
    root.effects.jquery = {
        slideDownFade: function($element, speed) {
            return $element.css('opacity', 0).slideDown(speed, 'easeInOutExpo').animate({
                opacity: 1
            }, {
                queue: false,
                duration: speed
            });
        },
        slideUpFade: function($element, speed) {
            return $element.css('opacity', 1).slideUp(speed, 'easeInOutExpo').animate({
                opacity: 0
            }, {
                queue: false,
                duration: speed
            });
        }
    };
    root.effects.init = function() {};
    root.init = function() {
        root.utils.bindJSControllers();
        return root.effects.init();
    };
    $(function() {
        return root.init();
    });
    _cleanData = $.cleanData;
    $.cleanData = function(elems) {
        var elem, i;
        i = 0;
        elem = void 0;
        while ((elem = elems[i]) != null) {
            try {
                $(elem).triggerHandler("remove");
            } catch (_error) {}
            i++;
        }
        _cleanData(elems);
    };
    $(function() {
        if (navigator.appVersion.indexOf("Win") !== -1) {
            $('html').addClass('os-windows');
        }
        return console.log(navigator.appVersion, "Testing OS");
    });
    'Javascript Loader\n-----------------\n\nWhat: Conditonally load scripts (functions) depending on which page is rendered.\nWhy: We can no longer easily load page-specific scripts due to the fact we are pulling partial HTML via AJAX.\n\nUsage:\n\n	root.loader.executeOnKey \'some-memorable-name\', ->\n		# console.log "I will only execute when a template sets `some-memorable-name`"\n\nIn template:\n\n	{% block execute_javascript_key %}some-memorable-name{% endblock %}\n\nYuji Tomita\n1/2014';
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.loader = {};
    storedKeyFunctions = {};
    storedMatchFunctions = [];
    storedExitFunctions = [];
    root.loader.executeOnKey = function(keys, fn) {
        var key, _i, _len, _results;
        if (!_.isArray(keys)) {
            keys = [keys];
        }
        _results = [];
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
            key = keys[_i];
            if (storedKeyFunctions[key] == null) {
                storedKeyFunctions[key] = [];
            }
            _results.push(storedKeyFunctions[key].push(fn));
        }
        return _results;
    };
    root.loader.onReady = function(fn) {
        return $(document).on('ready pjax:end', function() {
            return fn();
        });
    };
    root.loader.onReady(function() {
        var f, functions, jsKey, key, _i, _len, _ref, _results;
        jsKey = $(".execute-javascript-key").val();
        _ref = jsKey.split(',');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            key = key.trim();
            functions = storedKeyFunctions[key];
            console.error("Looking for JS via key: " + key + " ", functions);
            if (functions) {
                _results.push((function() {
                    var _j, _len1, _results1;
                    _results1 = [];
                    for (_j = 0, _len1 = functions.length; _j < _len1; _j++) {
                        f = functions[_j];
                        _results1.push(f());
                    }
                    return _results1;
                })());
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    if (root.mixins == null) {
        root.mixins = {};
    }
    root.mixins.Gallery = (function() {
        'Core galley functions. Add more here as refactored.';

        function Gallery() {
            this.currentIndex = this._getInitialIndex();
        }
        Gallery.prototype._getInitialIndex = function() {
            return 0;
        };
        Gallery.prototype._getNextSlideNum = function() {
            'Get next slide number, respecting infinite values, or null if end.';
            var next;
            next = this.currentIndex + 1;
            if (next < this._getSlideCount()) {
                return next;
            }
            if (this.infinite) {
                return 0;
            }
            return null;
        };
        Gallery.prototype._getPrevSlideNum = function() {
            var prev;
            prev = this.currentIndex - 1;
            if (prev >= 0) {
                return prev;
            }
            if (this.infinite) {
                return this._getSlideCount() - 1;
            }
            return null;
        };
        Gallery.prototype._getSlideCount = function() {
            'Subclass to modify';
            return this.slideCount;
        };
        Gallery.prototype._updateNavigation = function() {
            var next, prev;
            next = this._getNextSlideNum();
            prev = this._getPrevSlideNum();
            if (next === null) {
                this.$next.addClass('is-disabled');
            } else {
                this.$next.removeClass('is-disabled');
            }
            if (prev === null) {
                return this.$prev.addClass('is-disabled');
            } else {
                return this.$prev.removeClass('is-disabled');
            }
        };
        return Gallery;
    })();
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    if (root.modules == null) {
        root.modules = {};
    }
    intervals = [];
    setClearableInterval = function(func, interval) {
        var id;
        id = setInterval(func, interval);
        intervals.push(id);
        console.log("setting interval", id);
        return id;
    };
    clearAllIntervals = function() {
        var id, _i, _len;
        for (_i = 0, _len = intervals.length; _i < _len; _i++) {
            id = intervals[_i];
            console.log('clearing interval...', id);
            clearInterval(id);
        }
        return intervals = [];
    };
    root.modules.ContentSlider = (function(_super) {
        __extends(ContentSlider, _super);
        ContentSlider.prototype.namespace = '.content_slider';

        function ContentSlider(_arg) {
            var _ref, _this = this;
            _ref = _arg != null ? _arg : {}, this.selector = _ref.selector, this.itemSelector = _ref.itemSelector, this.itemsPerSlide = _ref.itemsPerSlide, this.$next = _ref.$next, this.$prev = _ref.$prev, this.renderIndicators = _ref.renderIndicators, this.renderNavigation = _ref.renderNavigation, this.transitionFunction = _ref.transitionFunction, this.onAfterRenderSlide = _ref.onAfterRenderSlide, this.autoPlay = _ref.autoPlay, this.animationSpeed = _ref.animationSpeed, this.autoPlayStopOnInteraction = _ref.autoPlayStopOnInteraction;
            this.nextSlide = __bind(this.nextSlide, this);
            this.prevSlide = __bind(this.prevSlide, this);
            this._destruct = __bind(this._destruct, this);
            _.defaults(this, {
                itemsPerSlide: 2,
                initialSlide: 1,
                currentIndex: 0,
                $next: $('<div class="next-slide"><span class="icon-right-open-big"></span></div>'),
                $prev: $('<div class="prev-slide"><span class="icon-left-open-big"></span></div>'),
                infinite: true,
                renderIndicators: true,
                renderNavigation: true,
                transitionFunction: '_crossFade',
                autoPlay: false,
                autoPlayStopOnInteraction: false,
                animationSpeed: 600
            });
            this._bindElements();
            this._bindDestructors();
            this._bindHandlers();
            if (this.autoPlay) {
                this._autoPlay();
            }
            if (root.jRes !== void 0) {
                root.jRes.addFunc({
                    breakpoint: '*',
                    enter: function() {
                        return _this.initialize();
                    },
                    exit: function() {
                        return _this.initialize();
                    }
                });
            }
        }
        ContentSlider.prototype._bindElements = function() {
            this.$container = $(this.selector);
            if (this.$contentSlideContainer == null) {
                this.$contentSlideContainer = this.$container.append('<div class="content-slide-container"></div>').find('.content-slide-container');
            }
            this.$contentSlideContainer.html('');
            this.$items = this.$container.find(this.itemSelector).clone();
            this.$activeSlide = this._createContentSlide('active');
            this.$oldSlide = this._createContentSlide('old').hide();
            if (this.renderNavigation) {
                this.$navigation = this._renderNavigation();
            }
            return this._renderSlideIndicators();
        };
        ContentSlider.prototype._bindHandlers = function() {
            var _this = this;
            this.$container.on('slider:updated', function() {
                return _this.slideCount = Math.ceil(_this.$items.length / _this._getItemsPerSlide());
            });
            this.$container.on('slider:updated', function() {
                if (_this.renderIndicators) {
                    return _this._updateIndicators();
                }
            });
            this.$next.on('click' + this.namespace, function() {
                console.log('clicked next');
                _this.nextSlide();
                if (_this.autoPlayStopOnInteraction) {
                    return clearAllIntervals();
                }
            });
            this.$prev.on('click' + this.namespace, function() {
                console.log('clicked prev');
                _this.prevSlide();
                if (_this.autoPlayStopOnInteraction) {
                    return clearAllIntervals();
                }
            });
            this.$activeSlide.on('click' + this.namespace, function() {
                console.log('clicked active slide.. going to next');
                _this.nextSlide();
                if (_this.autoPlayStopOnInteraction) {
                    return clearAllIntervals();
                }
            });
            this.$activeSlide.css({
                cursor: 'pointer'
            });
            this._bindIndicatorHandlers();
            if ($("html").hasClass('is-mobile')) {
                this.$container.hammer({
                    drag_lock_to_axis: true
                }).on('swiperight' + this.namespace, this.prevSlide);
                return this.$container.hammer({
                    drag_lock_to_axis: true
                }).on('swipeleft' + this.namespace, this.nextSlide);
            }
        };
        ContentSlider.prototype._bindDestructors = function() {
            return this.$container.on('remove', this._destruct);
        };
        ContentSlider.prototype._destruct = function() {
            console.log("Destructing...", intervals);
            $(window).unbind(this.namespace);
            return clearAllIntervals();
        };
        ContentSlider.prototype._renderNavigation = function() {
            var $navs, $next, $prev, _this = this;
            $navs = $("<div class=\"slider-navigation-container\">\n	<div class=\"slider-navigation next\">\n		<span class=\"icon-right-arrow\"></span>\n	</div>\n	<div class=\"slider-navigation prev\">\n		<span class=\"icon-left-arrow\"></span>\n	</div>\n</div>");
            if (this.$items.length > 0 && !this.$container.find('.slider-navigation-container').length > 0) {
                $next = $navs.find('.next');
                $prev = $navs.find('.prev');
                this.$contentSlideContainer.append($navs);
                $next.on('click' + this.namespace, function() {
                    console.log('clicked next');
                    _this.nextSlide();
                    if (_this.autoPlayStopOnInteraction != null) {
                        return clearAllIntervals();
                    }
                });
                return $prev.on('click' + this.namespace, function() {
                    _this.prevSlide();
                    if (_this.autoPlayStopOnInteraction != null) {
                        return clearAllIntervals();
                    }
                });
            }
        };
        ContentSlider.prototype._createContentSlide = function(cls) {
            var $slide;
            if (cls == null) {
                cls = '';
            }
            $slide = $("<div class=\"content-slide " + cls + "\"><div class=\"row\"></div></div>");
            this.$contentSlideContainer.prepend($slide);
            return $slide.find('.row');
        };
        ContentSlider.prototype._renderSlideIndicators = function() {
            if (this.renderIndicators && !this.$container.find('.slide-indicators').length > 0) {
                this.$indicators = $("<div class=\"slide-indicators\"></div>");
                this.$indicatorContainer = $("<div class=\"slider-indicator-container\"></div>");
                this.$indicatorContainer.append(this.$prev);
                this.$indicatorContainer.append(this.$indicators);
                this.$indicatorContainer.append(this.$next);
                return this.$container.append(this.$indicatorContainer);
            }
        };
        ContentSlider.prototype._autoPlay = function() {
            var _this = this;
            if (this.autoPlay) {
                if (this.$container.length !== 0) {
                    this._autoPlayID = setClearableInterval((function() {
                        return _this.nextSlide();
                    }), this.autoPlay);
                    return console.log("Autoplaying....", this._autoPlayID);
                }
            }
        };
        ContentSlider.prototype._clearAutoPlay = function() {
            return clearAllIntervals();
        };
        ContentSlider.prototype._bindIndicatorHandlers = function() {
            var _this = this;
            return $(document).on('click' + this.namespace, "" + this.selector + " .indicator", function(ev) {
                return _this.goToSlide($(ev.currentTarget).data('slide-number'));
            });
        };
        ContentSlider.prototype._updateIndicators = function() {
            var i, _i, _ref, _results;
            if (this.$indicators) {
                this.$indicators.html('');
                _results = [];
                for (i = _i = 0, _ref = this.slideCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                    _results.push(this.$indicators.append(this._getIndicatorHTML(i)));
                }
                return _results;
            }
        };
        ContentSlider.prototype._getIndicatorHTML = function(num) {
            var active;
            active = num === this.currentIndex ? 'active' : '';
            return "<div class=\"indicator " + active + "\" data-slide-number=\"" + num + "\"></div>";
        };
        ContentSlider.prototype._getItemsPerSlide = function() {
            if (_.isFunction(this.itemsPerSlide)) {
                return this.itemsPerSlide();
            } else {
                return this.itemsPerSlide;
            }
        };
        ContentSlider.prototype._getItemsForSlide = function(index) {
            var end, itemsForSlide, itemsPerSlide, start;
            itemsPerSlide = this._getItemsPerSlide();
            start = index * itemsPerSlide;
            end = index * itemsPerSlide + itemsPerSlide;
            itemsForSlide = this.$items.slice(start, end);
            return itemsForSlide;
        };
        ContentSlider.prototype.initialize = function() {
            this.renderSlide({
                slideNum: 0,
                animateTransition: true
            });
            return this.$container.trigger('slider:updated');
        };
        ContentSlider.prototype._getDirection = function() {
            if (this.currentIndex < this.lastIndex) {
                return "left";
            } else {
                return "right";
            }
        };
        ContentSlider.prototype.goToSlide = function(slideNum) {
            this.renderSlide({
                slideNum: slideNum,
                animateTransition: true
            });
            return this._updateNavigation();
        };
        ContentSlider.prototype.prevSlide = function() {
            return this.renderSlide({
                slideNum: this._getPrevSlideNum(),
                animateTransition: true
            });
        };
        ContentSlider.prototype.nextSlide = function() {
            return this.renderSlide({
                slideNum: this._getNextSlideNum(),
                animateTransition: true
            });
        };
        ContentSlider.prototype.renderSlide = function(_arg) {
            var $indicators, animateTransition, slideNum, _ref;
            _ref = _arg != null ? _arg : {}, slideNum = _ref.slideNum, animateTransition = _ref.animateTransition;
            if (slideNum == null) {
                slideNum = this.currentIndex;
            }
            this.lastIndex = this.currentIndex || slideNum;
            this.$oldSlide.html(this.$activeSlide.html());
            this.$activeSlide.html(this._getItemsForSlide(slideNum));
            this.currentIndex = slideNum;
            $indicators = $("" + this.selector + " .indicator");
            $indicators.removeClass('active');
            $indicators.eq(slideNum).addClass('active');
            if (animateTransition) {
                if (_.isFunction(this.transitionFunction)) {
                    this.transitionFunction(this);
                } else {
                    this[this.transitionFunction](this);
                }
            }
            if (this.onAfterRenderSlide) {
                this.onAfterRenderSlide(this);
            }
            return root.lazyload();
        };
        ContentSlider.prototype._crossFade = function() {
            this.$oldSlide.show();
            return this.$activeSlide.hide().fadeIn(this.animationSpeed, 'easeInExpo');
        };
        ContentSlider.prototype._directionalSlideFade = function(speed) {
            var direction, newEnd, newStart, oldEnd, oldStart, width;
            if (speed == null) {
                speed = 800;
            }
            direction = this._getDirection();
            width = $(window).width();
            oldStart = {
                x: 0,
                opacity: 1
            };
            oldEnd = {
                opacity: 0,
                zIndex: -1
            };
            newStart = {
                opacity: 0
            };
            newEnd = {
                x: 0,
                opacity: 1
            };
            if (direction === 'right') {
                $.extend(oldEnd, {
                    x: "-50px"
                });
                $.extend(newStart, {
                    x: "50px"
                });
            } else {
                $.extend(oldEnd, {
                    x: "50px"
                });
                $.extend(newStart, {
                    x: "-50px"
                });
            }
            this.$oldSlide.show().css(oldStart).stop(true, true).transition(oldEnd, speed, 'out', function() {
                return $(this).css(oldStart).hide();
            });
            return this.$activeSlide.show().css(newStart).stop(true, true).transition(newEnd, speed, 'out');
        };
        ContentSlider.prototype._directionalSlide = function() {
            var direction, newEnd, newStart, oldEnd, oldStart, width;
            direction = this._getDirection();
            width = $(window).width();
            oldStart = {
                x: 0
            };
            newEnd = {
                x: 0
            };
            if (direction === 'right') {
                oldEnd = {
                    x: "-" + width + "px"
                };
                newStart = {
                    x: "" + width + "px"
                };
            } else {
                oldEnd = {
                    x: "" + width + "px"
                };
                newStart = {
                    x: "-" + width + "px"
                };
            }
            this.$oldSlide.show().css(oldStart).transition(oldEnd, this.animationSpeed, 'out', function() {
                return $(this).css(oldStart).hide();
            });
            return this.$activeSlide.show().css(newStart).transition(newEnd, this.animationSpeed, 'out');
        };
        return ContentSlider;
    })(root.mixins.Gallery);
    root.DeferUntil = (function() {
        function DeferUntil(_arg) {
            var _ref;
            _ref = _arg != null ? _arg : {}, this.deferredFunction = _ref.deferredFunction, this.deferralCheck = _ref.deferralCheck;
            this.executeIfLoaded = __bind(this.executeIfLoaded, this);
            this.interval = setInterval(this.executeIfLoaded, 500);
        }
        DeferUntil.prototype.executeIfLoaded = function() {
            if (!this.executed && this.deferralCheck()) {
                this.deferredFunction();
                return clearInterval(this.interval);
            }
        };
        return DeferUntil;
    })();
    $.fn.extend({
        loadFragment: function() {
            'Given a container element, target URL, and fragment template name, replace its contents.';
            var $this, data, defaultOptions, onSuccess, options, success, template, url;
            if (arguments.length === 1) {
                options = arguments[0];
                onSuccess = options.onSuccess;
            } else {
                url = arguments[0], template = arguments[1], success = arguments[2];
                data = {
                    template: template
                };
            }
            $this = $(this);
            if (!$this.length > 0) {
                return;
            }
            options = options || {};
            defaultOptions = {
                url: '.',
                data: {
                    template: options.template
                },
                success: function(response) {
                    $this.html(response);
                    if (onSuccess) {
                        return onSuccess(response);
                    }
                },
                headers: {
                    'X-GROVE-AJAX-HANDLER': options.ajax_handler,
                    'X-GROVE-AJAX': true,
                    'X-GROVE-TEMPLATE': options.template
                }
            };
            options = $.extend(defaultOptions, options);
            return $.ajax(options);
        },
        loadFragmentOnSubmit: function() {
            return 'Load template fragment on submit of form';
        }
    });
    $(document).on('ready pjax:end', function() {
        return $("[data-ajax-template]").each(function(index, el) {
            return $(el).on('submit', function(ev) {
                var $this;
                ev.preventDefault();
                $this = $(this);
                return $(el).loadFragment({
                    url: $this.attr('action'),
                    data: $this.serialize(),
                    ajax_handler: $this.data('ajax-handler'),
                    template: $this.data('ajax-template'),
                    type: $this.attr('method') || 'GET'
                });
            });
        });
    });
    Instafeed = (function() {
        function Instafeed(params) {
            var option, value;
            this.options = {
                target: 'instafeed',
                get: 'popular',
                resolution: 'thumbnail',
                sortBy: 'most-recent',
                links: true,
                limit: 15,
                mock: false
            };
            if (typeof params === 'object') {
                for (option in params) {
                    value = params[option];
                    this.options[option] = value;
                }
            }
            this.unique = this._genKey();
        }
        Instafeed.prototype.run = function() {
            var header, instanceName, script;
            if (typeof this.options.clientId !== 'string') {
                if (typeof this.options.accessToken !== 'string') {
                    throw new Error("Missing clientId or accessToken.");
                }
            }
            if (typeof this.options.accessToken !== 'string') {
                if (typeof this.options.clientId !== 'string') {
                    throw new Error("Missing clientId or accessToken.");
                }
            }
            if ((this.options.before != null) && typeof this.options.before === 'function') {
                this.options.before.call(this);
            }
            if (typeof document !== "undefined" && document !== null) {
                script = document.createElement('script');
                script.id = 'instafeed-fetcher';
                script.src = this._buildUrl();
                header = document.getElementsByTagName('head');
                header[0].appendChild(script);
                instanceName = "instafeedCache" + this.unique;
                window[instanceName] = new Instafeed(this.options);
                window[instanceName].unique = this.unique;
            }
            return true;
        };
        Instafeed.prototype.parse = function(response) {
            var anchor, fragment, header, htmlString, image, imageString, images, img, instanceName, reverse, sortSettings, _i, _j, _len, _len1;
            if (typeof response !== 'object') {
                if ((this.options.error != null) && typeof this.options.error === 'function') {
                    this.options.error.call(this, 'Invalid JSON data');
                    return false;
                } else {
                    throw new Error('Invalid JSON response');
                }
            }
            if (response.meta.code !== 200) {
                if ((this.options.error != null) && typeof this.options.error === 'function') {
                    this.options.error.call(this, response.meta.error_message);
                    return false;
                } else {
                    throw new Error("Error from Instagram: " + response.meta.error_message);
                }
            }
            if (response.data.length === 0) {
                if ((this.options.error != null) && typeof this.options.error === 'function') {
                    this.options.error.call(this, 'No images were returned from Instagram');
                    return false;
                } else {
                    throw new Error('No images were returned from Instagram');
                }
            }
            if ((this.options.success != null) && typeof this.options.success === 'function') {
                this.options.success.call(this, response);
            }
            if (this.options.sortBy !== 'most-recent') {
                if (this.options.sortBy === 'random') {
                    sortSettings = ['', 'random'];
                } else {
                    sortSettings = this.options.sortBy.split('-');
                }
                reverse = sortSettings[0] === 'least' ? true : false;
                switch (sortSettings[1]) {
                    case 'random':
                        response.data.sort(function() {
                            return 0.5 - Math.random();
                        });
                        break;
                    case 'recent':
                        response.data = this._sortBy(response.data, 'created_time', reverse);
                        break;
                    case 'liked':
                        response.data = this._sortBy(response.data, 'likes.count', reverse);
                        break;
                    case 'commented':
                        response.data = this._sortBy(response.data, 'comments.count', reverse);
                        break;
                    default:
                        throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");
                }
            }
            if ((typeof document !== "undefined" && document !== null) && this.options.mock === false) {
                document.getElementById(this.options.target).innerHTML = '';
                images = response.data;
                if (images.length > this.options.limit) {
                    images = images.slice(0, +this.options.limit + 1 || 9e9);
                }
                if ((this.options.template != null) && typeof this.options.template === 'string') {
                    htmlString = '';
                    imageString = '';
                    for (_i = 0, _len = images.length; _i < _len; _i++) {
                        image = images[_i];
                        imageString = this._makeTemplate(this.options.template, {
                            model: image,
                            id: image.id,
                            link: image.link,
                            image: image.images[this.options.resolution].url,
                            caption: this._getObjectProperty(image, 'caption.text'),
                            likes: image.likes.count,
                            comments: image.comments.count,
                            location: this._getObjectProperty(image, 'location.name')
                        });
                        htmlString += imageString;
                    }
                    document.getElementById(this.options.target).innerHTML = htmlString;
                } else {
                    fragment = document.createDocumentFragment();
                    for (_j = 0, _len1 = images.length; _j < _len1; _j++) {
                        image = images[_j];
                        img = document.createElement('img');
                        img.src = image.images[this.options.resolution].url;
                        if (this.options.links === true) {
                            anchor = document.createElement('a');
                            anchor.href = image.link;
                            anchor.appendChild(img);
                            fragment.appendChild(anchor);
                        } else {
                            fragment.appendChild(img);
                        }
                    }
                    document.getElementById(this.options.target).appendChild(fragment);
                }
                header = document.getElementsByTagName('head')[0];
                header.removeChild(document.getElementById('instafeed-fetcher'));
                instanceName = "instafeedCache" + this.unique;
                delete window[instanceName];
            }
            if ((this.options.after != null) && typeof this.options.after === 'function') {
                this.options.after.call(this);
            }
            return true;
        };
        Instafeed.prototype._buildUrl = function() {
            var base, endpoint, final;
            base = "https://api.instagram.com/v1";
            switch (this.options.get) {
                case "popular":
                    endpoint = "media/popular";
                    break;
                case "tagged":
                    if (typeof this.options.tagName !== 'string') {
                        throw new Error("No tag name specified. Use the 'tagName' option.");
                    }
                    endpoint = "tags/" + this.options.tagName + "/media/recent";
                    break;
                case "location":
                    if (typeof this.options.locationId !== 'number') {
                        throw new Error("No location specified. Use the 'locationId' option.");
                    }
                    endpoint = "locations/" + this.options.locationId + "/media/recent";
                    break;
                case "user":
                    if (typeof this.options.userId !== 'number') {
                        throw new Error("No user specified. Use the 'userId' option.");
                    }
                    if (typeof this.options.accessToken !== 'string') {
                        throw new Error("No access token. Use the 'accessToken' option.");
                    }
                    endpoint = "users/" + this.options.userId + "/media/recent";
                    break;
                default:
                    throw new Error("Invalid option for get: '" + this.options.get + "'.");
            }
            final = "" + base + "/" + endpoint;
            if (this.options.accessToken != null) {
                final += "?access_token=" + this.options.accessToken;
            } else {
                final += "?client_id=" + this.options.clientId;
            }
            final += "&count=" + this.options.limit;
            final += "&callback=instafeedCache" + this.unique + ".parse";
            return final;
        };
        Instafeed.prototype._genKey = function() {
            var S4;
            S4 = function() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return "" + (S4()) + (S4()) + (S4()) + (S4());
        };
        Instafeed.prototype._makeTemplate = function(template, data) {
            var output, pattern, varName, varValue, _ref;
            pattern = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/;
            output = template;
            while (pattern.test(output)) {
                varName = output.match(pattern)[1];
                varValue = (_ref = this._getObjectProperty(data, varName)) != null ? _ref : '';
                output = output.replace(pattern, "" + varValue);
            }
            return output;
        };
        Instafeed.prototype._getObjectProperty = function(object, property) {
            var piece, pieces;
            property = property.replace(/\[(\w+)\]/g, '.$1');
            pieces = property.split('.');
            while (pieces.length) {
                piece = pieces.shift();
                if ((object != null) && piece in object) {
                    object = object[piece];
                } else {
                    return null;
                }
            }
            return object;
        };
        Instafeed.prototype._sortBy = function(data, property, reverse) {
            var sorter;
            sorter = function(a, b) {
                var valueA, valueB;
                valueA = this._getObjectProperty(a, property);
                valueB = this._getObjectProperty(b, property);
                if (reverse) {
                    if (valueA > valueB) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                if (valueA < valueB) {
                    return 1;
                } else {
                    return -1;
                }
            };
            data.sort(sorter.bind(this));
            return data;
        };
        return Instafeed;
    })();
    root = typeof exports !== "undefined" && exports !== null ? exports : window;
    root.Instafeed = Instafeed;
    root.modules.InfiniteScroller = (function(_super) {
        __extends(InfiniteScroller, _super);
        InfiniteScroller.prototype.namespace = '.infinite-scroller';

        function InfiniteScroller(_arg) {
            var _ref;
            _ref = _arg != null ? _arg : {}, this.selector = _ref.selector, this.itemSelector = _ref.itemSelector, this.onAfterRenderSlide = _ref.onAfterRenderSlide, this.initialSlide = _ref.initialSlide;
            this.prev = __bind(this.prev, this);
            this.next = __bind(this.next, this);
            this._onResize = __bind(this._onResize, this);
            InfiniteScroller.__super__.constructor.apply(this, arguments);
            this.infinite = true;
            this._bindElements();
            this._bindDestructors();
            this._bindHandlers();
            this.goToSlide(this.initialSlide || 0);
        }
        InfiniteScroller.prototype._bindElements = function() {
            this.$container = $(this.selector);
            this.$items = this.$container.find(this.itemSelector);
            this.$content = this.$container.find('.infinite-scroller-content');
            return this.$navs = this._renderNavs();
        };
        InfiniteScroller.prototype._getSlideCount = function() {
            return this.$items.length;
        };
        InfiniteScroller.prototype._bindDestructors = function() {
            return $(window).unbind(this.namespace);
        };
        InfiniteScroller.prototype._bindHandlers = function() {
            $(window).on('resize' + this.namespace, this._onResize);
            this._onResize();
            this.$prev.on('click' + this.namespace, this.prev);
            this.$next.on('click' + this.namespace, this.next);
            if ($("html").hasClass('is-mobile')) {
                this.$container.hammer({
                    drag_lock_to_axis: true
                }).on('swiperight' + this.namespace, this.prev);
                return this.$container.hammer({
                    drag_lock_to_axis: true
                }).on('swipeleft' + this.namespace, this.next);
            }
        };
        InfiniteScroller.prototype._onResize = function() {
            this.windowWidth = $(window).width();
            return this.goToSlide(this.currentIndex);
        };
        InfiniteScroller.prototype._renderNavs = function() {
            var $navContainer;
            $navContainer = $('<div class="infinite-nav-container">\n	<div class="infinite-scroller-nav next">\n		<span class="icon-right-arrow"></span>\n	</div>\n	<div class="infinite-scroller-nav prev">\n		<span class="icon-left-arrow"></span>\n	</div>\n</div>');
            this.$container.append($navContainer);
            this.$next = $navContainer.find('.next');
            return this.$prev = $navContainer.find('.prev');
        };
        InfiniteScroller.prototype.next = function() {
            var next;
            next = this._getNextSlideNum();
            return this.goToSlide(next);
        };
        InfiniteScroller.prototype.prev = function() {
            var prev;
            prev = this._getPrevSlideNum();
            console.log(prev);
            return this.goToSlide(prev);
        };
        InfiniteScroller.prototype.currentSlide = function() {
            return this.$items.eq(this.currentIndex);
        };
        InfiniteScroller.prototype.goToSlide = function(index) {
            var $item, centerOffset, ex, itemWidth, leftFlush, leftOffset;
            try {
                this.currentIndex = index;
                $item = this.$items.eq(index);
                leftOffset = $item.offset().left - this.$content.offset().left;
                itemWidth = $item.width();
                leftFlush = (this.windowWidth / 2) - leftOffset;
                centerOffset = leftFlush - (.5 * itemWidth);
                this.$content.stop(true).animate({
                    x: centerOffset
                }, 800, 'easeInOutExpo');
                if (this.onAfterRenderSlide != null) {
                    return this.onAfterRenderSlide(this);
                }
            } catch (_error) {
                ex = _error;
                return console.log(ex);
            }
        };
        return InfiniteScroller;
    })(root.mixins.Gallery);
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    if (root.utils == null) {
        root.utils = {};
    }
    root.utils.MatchHeight = (function() {
        MatchHeight.prototype.namespace = '.match-height';

        function MatchHeight(_arg) {
            var _ref;
            _ref = _arg != null ? _arg : {}, this.target = _ref.target, this.copy = _ref.copy, this.on = _ref.on;
            this.onResize = __bind(this.onResize, this);
            this._bindElements();
            this._bindDestructors();
            this._bindHandlers();
        }
        MatchHeight.prototype._bindElements = function() {
            this.$target = $(this.target);
            return this.$copy = $(this.copy);
        };
        MatchHeight.prototype._bindHandlers = function() {
            var debounced;
            debounced = this.onResize;
            $(window).on('resize' + this.namespace, debounced);
            debounced();
            _.delay(function() {
                return debounced();
            }, 200);
            return this.$target.find('img').on('load' + this.namespace, this.onResize);
        };
        MatchHeight.prototype._bindDestructors = function() {
            return $(window).unbind(this.namespace);
        };
        MatchHeight.prototype.onResize = function() {
            this._bindElements();
            return this.$target.css({
                height: this.$copy.outerHeight()
            });
        };
        return MatchHeight;
    })();
    root.utils.ViewportHeight = (function() {
        'The VH unit is not well supported. Use data-tags instead.\
	data-viewport-unit="line-height: 100vh; height: 100vh;';
        ViewportHeight.prototype.namespace = '.viewport-styles';

        function ViewportHeight(_arg) {
            var _ref;
            _ref = _arg != null ? _arg : {}, this.element = _ref.element, this.styles = _ref.styles;
            this.onResize = __bind(this.onResize, this);
            this._vmin = __bind(this._vmin, this);
            this._vmax = __bind(this._vmax, this);
            this._vw = __bind(this._vw, this);
            this._vh = __bind(this._vh, this);
            this.$element = $(this.element);
            if (this.$element.hasClass('vp-loaded')) {
                return;
            }
            this.$element.addClass('vp-loaded');
            this.$window = $(window);
            this._bindDestructors();
            this._bindHandlers();
            this.onResize();
        }
        ViewportHeight.prototype._bindDestructors = function() {
            return this.$window.unbind(this.namespace);
        };
        ViewportHeight.prototype._bindHandlers = function() {
            return $(window).on('resize' + this.namespace, _.debounce(this.onResize, 50));
        };
        ViewportHeight.prototype._getStyles = function() {
            var key, style, styles, value, _i, _len, _ref, _ref1;
            styles = {};
            _ref = _.filter(this.styles.split(';'), Boolean);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                style = _ref[_i];
                _ref1 = style.split(':'), key = _ref1[0], value = _ref1[1];
                styles[$.trim(key)] = this._getValue(value);
            }
            this._styles = styles;
            return this._styles;
        };
        ViewportHeight.prototype._getValue = function(value) {
            var func, unit, viewportUnitMap;
            viewportUnitMap = {
                'vh': this._vh,
                'vw': this._vw,
                'vmax': null,
                'vmin': null
            };
            value = $.trim(value.replace(';', ''));
            for (unit in viewportUnitMap) {
                func = viewportUnitMap[unit];
                if (value.substr(unit)) {
                    return func(parseInt(value)) + 'px';
                }
            }
        };
        ViewportHeight.prototype._vh = function(value) {
            return this.$window.height() * value / 100;
        };
        ViewportHeight.prototype._vw = function(value) {
            return this.$window.width() * value / 100;
        };
        ViewportHeight.prototype._vmax = function(value) {
            return Math.max(this._vh(value), this._vw(value));
        };
        ViewportHeight.prototype._vmin = function(value) {
            return Math.min(this._vh(value), this._vw(value));
        };
        ViewportHeight.prototype.onResize = function() {
            this.$element.css(this._getStyles());
            this.$element.trigger('change:size');
            return $("[data-viewport-style]:not(.vp-loaded)").each(function(index, el) {
                return new root.utils.ViewportHeight({
                    element: el,
                    styles: $(el).data('viewport-style')
                });
            });
        };
        return ViewportHeight;
    })();
    root.utils.scrollTo = function(speed, easing) {
        return $('body, html').animate({
            scrollTop: $(this).offset().top - 50
        }, speed || 1000, easing || 'easeInOutExpo');
    };
    root.utils.stickTo = function(element, stickTo, type) {
        return 'Stick to an element upon scrolling';
    };
    $.fn.extend({
        'scrollTo': function() {
            return root.utils.scrollTo.apply(this, arguments);
        },
        'forceLoadLazy': function() {
            return $(this).find(".lazy:not(.is-loaded)").each(function(index, el) {
                return $(el).trigger('appear');
            });
        }
    });
    root.utils.readCookie = function(name) {
        var c, ca, i, nameEQ;
        nameEQ = name + "=";
        ca = document.cookie.split(";");
        i = 0;
        while (i < ca.length) {
            c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length).replace(/"/g, '');
            }
            i++;
        }
    };
    root.utils.setCookie = function(cookieName, cookieValue) {
        var expire, today;
        today = new Date();
        expire = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        return document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
    };
    root.lazyload = function() {
        var onLazyLoad;
        $(window).unbind('.lazy');
        onLazyLoad = function() {
            var $this, background, src;
            $this = $(this);
            $this.addClass('is-loaded');
            background = $this.data('background');
            if (background === 'parent') {
                src = $this.data('original');
                $this.parent().css({
                    'background-image': "url(" + src + ")"
                }).addClass('is-loaded');
                return $this.remove();
            }
        };
        $('img.lazy:not(.is-loaded)').lazyload({
            failure_limit: 10,
            threshold: 400,
            event: 'scroll.lazy',
            load: onLazyLoad
        });
        return $('img.lazy.lazy-full-height:not(.is-loaded)').lazyload({
            failure_limit: 10,
            threshold: 400,
            load: onLazyLoad,
            event: 'scroll.lazy'
        });
    };
    root.loader.onReady(function() {
        var $tooltip, delay, sequentialLoad;
        root.lazyload();
        delay = 0;
        sequentialLoad = function(func, delayAmount) {
            _.delay(function() {
                return func();
            }, delay);
            return delay += delayAmount;
        };
        $('img.sequential-load:not(.is-loaded)').each(function(index, el) {
            var $el, _this = this;
            $el = $(el);
            $el.hide();
            $el.attr('src', $el.data('original'));
            return sequentialLoad(function() {
                return $(_this).fadeIn();
            }, 75);
        });
        $("[data-viewport-style]").each(function(index, el) {
            return new root.utils.ViewportHeight({
                element: el,
                styles: $(el).data('viewport-style')
            });
        });
        $("[data-match-height]").each(function(index, el) {
            var $el, copy, matchHeight, target;
            $el = $(el);
            target = $el;
            copy = $el.data('match-height');
            return matchHeight = new root.utils.MatchHeight({
                target: $el,
                copy: $el.data('match-height')
            });
        });
        $("[data-scroll-to]").each(function(index, el) {
            var $scrollTo, selector;
            selector = $(el).data('scroll-to');
            $scrollTo = $(selector);
            $(window).unbind('.scroll-to');
            return $(el).on('click.scroll-to', function() {
                return $scrollTo.scrollTo();
            });
        });
        $tooltip = void 0;
        return $("[data-util-hover-tooltip]").each(function(index, el) {
            if ($tooltip === void 0) {
                $tooltip = $("<div class=\"util-hover-tooltip\"></div>");
                $("body").append($tooltip);
            }
            $(el).hover(function() {
                return $tooltip.stop(true, true).fadeIn();
            }, function() {
                return $tooltip.fadeOut();
            });
            return $(el).on('mousemove', function(ev) {
                ev.pageX;
                ev.pageY;
                return $tooltip.css({
                    left: ev.clientX + 10,
                    top: ev.clientY + 10
                }).html($(this).data('util-hover-tooltip'));
            });
        });
    });
    root.utils.isElementInViewport = function(el) {
        var rect;
        if (el instanceof jQuery) {
            el = el[0];
        }
        rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    };
    $.fn.isPartiallyInViewport = function() {
        var bounds, viewport, win;
        win = $(window);
        viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
        bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
    };
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.loader.onReady(function() {
        var href;
        href = window.location.href;
        if (root.LAST_GOOGLE_ANALYTICS_LOCATION !== href) {
            root.LAST_GOOGLE_ANALYTICS_LOCATION = href;
            return $(document).trigger("page-url-changed");
        } else {
            return console.log("Analytics: not sending hit; same url as before: " + href);
        }
    });
    $(document).on('page-url-changed', function() {
        ga('set', 'location', window.location.href);
        ga('send', 'pageview');
        return console.log("Analytics: sending hit, this is a new url: " + window.location.href);
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.components.component = function($element, args) {};
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.controllers.journalCategory = function($element, args) {
        var $journals, _this = this;
        console.log('journal category controller');
        $journals = $('[js-journal-slide]:not(:first)');
        return $("[js-journal-filter]").on('click', function(ev) {
            var $el, $matches, category, query;
            $el = $(ev.currentTarget);
            category = ($el.attr('js-journal-filter')).toLowerCase();
            console.log('clicked', category);
            $journals.hide();
            query = "[js-journal-slide=\"" + category + "\"]";
            console.log("Querying: ", query);
            $matches = $(query);
            $matches.fadeIn();
            console.log('matches', $matches);
            return $('html, body').animate({
                scrollTop: $(".journal-categories").offset().top - root.variables.navbarHeight
            }, 1000, 'easeInOutExpo');
        });
    };
    $(document).on('ready pjax:end', function() {
        var $globalMessagesContainer;
        $globalMessagesContainer = $(".global-message-container");
        return $globalMessagesContainer.find('.close').click(function(ev) {
            return $globalMessagesContainer.slideUp();
        });
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.NavbarHandler = (function() {
        function NavbarHandler() {
            this.onScroll = __bind(this.onScroll, this);
            this._bindElements();
            this._bindHandlers();
        }
        NavbarHandler.prototype._bindElements = function() {
            this.$navbar = $(".navbar");
            return this.$stickyNavbarWrapper = $(".sticky-navbar-wrapper");
        };
        NavbarHandler.prototype._bindHandlers = function() {
            return this._bindStickyNavHandler();
        };
        NavbarHandler.prototype._bindStickyNavHandler = function() {
            return $(window).scroll(_.debounce(this.onScroll, 10));
        };
        NavbarHandler.prototype.onScroll = function() {
            var top;
            top = $(window).scrollTop();
            this.stickyTop = 25;
            if (top >= this.stickyTop) {
                return this.onSticky();
            } else {
                return this.onUnSticky();
            }
        };
        NavbarHandler.prototype.onSticky = function() {
            return this.$navbar.addClass('is-sticky');
        };
        NavbarHandler.prototype.onUnSticky = function() {
            return this.$navbar.removeClass('is-sticky');
        };
        return NavbarHandler;
    })();
    root.NavbarCartHandler = (function() {
        function NavbarCartHandler() {
            this.onCartClick = __bind(this.onCartClick, this);
            this._bindElements();
            this._bindHandlers();
        }
        NavbarCartHandler.prototype._bindElements = function() {
            this.$cartLink = $(".cart-link");
            this.$cartPopup = $('.cart-popup-wrapper');
            return this.$cartPopup.data('handler', this);
        };
        NavbarCartHandler.prototype._bindHandlers = function() {
            var _this = this;
            return $(document).on('click', '.cart-popup-wrapper .close', function() {
                return _this.close();
            });
        };
        NavbarCartHandler.prototype.onCartClick = function(ev) {
            if (this.$cartPopup.is(':visible')) {
                return this.close();
            } else {
                return this.open();
            }
        };
        NavbarCartHandler.prototype.open = function() {
            return this.$cartPopup.slideDown();
        };
        NavbarCartHandler.prototype.close = function() {
            return this.$cartPopup.fadeOut();
        };
        return NavbarCartHandler;
    })();
    ScrollSpyElement = (function() {
        function ScrollSpyElement(element) {
            this.getOffset = __bind(this.getOffset, this);
            var target;
            this.$element = $(element);
            target = this.$element.data('scrollspy');
            this.$target = $(target);
        }
        ScrollSpyElement.prototype.calculateStatus = function(top) {
            var offset;
            offset = this.getOffset();
            this.topOffset = offset;
            if (offset - 50 <= top) {
                return this.activate();
            } else {
                return this.deactivate();
            }
        };
        ScrollSpyElement.prototype.getOffset = function() {
            var offset;
            offset = this.$target.offset();
            if (offset) {
                return offset.top;
            }
            return 0;
        };
        ScrollSpyElement.prototype.activate = function() {
            return this.$element.addClass('is-active');
        };
        ScrollSpyElement.prototype.deactivate = function() {
            return this.$element.removeClass('is-active');
        };
        return ScrollSpyElement;
    })();
    root.ScrollSpyHandler = (function() {
        ScrollSpyHandler.prototype.namespace = '.scrollspy';

        function ScrollSpyHandler() {
            this.onScroll = __bind(this.onScroll, this);
            this.$watchedElements = [];
            this._bindDestructors();
            this._bindHandlers();
            this.$elements = $([]);
        }
        ScrollSpyHandler.prototype._bindDestructors = function() {
            return $(window).unbind(this.namespace);
        };
        ScrollSpyHandler.prototype._bindHandlers = function() {
            return $(window).on('scroll' + this.namespace, _.throttle(this.onScroll, 25));
        };
        ScrollSpyHandler.prototype.onScroll = function() {
            var $spyElement, max, top, _i, _len, _ref;
            top = $(window).scrollTop();
            _ref = this.$watchedElements;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                $spyElement = _ref[_i];
                $spyElement.calculateStatus(top);
            }
            max = 0;
            return this.$elements.filter('.is-active:not(:last)').removeClass('is-active');
        };
        ScrollSpyHandler.prototype.addElement = function(el) {
            'Store all scrollspy elements';
            this.$watchedElements.push(new ScrollSpyElement(el));
            return this.$elements = this.$elements.add(el);
        };
        return ScrollSpyHandler;
    })();
    'Given an element to highlight, and an element to watch, efficiently toggle the state of highlight elements ';
    $(function() {
        new root.NavbarHandler;
        return new root.NavbarCartHandler;
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    if ($.support.pjax) {
        $.pjax.defaults.timeout = 3000;
        $.pjax.defaults.scrollTo = 0;
        $(document).on('ready', function() {
            $(document).on('click', 'a', function(ev) {
                var maxPJAX, pjaxCount;
                maxPJAX = 30;
                pjaxCount = root.utils.readCookie('pjax-count') || maxPJAX;
                if (pjaxCount > 0) {
                    $.pjax.click(ev, {
                        container: '.pjax-container'
                    });
                    return root.utils.setCookie('pjax-count', pjaxCount - 1);
                } else {
                    root.utils.setCookie('pjax-count', maxPJAX);
                    return true;
                }
            });
            $(document).on('submit', 'form[data-pjax]', function(ev) {
                return $.pjax.submit(ev, '.pjax-container');
            });
            $(document).on('pjax:send', function() {
                $(".loading-overlay").fadeIn(300);
                return console.log("pjax:send loading overlay in");
            });
            $(document).on('pjax:success', function() {
                $(".loading-overlay").fadeOut(200);
                $(window).unbind('.clear-on-pjax');
                console.log("pjax:success fading out");
                return root.utils.bindJSControllers();
            });
            return $(document).on('pjax:timeout', function(ev) {
                return ev.preventDefault();
            });
        });
    }
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.jRes = jRespond([{
        label: 'touch',
        enter: 0,
        exit: 699
    }, {
        label: 'desktop',
        enter: 700,
        exit: 1439
    }, {
        label: 'max',
        enter: 1440,
        exit: 10000
    }]);
    NewsletterPopupHandler = (function() {
        NewsletterPopupHandler.prototype.namespace = '.newsletter';
        NewsletterPopupHandler.prototype.newsletterPageCountCookieName = 'newsletter-page-count-cookie';
        NewsletterPopupHandler.prototype.newsletterShownCookieName = 'newsletter-shown-cookie';
        NewsletterPopupHandler.prototype.newsletterVisitDurationCookieName = 'newsletter-visit-duration-cookie';
        NewsletterPopupHandler.prototype.showSecondsThreshold = 60;
        NewsletterPopupHandler.prototype.showClickThreshold = 2;

        function NewsletterPopupHandler() {
            this.showOnce = __bind(this.showOnce, this);
            this.onInterval = __bind(this.onInterval, this);
            this.hide = __bind(this.hide, this);
            this.show = __bind(this.show, this);
        }
        NewsletterPopupHandler.prototype._bindElements = function() {
            this.$trigger = $(".newsletter-popup-trigger");
            this.$close = $(".newsletter-popup .close");
            this.$popup = $(".newsletter-popup");
            this.$form = $(".newsletter-signup-form");
            return this.$overlay = this.$popup.parent();
        };
        NewsletterPopupHandler.prototype._bindHandlers = function() {
            this.$trigger.on('click' + this.namespace, this.show);
            this.$close.on('click' + this.namespace, this.hide);
            this.$overlay.on('click' + this.namespace, this.hide);
            this.$popup.on('click' + this.namespace, function(ev) {
                return ev.stopPropagation();
            });
            this.intervalID = setInterval(this.onInterval, 10000);
            if (window.location.hash && window.location.hash.substr(1) === 'newsletter-signup') {
                return this.show();
            }
        };
        NewsletterPopupHandler.prototype.show = function() {
            return this.$overlay.fadeIn();
        };
        NewsletterPopupHandler.prototype.hide = function() {
            return this.$overlay.fadeOut();
        };
        NewsletterPopupHandler.prototype.onInterval = function() {
            var secondsOnSite, startDate;
            if (root.utils.readCookie(this.newsletterShownCookieName)) {
                return clearInterval(this.intervalID);
            } else {
                console.log('checking time elapsed');
                startDate = new Date(decodeURIComponent(root.utils.readCookie(this.newsletterVisitDurationCookieName)));
                secondsOnSite = (new Date() - startDate) / 1000;
                console.log(secondsOnSite, 'seconds');
                if (secondsOnSite > this.showSecondsThreshold) {
                    return this.showOnce();
                }
            }
        };
        NewsletterPopupHandler.prototype.showOnce = function() {
            if (!root.utils.readCookie(this.newsletterShownCookieName)) {
                _.delay(function() {
                    return $(".newsletter-popup-trigger").click();
                }, 2000);
                return root.utils.setCookie(this.newsletterShownCookieName, true);
            }
        };
        NewsletterPopupHandler.prototype.onPageLoad = function() {
            var cookie, pageCount;
            if (!this._loaded) {
                this._bindElements();
                this._bindHandlers();
                this._loadeded = true;
            }
            if (!root.utils.readCookie(this.newsletterVisitDurationCookieName)) {
                console.log('setting date', new Date());
                root.utils.setCookie(this.newsletterVisitDurationCookieName, new Date());
            }
            cookie = root.utils.readCookie(this.newsletterPageCountCookieName);
            console.log(cookie, 'cookie');
            pageCount = parseInt(cookie);
            if (isNaN(pageCount)) {
                console.log('Page count is nan');
                pageCount = 0;
            }
            pageCount = pageCount + 1;
            root.utils.setCookie(this.newsletterPageCountCookieName, pageCount);
            console.log(pageCount, 'pg count');
            if (pageCount > this.showClickThreshold) {
                return this.showOnce();
            }
        };
        return NewsletterPopupHandler;
    })();
    newsletterHandler = new NewsletterPopupHandler();
    root.loader.onReady(function() {
        return newsletterHandler.onPageLoad();
    });
    root.loader.executeOnKey('blog-list', function() {});
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.loader.executeOnKey('cart', function() {
        $(".debug-add-to-cart").click(function() {
            var variantID;
            variantID = $(this).parent().find('select').val();
            return $.ajax({
                url: "/my-cart/add-to-cart/" + variantID + "/",
                method: 'get',
                success: function(response) {
                    $(".cart-popup-wrapper").loadFragment("/cart/", 'shop/cart/fragments/cart_popup.html');
                    return $(".cart-popup-wrapper").data('handler').open();
                }
            });
        });
        $(".update-cart").click(function() {
            return $.ajax({
                url: "/my-cart/update/",
                type: 'post',
                data: $(".cart-form").serialize()
            });
        });
        $(".remove-item").click(function() {
            var $li;
            $li = $(this).closest('li');
            $li.find('.cart-quantity input').val(0);
            return $li.find('.update').click();
        });
        return $(".update").click(function() {
            return $(this).closest('form').attr('action', '/my-cart/update/').submit();
        });
    });
    root.loader.onReady(function() {
        return $.ajax({
            url: '/my-cart/',
            dataType: 'json',
            data: {
                format: 'json'
            },
            success: function(response) {
                if (response.cart.item_count > 0) {
                    $(".cart-link").addClass('has-items');
                } else {
                    $(".cart-link").removeClass('has-items');
                }
                return $(".cart-count").html(response.cart.item_count);
            }
        });
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;


    root.loader.executeOnKey('collection', function() {


        /* wdr [] */



        $(".collection-content").hover(function() {
            var _this = this;
            $(this).addClass('is-active');
            return _.delay(function() {
                var $description, $images;
                $description = $(_this).find('.collection-description');
                $description.animate({
                    height: "show",
                    marginTop: "show",
                    marginBottom: "show",
                    paddingTop: "show",
                    paddingBottom: "show",
                    opacity: 1
                }, 600, 'easeInOutCubic');
                $images = $(_this).parent().find('.collection-image');
                return $images.stop(true).animate({
                    scale: 1.07
                }, 10000);
            }, 300);
        }, function() {
            var _this = this;
            $(this).removeClass('is-active');
            return _.delay(function() {
                var $description, $images;
                $description = $(_this).find('.collection-description');
                $description.stop(true, true).animate({
                    height: "hide",
                    marginTop: "hide",
                    marginBottom: "hide",
                    paddingTop: "hide",
                    paddingBottom: "hide"
                }, 600, 'easeInOutCubic');
                $images = $(_this).parent().find('.collection-image');
                return $images.stop(true).animate({
                    scale: 1
                }, 2000);
            }, 300);
        });
        return $(".collection-content").on('mouseenter', function(ev) {
            var $images;
            return $images = $(this).parent().find('.collection-image');
        });
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.loader.executeOnKey(['collection_detail', 'product'], function() {
        var $images;
        new root.modules.ContentSlider({
            selector: '.collection-slider-product-filters',
            itemSelector: '.product-filter',
            renderIndicators: true,
            renderNavigation: false,
            itemsPerSlide: function() {
                return 10;
            },
            transitionFunction: function(slider) {
                return slider._crossFade();
            }
        });
        new root.modules.ContentSlider({
            selector: '.collection-slider-collection-filters',
            itemSelector: '.product-filter',
            renderIndicators: true,
            renderNavigation: false,
            itemsPerSlide: function() {
                return 10;
            },
            transitionFunction: function(slider) {
                return slider._crossFade();
            }
        });
        root.CollectionFilterManager = (function() {
            function CollectionFilterManager() {
                this.onLabelClick = __bind(this.onLabelClick, this);
                this._show = __bind(this._show, this);
                this._bindElements();
                this._bindHandlers();
            }
            CollectionFilterManager.prototype._bindElements = function() {
                this.$filterWrapper = $('.collection-filter-wrapper');
                this.$tabs = $(".collection-filter-tab");
                return this.$tabLabels = this.$tabs.find('.collection-filter-tab-label');
            };
            CollectionFilterManager.prototype._bindHandlers = function() {
                var _this = this;
                this.hoverIntentID = null;
                this.$tabLabels.on('click', this._show);
                this.$tabLabels.on('mouseenter', function(ev) {
                    clearTimeout(_this.hoverIntentID);
                    return _this.hoverIntentID = _.delay(function() {
                        return _this._show(ev);
                    }, 350);
                });
                return $(".collection-filter-dropdown").on('mouseleave', function() {
                    _this.$tabs.removeClass('is-active');
                    return _this.$filterWrapper.removeClass('is-active');
                });
            };
            CollectionFilterManager.prototype._show = function(ev) {
                var $this;
                $this = $(ev.currentTarget);
                this.$tabs.removeClass('is-active');
                $this.closest('.collection-filter-tab').addClass('is-active');
                return this.$filterWrapper.addClass('is-active');
            };
            CollectionFilterManager.prototype.onLabelClick = function(ev) {
                var $tab, $this;
                $this = $(ev.currentTarget);
                $tab = $this.closest('.collection-filter-tab');
                if ($tab.hasClass('is-active')) {
                    this.$tabs.removeClass('is-active');
                    this.$filterWrapper.removeClass('is-active');
                    return this.close($tab);
                } else {
                    this.$tabs.removeClass('is-active');
                    $this.closest('.collection-filter-tab').addClass('is-active');
                    this.$filterWrapper.addClass('is-active');
                    return this.open($tab);
                }
            };
            CollectionFilterManager.prototype.open = function($tab) {};
            CollectionFilterManager.prototype.close = function($tab) {};
            return CollectionFilterManager;
        })();
        new CollectionFilterManager();
        if (!window.is_mobile) {
            $images = $(".collection-header-container .collection-image");
            return $(window).on('scroll.clear-on-pjax', function() {
                var initial, maxRange, offset, opacity, percentage, scrollTop;
                if (window.windowHeight == null) {
                    window.windowHeight = $(window).height();
                }
                scrollTop = $(window).scrollTop();
                if (scrollTop > 2000) {
                    return;
                }
                percentage = scrollTop / 400;
                maxRange = 100;
                initial = 0;
                offset = initial - (maxRange * percentage);
                opacity = 1 - percentage;
                return $(".collection-header-container .collection-image").css({
                    'background-position-y': "" + (offset.toFixed(0)) + "px",
                    opacity: opacity
                });
            });
        }
    });
    root.loader.executeOnKey(['contact'], function() {
        return $(".contact-form-subject").on('change', function() {
            var value;
            value = $(this).val();
            $(".contact-form").hide();
            return $("#contact-form-" + value).fadeIn();
        }).trigger('change');
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.loader.executeOnKey('corporate', function() {
        var updateHeights;
        setTimeout(function() {
            if (window.location.pathname === '/corporate/') {
                return window.location.href = 'http://engravegoods.com';
            }
        }, 10000);
        new root.modules.ContentSlider({
            selector: '.content-slider-container.corporate-marquee',
            itemSelector: '.corporate-marquee-item',
            renderIndicators: true,
            autoPlay: 4000,
            itemsPerSlide: function() {
                return 1;
            },
            transitionFunction: function(slider) {
                return slider._crossFade();
            },
            onAfterRenderSlide: function(slider) {
                return $("[data-viewport-style]").each(function(index, el) {
                    return new root.utils.ViewportHeight({
                        element: el,
                        styles: $(el).data('viewport-style')
                    });
                });
            }
        });
        new root.modules.ContentSlider({
            selector: '.content-slider-container.corporate-gallery',
            itemSelector: '.corporate-gallery-item',
            renderIndicators: false,
            itemsPerSlide: function() {
                return 3;
            },
            transitionFunction: function(slider) {
                return slider._crossFade();
            },
            onAfterRenderSlide: function(slider) {}
        }, $(document).on('click', ".corporate-order-form .close", function() {
            return $(".corporate-order-overlay").fadeOut();
        }), $(document).on('click', ".order-now, .learn-more-button", function(ev) {
            return $("html, body").animate({
                scrollTop: $("#crmWebToEntityForm").offset().top
            }, 1000, 'easeInOutExpo');
        }), $(document).on('click', '.corporate-order-overlay', function() {
            return $(this).fadeOut();
        }), $(document).on('click', ".corporate-order-form", function(ev) {
            return ev.stopPropagation();
        }));
        intervals = [];
        setClearableInterval = function(func, interval) {
            var id;
            id = setInterval(func, interval);
            intervals.push(id);
            console.log("setting interval", id);
            return id;
        };
        clearAllIntervals = function() {
            var id, _i, _len;
            for (_i = 0, _len = intervals.length; _i < _len; _i++) {
                id = intervals[_i];
                console.log('clearing interval...', id);
                clearInterval(id);
            }
            return intervals = [];
        };
        setClearableInterval(function() {
            return $(".corporate-product-stacked-image-child").toggleClass('is-visible');
        }, 4000);
        updateHeights = function() {
            var $el, $elements, currentRowStart, currentTallest, rowDivs, topPosition;
            console.log("Updating heights");
            $elements = $("[data-equal-height]");
            currentTallest = 0;
            currentRowStart = 0;
            rowDivs = new Array();
            $el = void 0;
            topPosition = 0;
            $elements.css("height", "auto");
            setTimeout((function() {
                $elements.each(function() {
                    var currentDiv, topPostion;
                    $el = $(this);
                    topPostion = $el.position().top;
                    if (currentRowStart !== topPostion) {
                        currentDiv = 0;
                        while (currentDiv < rowDivs.length) {
                            rowDivs[currentDiv].height(currentTallest);
                            currentDiv++;
                        }
                        rowDivs.length = 0;
                        currentRowStart = topPostion;
                        currentTallest = $el.height();
                        rowDivs.push($el);
                    } else {
                        rowDivs.push($el);
                        currentTallest = (currentTallest < $el.height() ? $el.height() : currentTallest);
                    }
                    currentDiv = 0;
                    while (currentDiv < rowDivs.length) {
                        rowDivs[currentDiv].height(currentTallest);
                        currentDiv++;
                    }
                });
            }), 200);
        };
        window.updateHeights = updateHeights;
        $(window).on("resize", updateHeights);
        return updateHeights();
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.loader.executeOnKey(['faq'], function() {
        var hash;
        $(".question").on('click', function(ev) {
            var $faqItem;
            $faqItem = $(this).closest('.faq-item');
            $faqItem.addClass('is-active');
            $faqItem.find('.answer').slideDown();
            return ev.preventDefault();
        });
        hash = window.location.hash.substr(1);
        return $(".view-more").on('click', function() {
            console.log('faq clicked');
            $(this).closest('ul').find('.faq-item.is-hidden').slideDown();
            return $(this).slideUp();
        });
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.loader.onReady(function() {});
    root.loader.executeOnKey('home', function() {
        var $subnav, TeamManager, el, instagramFeed, navHeight, scrollspy, workshopPositionElements, _i, _len, _ref;
        scrollspy = new root.ScrollSpyHandler();
        _ref = $("[data-scrollspy]");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            scrollspy.addElement(el);
        }
        $subnav = $(".no-touch .subnav");
        navHeight = 50;
        $(window).on('scroll.home', _.throttle(function() {
            var offset, stickAt, top;
            top = $(window).scrollTop();
            offset = $(window).height() - $subnav.height();
            stickAt = top + navHeight;
            if (offset <= stickAt) {
                return $subnav.addClass('is-sticky');
            } else {
                return $subnav.removeClass('is-sticky');
            }
        }, 10));
        root.homeSlider = new root.modules.ContentSlider({
            selector: '.home-grovemade .content-slider-container',
            itemSelector: '.home-marquee-item',
            renderNavigation: true,
            renderIndicators: false,
            autoPlay: 6000,
            autoPlayStopOnInteraction: true,
            animationSpeed: 1000,
            itemsPerSlide: function() {
                return 1;
            },
            transitionFunction: function(slider) {
                var navClass;
                slider.$oldSlide.show();
                navClass = slider.$activeSlide.children().data('nav-class');
                navClass = "is-" + navClass;
                if (slider._usedNavClasses == null) {
                    slider._usedNavClasses = [];
                }
                slider._usedNavClasses.push(navClass);
                $("body").removeClass(slider._usedNavClasses.join(' ')).addClass(navClass);
                slider.$activeSlide.hide().delay(600).fadeIn(600);
                return $("[data-viewport-style]").each(function(index, el) {
                    return new root.utils.ViewportHeight({
                        element: el,
                        styles: $(el).data('viewport-style')
                    });
                });
            },
            onAfterRenderSlide: function(slider) {}
        });
        root.homeSlider.autoPlayStopOnInteraction = true;
        root.products = new root.modules.InfiniteScroller({
            selector: '.home-featured-products .featured-products-scroller',
            itemSelector: '.featured-product'
        });
        new root.modules.ContentSlider({
            selector: '.home-story .content-slider-container',
            itemSelector: '.content-item',
            renderIndicators: false,
            itemsPerSlide: function() {
                return 1;
            }
        });
        new root.modules.ContentSlider({
            selector: '.home-press .content-slider-container',
            itemSelector: '.press-item',
            renderIndicators: false,
            renderNavigation: false,
            itemsPerSlide: function() {
                return 6;
                if ($(window).width() < 700) {
                    return 2;
                }
                return 4;
            }
        });
        root.workshop = new root.modules.ContentSlider({
            selector: '.home-workshop .content-slider-container',
            itemSelector: '.content-slide-item',
            renderNavigation: true,
            renderIndicators: false,
            itemsPerSlide: function() {
                return 1;
            }
        });
        workshopPositionElements = function() {
            var height, offset;
            height = $(".home-workshop .home-full-width img:visible").height();
            console.log("Positioning workshop elements", height);
            offset = height / 2;
            return $(".home-workshop .slider-navigation").css({
                top: offset
            });
        };
        workshopPositionElements();
        $(".home-workshop .home-full-width img").on('load', workshopPositionElements);
        $(".home-workshop .slider-navigation").on('click', function() {
            return $(".home-workshop").forceLoadLazy();
        });
        $(window).on('resize.clear-on-pjax', workshopPositionElements);
        instagramFeed = new Instafeed({
            get: 'user',
            tagName: '',
            accessToken: '3680549.467ede5.e343e56a734a466a97166ebbc5a7294e',
            userId: 1017689,
            mock: true,
            limit: 24,
            success: function(response) {
                var $image, contentSlider, image, _j, _len1, _ref1;
                _ref1 = response.data;
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                    image = _ref1[_j];
                    $image = $("<div class=\"gangstagram infinite-scroller-item\">\n	<img class=\"lazy\" data-original=\"" + image.images.low_resolution.url + "\" src=\"/static/img/1x1.gif\" />\n	<a class=\"gangstagram-hover\" href=\"" + image.link + "\" title=\"" + image.caption.text + "\" target=\"_blank\">\n		<div class=\"text\">\n			" + image.caption.text + "\n		</div>\n	</a>\n</div>");
                    $(".home-gangstagram .content-slider-items").append($image);
                }
                contentSlider = new root.modules.ContentSlider({
                    selector: '.home-gangstagram .content-slider-container',
                    itemSelector: '.gangstagram',
                    itemsPerSlide: function() {
                        var width;
                        width = $(window).width();
                        if (width < 700) {
                            return 2;
                        } else if (width < 1600) {
                            return 4;
                        }
                        return 6;
                    },
                    onAfterRenderSlide: function() {
                        return root.lazyload();
                    },
                    renderIndicators: false
                });
                return root.lazyload();
            }
        });
        instagramFeed.run();
        TeamManager = (function() {
            function TeamManager() {
                this.onClickItem = __bind(this.onClickItem, this);
                this.setHeights = __bind(this.setHeights, this);
                this._bindElements();
                this._bindHandlers();
            }
            TeamManager.prototype._bindElements = function() {
                this.$container = $(".team-section");
                return this.$items = $(".team-member");
            };
            TeamManager.prototype._bindHandlers = function() {
                var _this = this;
                this.$items.click(this.onClickItem);
                $(window).resize(_.debounce(this.setHeights, 200));
                if (root.jRes !== void 0) {
                    return root.jRes.addFunc({
                        breakpoint: '*',
                        enter: function() {
                            return _this.initialize();
                        }
                    });
                }
            };
            TeamManager.prototype._bindNavHandlers = function() {
                var _this = this;
                return this.$container.find('.team-popup-nav').click(function(ev) {
                    var $next, $this, next;
                    $this = $(ev.currentTarget);
                    next = $this.data('next');
                    $next = _this.$items.eq(next - 1);
                    return $next.click();
                });
            };
            TeamManager.prototype.setHeights = function() {
                var height;
                height = $(".team-popup-image-container:visible").height();
                return $(".team-popup-description-container").css({
                    height: height
                });
            };
            TeamManager.prototype.initialize = function() {
                if (this.activeItem) {
                    return this._loadPopup(this.activeItem);
                }
            };
            TeamManager.prototype.onClickItem = function(ev) {
                'On click, expand content below the next row.';
                var $this;
                $this = $(ev.currentTarget);
                this.activeItem = $this;
                this._loadPopup($this);
                return root.lazyload();
            };
            TeamManager.prototype._loadPopup = function($item) {
                var $lastItem, $obsoleteContainers, $popupContainer, cols, row, selector;
                $lastItem = this._getLastItemInRow($item);
                row = this._getRowNumber($item);
                cols = this._getItemsPerRow();
                selector = ".team-popup-container.row-" + row + ".cols-" + cols;
                $popupContainer = this.$container.find(selector);
                if (!$popupContainer.length > 0) {
                    $obsoleteContainers = this.$container.find('.team-popup-container');
                    $obsoleteContainers.slideUp('slow', (function() {
                        return $(this).remove();
                    }));
                    $popupContainer = $("<div class=\"team-popup-container row-" + row + " cols-" + cols + "\">\n</div>");
                    $popupContainer.hide();
                    $lastItem.after($popupContainer);
                    _.delay((function() {
                        var obsoleteHeight, top;
                        obsoleteHeight = $obsoleteContainers.height();
                        top = $popupContainer.offset().top - 200;
                        return $('html, body').animate({
                            scrollTop: top
                        }, 500);
                    }), 400);
                }
                this._crossFadeToItem($popupContainer, $item);
                this._bindNavHandlers();
                return this.$container.forceLoadLazy();
            };
            TeamManager.prototype._crossFadeToItem = function($popupContainer, $item) {
                var $descriptionContainer, $existingWrappers, $original, _this = this;
                $existingWrappers = $popupContainer.find(".xfadewrapper");
                if ($existingWrappers.length) {
                    $existingWrappers.fadeOut(200, function() {
                        return $(this).remove();
                    });
                }
                $original = $('<div class="xfadewrapper"><div class="row"></div></div>');
                $original.find('.row').html($item.find('.team-popup-content').html()).hide().fadeIn(200);
                $popupContainer.prepend($original);
                $descriptionContainer = $popupContainer.find('.team-popup-description-container');
                $descriptionContainer.hide();
                if (!$popupContainer.is(':visible')) {
                    $popupContainer.slideDown('normal').animate({
                        opacity: 1
                    }, {
                        queue: true,
                        duration: 'normal',
                        easing: 'easeInOutExpo'
                    });
                }
                return $popupContainer.find('img').on('load', function() {
                    _this.setHeights();
                    return $descriptionContainer.fadeIn();
                });
            };
            TeamManager.prototype._getRowNumber = function($item) {
                var row;
                row = Math.floor(this.$items.index($item) / this._getItemsPerRow()) + 1;
                return row;
            };
            TeamManager.prototype._getLastItemInRow = function($item) {
                var $lastItem, lastItem, lastItemIndex, row;
                row = this._getRowNumber($item);
                lastItem = row * this._getItemsPerRow();
                if (lastItem > this.$items.length) {
                    lastItemIndex = this.$items.length;
                } else {
                    lastItemIndex = lastItem;
                }
                $lastItem = this.$items.eq(lastItemIndex - 1);
                return $lastItem;
            };
            TeamManager.prototype._getItemsPerRow = function() {
                if ($(window).width() > 700) {
                    return 6;
                }
                return 4;
            };
            TeamManager.prototype._nextItem = function() {};
            return TeamManager;
        })();
        return new TeamManager;
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    log = function() {};
    root.loader.executeOnKey('product', function() {
        var $image, AccordionManager, ProductVariantManager, SpinnerManager, id, initGallerySlider;
        AccordionManager = (function() {
            function AccordionManager(_arg) {
                var _ref;
                _ref = _arg != null ? _arg : {}, this.containerSelector = _ref.containerSelector, this.itemSelector = _ref.itemSelector;
                this._bindElements();
                this._bindHandlers();
            }
            AccordionManager.prototype._bindElements = function() {
                this.$container = $(this.containerSelector);
                return this.$items = $(this.itemSelector);
            };
            AccordionManager.prototype._bindHandlers = function() {
                var _this = this;
                return this.$items.click(function(ev) {
                    return _this.openItem($(ev.currentTarget));
                });
            };
            AccordionManager.prototype.openItem = function($item) {
                var $content;
                this.$items.find('.content:visible').slideUp();
                $content = $item.find('.content');
                if (!$content.is(':visible')) {
                    return $content.slideDown();
                }
            };
            return AccordionManager;
        })();
        SpinnerManager = (function() {
            'Handles the Spinner behavior given an element';

            function SpinnerManager(_arg) {
                var _ref;
                _ref = _arg != null ? _arg : {}, this.spinner = _ref.spinner, this.imageSelector = _ref.imageSelector;
                this.onMouseMove = __bind(this.onMouseMove, this);
                _.defaults(this, {
                    imageSelector: 'img'
                });
                this._bindElements();
                this._bindHandlers();
            }
            SpinnerManager.prototype._bindElements = function() {
                this.$container = $(this.spinner);
                this.$images = this.$container.find('img');
                this.$images.filter(':first').addClass('active');
                return log("BINDING EL SPINNER");
            };
            SpinnerManager.prototype._bindHandlers = function() {
                return this.$container.on('mousemove', this.onMouseMove);
            };
            SpinnerManager.prototype._imageCount = function() {
                return this.$images.length;
            };
            SpinnerManager.prototype.onMouseMove = function(ev) {
                var $this, cursorLocationX, relX, relY, shard, shards, totalImages, width;
                $this = $(ev.currentTarget);
                width = $this.width();
                log("Width of container is.. " + width);
                relX = ev.pageX - $this.offset().left;
                relY = ev.pageY - $this.offset().top;
                totalImages = this._imageCount();
                shards = 1 / totalImages;
                cursorLocationX = relX / width;
                shard = Math.floor(cursorLocationX / shards);
                log("Found shard..", shard);
                return this.$images.removeClass('active').eq(shard).addClass('active');
            };
            return SpinnerManager;
        })();
        ProductVariantManager = (function() {
            function ProductVariantManager() {
                this.onOptionChange = __bind(this.onOptionChange, this);
                this._bindElements();
                this._bindHandlers();
            }
            ProductVariantManager.prototype._bindElements = function() {
                this.$container = $(".product-detail-wrapper");
                this.$options = this.$container.find('select.product-option');
                return this.$variantInput = $("[name=variant_id]");
            };
            ProductVariantManager.prototype._bindHandlers = function() {
                this.$options.change(this.onOptionChange);
                return this._setInitialVariant();
            };
            ProductVariantManager.prototype._setInitialVariant = function() {
                var variant, variantID;
                variantID = this._getURLParameter('initial');
                if (variantID && !this._initialSet) {
                    variant = this._getVariantByID(variantID);
                    if (variant) {
                        this._setVariant(variant);
                    }
                    this._initialSet = true;
                    return this.$options.trigger('change');
                }
            };
            ProductVariantManager.prototype._getVariantByID = function(id) {
                return GROVEMADE_PRODUCT_DATA.optionsByVariantID[id];
            };
            ProductVariantManager.prototype._setVariant = function(variant) {
                ' update selects ';
                var option, value, _i, _len, _ref, _results;
                _ref = ['option1', 'option2', 'option3', 'option4'];
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    option = _ref[_i];
                    value = variant[option];
                    _results.push($("[name=" + option + "]").val(value));
                }
                return _results;
            };
            ProductVariantManager.prototype._getURLParameter = function(name) {
                return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
            };
            ProductVariantManager.prototype.onOptionChange = function(ev) {
                'When options change, submit all selected to the server / get a partial response.\nRender specific variant response';
                var $this, variant_id;
                $this = $(ev.currentTarget);
                variant_id = GROVEMADE_PRODUCT_DATA.variantIDByOptions[this._getOptionString()];
                console.log(this._getOptionString(), variant_id);
                if (variant_id) {
                    this.$variantInput.val(variant_id);
                }
                $(".product-image-container .content").loadFragment({
                    url: '.',
                    data: {
                        template: 'shop/products/fragments/product_gallery.html',
                        variant_id: variant_id
                    },
                    onSuccess: function() {
                        return initGallerySlider();
                    }
                });
                $(".product-info").loadFragment({
                    url: '.',
                    data: {
                        template: 'shop/products/fragments/product_info.html',
                        variant_id: variant_id
                    }
                });
                return $(".product-add-to-cart-fragment").loadFragment({
                    url: '.',
                    data: {
                        template: 'shop/products/fragments/product_add_to_cart.html',
                        variant_id: variant_id
                    }
                });
            };
            ProductVariantManager.prototype._getOptionString = function() {
                var optionValues, options;
                options = ['option1', 'option2', 'option3', 'option4'];
                optionValues = _.map(options, function(option) {
                    return $("[name=" + option + "]").val() || '';
                });
                return optionValues.join('::');
            };
            return ProductVariantManager;
        })();
        initGallerySlider = function() {
            var initSpinner;
            initSpinner = function() {
                var $spinner;
                $spinner = $(".content-slide.active .spinner-container");
                if ($spinner) {
                    return new SpinnerManager({
                        spinner: $spinner
                    });
                }
            };
            initSpinner();
            return new root.modules.ContentSlider({
                selector: '.product-gallery-container .content-slider-container',
                itemSelector: '.product-gallery-slides .slide',
                renderIndicators: false,
                autoPlay: 5000,
                autoPlayStopOnInteraction: true,
                itemsPerSlide: function() {
                    return 1;
                },
                transitionFunction: function(slider) {
                    return slider._crossFade();
                },
                onAfterRenderSlide: function() {
                    return initSpinner();
                }
            });
        };
        initGallerySlider();
        new ProductVariantManager;
        $(".product-details-bar .detail.social").hover(function() {
            return $(this).find('.social-popup').addClass('is-active');
        }, function() {
            return $(this).find('.social-popup').removeClass('is-active');
        });
        $(".product-details-bar .detail.details").on('click.products', function() {
            return $(".product-features-container").scrollTo(1250);
        });
        $(".product-details-bar .detail.images").on('click.products', function() {
            return $(".product-images-container").scrollTo(1250);
        });
        $(".product-images-container a").on('click.products', function(ev) {
            var $container, $content, href, imageID;
            imageID = $(this).data('image-number');
            window.location.hash = "video-" + imageID;
            href = $(this).attr('href');
            if (href.indexOf('youtube') !== -1 && href.indexOf('embed') !== -1) {
                $container = $("<div class=\"grove-overlay\">\n  <div class=\"grove-overlay-content product-image-video\">\n    <iframe width=\"853\" height=\"480\" src=\"" + href + "\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n</div>");
                $(".product-images-container").append($container);
                $content = $container.find('.grove-overlay-content');
                $content.css({
                    width: 853 + 20,
                    height: 480 + 20,
                    marginTop: -480 / 2,
                    marginLeft: -853 / 2
                });
                $container.fadeIn();
                ev.preventDefault();
                return $container.on('click.products', function() {
                    $container.fadeOut('fast', function() {
                        return $container.remove();
                    });
                    return window.location.hash = '';
                });
            }
        });
        if (window.location.hash) {
            id = window.location.hash.substr(1).replace('video-', '');
            $image = $("[data-image-number=" + id + "]");
            console.log("hash is...", id, $image);
            if ($image) {
                $image.click();
            }
        }
        $(document).off('.product').on('click.product', ".product-notify-trigger", function(ev) {
            var $container, $content, $template, content;
            $template = $(ev.currentTarget).closest('.product-add-to-cart-row').find('.product-notify-popup-template');
            content = $template.html();
            if ($(".grove-overlay").length > 0) {
                $(".grove-overlay").remove();
            }
            $container = $("<div class=\"grove-overlay\">" + content + "</div>");
            $("body").append($container);
            $content = $container.find('.grove-overlay-content');
            $content.css({
                width: 600,
                height: 300,
                marginTop: -300 / 2,
                marginLeft: -600 / 2
            });
            $container.fadeIn();
            ev.preventDefault();
            $container.on('click', function(ev) {
                if (!$(ev.target).closest('.grove-overlay-content').length) {
                    return $(this).fadeOut('fast', function() {
                        return $container.remove();
                    });
                }
            });
            return $(".product-notify-form").submit(function(ev) {
                $(this).validate({
                    errorPlacement: function(error, element) {
                        var $wrapped;
                        $wrapped = element.wrap('<div class="error-wrapper"/>').parent();
                        return error.appendTo($wrapped);
                    },
                    rules: {
                        email: {
                            required: true,
                            email: true
                        }
                    },
                    submitHandler: function(form) {
                        return form.submit();
                    }
                });
                ev.preventDefault();
                return false;
            });
        });
        return $(".product-detail-form").submit(function(ev) {
            ev.preventDefault();
            return $.ajax({
                url: "/my-cart/add-to-cart/",
                type: 'post',
                data: $(this).serialize(),
                success: function() {
                    return $(".cart-popup-fragment").loadFragment({
                        url: "/my-cart/",
                        data: {
                            template: 'shop/cart/fragments/cart_popup.html'
                        },
                        onSuccess: function(response) {
                            var $cartPopupHandler, cartCount;
                            cartCount = Number($('.updated-cart-count').html());
                            $(".cart-count").html(cartCount);
                            if (cartCount > 0) {
                                $(".cart-link").addClass('has-items');
                            } else {
                                $(".cart-link").removeClass('has-items');
                            }
                            $cartPopupHandler = $(".cart-popup-wrapper").data('handler');
                            $cartPopupHandler.open();
                            return _.delay(function() {
                                return $cartPopupHandler.close();
                            }, 3000);
                        }
                    });
                }
            });
        });
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.loader.executeOnKey('warranty-form', function() {
        return $("[name=action]").change(function() {
            if ($(this).val() === 'REPLACEMENT') {
                return $(".warranty-form-replacement-address").slideDown();
            } else {
                return $(".warranty-form-replacement-address").slideUp();
            }
        });
    });
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    ExplodingWatchManager = (function() {
        ExplodingWatchManager.prototype.namespace = '.watch';

        function ExplodingWatchManager() {
            this.explodeWatch = __bind(this.explodeWatch, this);
            this._bindElements();
            this._bindHandlers();
        }
        ExplodingWatchManager.prototype._bindElements = function() {
            this.$wrapper = $('.watch-exploding-wrapper');
            this.$container = this.$wrapper.find('.watch-exploding-container');
            return this.$elements = this.$container.find('.watch-exploding-element');
        };
        ExplodingWatchManager.prototype._bindHandlers = function() {
            var _this = this;
            $(window).on('scroll' + this.namespace, this.explodeWatch);
            $(".button-unexplode").click(function() {
                return _this.$elements.css({
                    x: 0
                });
            });
            return $(".button-explode").click(function() {
                var $el, el, widthAdjustmentFactor, x, xPercentage, _i, _len, _ref, _results;
                _ref = _this.$elements;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    el = _ref[_i];
                    $el = $(el);
                    x = $el.data('final-x');
                    widthAdjustmentFactor = 3.5;
                    xPercentage = parseFloat(x) * widthAdjustmentFactor;
                    _results.push($el.css({
                        x: xPercentage + '%'
                    }));
                }
                return _results;
            });
        };
        ExplodingWatchManager.prototype.explodeWatch = function() {
            var _this = this;
            if (this._explodeWatch == null) {
                this._explodeWatch = function() {
                    var $el, EASE_IN_OUT_CONST, adjustedTop, easeInOutApprox, easeInOutCubic, easeOutAppox, easeOutCubic, el, elStart, endTop, position, range, rect, startTop, widthAdjustmentFactor, windowHeight, x, xPercentage, _i, _len, _ref;
                    rect = _this.$container.get(0).getBoundingClientRect();
                    windowHeight = $(window).height() + 200;
                    startTop = windowHeight - 200;
                    endTop = 0;
                    range = startTop - endTop;
                    adjustedTop = rect.top - endTop;
                    position = adjustedTop / startTop;
                    easeInOutCubic = function(x) {
                        if (x < 0.5) {
                            return 4 * x * x * x;
                        } else {
                            x -= 1;
                            return 1 + (4 * x * x * x);
                        }
                    };
                    easeOutAppox = function(x) {
                        return 1 - Math.pow(1 - x, 1.685);
                    };
                    EASE_IN_OUT_CONST = 0.5 * Math.pow(0.5, 1.925);
                    easeInOutApprox = function(x) {
                        if (x < 0.5) {
                            return EASE_IN_OUT_CONST * Math.pow(x, 1.925);
                        } else {
                            return 1 - EASE_IN_OUT_CONST * Math.pow(1 - x, 1.925);
                        }
                    };
                    easeOutCubic = function(x) {
                        x -= 1;
                        return 1 + (x * x * x);
                    };
                    if (position < 1 && position > 0) {
                        position = 1 - position;
                        _ref = _this.$elements;
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            el = _ref[_i];
                            $el = $(el);
                            x = $el.data('final-x');
                            widthAdjustmentFactor = 3.5;
                            xPercentage = parseFloat(x) * widthAdjustmentFactor;
                            elStart = rect.top + rect.height;
                            $el.css({
                                x: xPercentage * position + '%'
                            });
                        }
                    }
                    if (position > 1) {
                        return _this.$elements.css({
                            x: 0
                        });
                    }
                };
            }
            if (window.is_mobile) {
                if (this._explodeWatchDebounced == null) {
                    this._explodeWatchDebounced = _.debounce(this._explodeWatch, 500);
                }
                return this._explodeWatchDebounced();
            } else {
                return this._explodeWatch();
            }
        };
        return ExplodingWatchManager;
    })();
    RotatingWatchManager = (function() {
        RotatingWatchManager.prototype.namespace = '.watch';

        function RotatingWatchManager() {
            this.rotateWatch = __bind(this.rotateWatch, this);
            this._bindElements();
            this._bindHandlers();
        }
        RotatingWatchManager.prototype._bindElements = function() {
            this.$container = $(".watch-rotate-container");
            this.$hour = this.$container.find('.watch-rotate-hour');
            return this.$minute = this.$container.find('.watch-rotate-minute');
        };
        RotatingWatchManager.prototype._bindHandlers = function() {
            return $(window).on('scroll' + this.namespace, this.rotateWatch);
        };
        RotatingWatchManager.prototype.rotateWatch = function() {
            var throttle, _this = this;
            throttle = 50;
            if (window.is_mobile) {
                throttle = 500;
            }
            if (this._rotateWatch == null) {
                this._rotateWatch = _.throttle(function() {
                    var absoluteDecimalPosition, amountMoved, currentPosition, end, endBottom, movementRange, position, rect, start, startTop, windowHeight;
                    start = 10.1666;
                    end = 14.6666;
                    rect = _this.$container.get(0).getBoundingClientRect();
                    windowHeight = $(window).height();
                    startTop = rect.top;
                    endBottom = 0;
                    position = (rect.top + rect.height) / windowHeight;
                    if (position < 1.1 && position > -.23) {
                        position = 1 - position;
                        movementRange = end - start;
                        amountMoved = movementRange * position;
                        currentPosition = start + amountMoved;
                        absoluteDecimalPosition = currentPosition / 12;
                        _this.$hour.css({
                            rotate: (absoluteDecimalPosition * 360).toFixed(6)
                        });
                        return _this.$minute.css({
                            rotate: ((absoluteDecimalPosition * 360) * 12).toFixed(6)
                        });
                    }
                }, throttle);
            }
            return this._rotateWatch();
        };
        return RotatingWatchManager;
    })();
    handleSubnav = function() {
        var $subnav, el, navHeight, scrollspy, _i, _len, _ref;
        scrollspy = new root.ScrollSpyHandler();
        _ref = $("[data-scrollspy]");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            scrollspy.addElement(el);
        }
        $subnav = $(".no-touch .subnav");
        navHeight = 50;
        return $(window).on('scroll.home', _.throttle(function() {
            var offset, stickAt, top;
            top = $(window).scrollTop();
            offset = $(window).height() - $subnav.height();
            stickAt = top + navHeight;
            if (offset <= stickAt) {
                return $subnav.addClass('is-sticky');
            } else {
                return $subnav.removeClass('is-sticky');
            }
        }, 10));
    };
    handleMainVideo = function() {
        var image, videoId;
        if (window.is_mobile) {
            image = $(".watch-marquee").data('mobile-bg-image');
            return $(".watch-marquee").css({
                'background-image': "url(" + image + ")"
            });
        } else {
            videoId = '_GlmngBlwPM';
            $('.tubular-video').tubular({
                videoId: videoId,
                ratio: 16 / 9,
                wrapperZIndex: 5
            });
            $("#tubular-container").hide().delay(1500).fadeIn();
            return $('.tubular-video').on('remove', function() {
                $("#tubular-container").remove();
                return $("#tubular-shield").remove();
            });
        }
    };
    handleWatchSignup = function() {
        return $(".watch-sign-up").click(function() {});
    };
    handleVideoPopup = function() {
        return $(".watch-video").click(function(ev) {
            var $container, $content, href;
            console.log('clicked');
            ev.preventDefault();
            href = '//www.youtube.com/embed/cvV_OtFg3-E?autoplay=1&controls=0&fs=1&modestbranding=1&rel=0&showinfo=0&autohide=1&allowfullscreen=1';
            $container = $("<div class=\"grove-overlay\">\n	<div class=\"grove-overlay-content product-image-video\">\n		<iframe width=\"853\" height=\"480\" src=\"" + href + "\" frameborder=\"0\" allowfullscreen></iframe>\n	</div>\n</div>");
            $("body").append($container);
            $content = $container.find('.grove-overlay-content');
            $content.css({
                width: 853 + 20,
                height: 480 + 20,
                marginTop: -480 / 2,
                marginLeft: -853 / 2
            });
            $container.fadeIn();
            ev.preventDefault();
            $container.on('click.watch', function() {
                return $container.fadeOut('fast', function() {
                    return $container.remove();
                });
            });
            return false;
        });
    };
    $.fn.extend({
        popup: function(_arg) {
            var $popup, popupClass;
            _arg;
            popupClass = 'grove-overlay-popup';
            $popup = $("body").find(popupClass);
            if ($popup.length === 0) {
                $popup = $("<div class=\"" + popupClass + "\"></div>");
                return $("body").append($popup);
            }
        }
    });
    handleParallax = function() {
        var _this = this;
        if (window.is_mobile) {
            return;
        }
        window.windowHeight = $(window).height();
        $(window).resize(function() {
            return window.windowHeight = $(window).height();
        });
        return $(window).on('scroll.clear-on-pjax', function() {
            var offset, opacity, percentage, scrollTop;
            scrollTop = $(window).scrollTop();
            if (scrollTop > 2000) {
                return;
            }
            percentage = scrollTop / window.windowHeight;
            offset = percentage * window.windowHeight * .1;
            opacity = 1 - percentage;
            offset = 50 - offset;
            return $(".watch-marquee").css({
                'background-position': "50% " + (offset.toFixed(5)) + "%",
                opacity: opacity
            });
        });
    };
    handleVideo = function() {
        var $landscapeVideo, $toolingVideo, updateSize;
        $toolingVideo = $(".watch-tooling-video");
        $landscapeVideo = $(".watch-looping-landscape-video");
        updateSize = function() {
            var width;
            width = $(window).width();
            $toolingVideo.css({
                width: width,
                height: width * (384 / 1280)
            });
            return $landscapeVideo.css({
                width: width * .6666666,
                height: width * (482 / 953) * .66666
            });
        };
        $(window).on('resize.clear-on-pjax', function() {
            return updateSize();
        });
        return updateSize();
    };
    handleOverflows = function() {
        var handlePixelRounding;
        handlePixelRounding = _.debounce(function() {
            var $element, height;
            $element = $("#how-it-works");
            $element.css('height', 'auto');
            height = $element.height() - 5;
            console.log(height);
            return $element.css({
                height: "" + height + "px",
                overflow: 'hidden'
            });
        }, 100);
        $(window).resize(handlePixelRounding);
        return handlePixelRounding();
    };
    root.loader.executeOnKey('watch', function() {
        root.ewm = new ExplodingWatchManager;
        root.rwm = new RotatingWatchManager;
        handleSubnav();
        handleWatchSignup();
        handleVideoPopup();
        handleOverflows();
        handleParallax();
        return handleVideo();
    });
}).call(this);
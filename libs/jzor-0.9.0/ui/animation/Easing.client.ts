namespace jzor.parts {
    export type EasingFunction = (t: number, b: number, c: number, d: number) => number

    export class Easing {
        static [name:string]: EasingFunction

        // t: current time, b: beginning value, c: change In value, d: duration
        // Quadratic - Accelerates fast, then slows quickly towards end.
        //quadratic: (t) => t * (-(t * t) * t + 4 * t * t - 6 * t + 4)
        // Overshoots over 1 and then returns to 1 towards end.
        //cubic: (t) => t * (4 * t * t - 9 * t + 6)
        // Overshoots over 1 multiple times - wiggles around 1.
        //elastic: (t) => t * (33 * t * t * t * t - 106 * t * t * t + 126 * t * t - 67 * t + 15)
        // Accelerating from zero velocity
        static easeInQuad(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t + b;
        }
        // Decelerating to zero velocity
        static easeOutQuad(t: number, b: number, c: number, d: number) {
            return -c * (t /= d) * (t - 2) + b;
        }
        // Acceleration until halfway, then deceleration
        static easeInOutQuad(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
        // Accelerating from zero velocity
        static easeInCubic(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t * t + b;
        }
        // Decelerating to zero velocity
        static easeOutCubic(t: number, b: number, c: number, d: number) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
        // Acceleration until halfway, then deceleration
        static easeInOutCubic(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
        // Accelerating from zero velocity
        static easeInQuart(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t * t * t + b;
        }
        // Decelerating to zero velocity
        static easeOutQuart(t: number, b: number, c: number, d: number) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        }
        // Acceleration until halfway, then deceleration
        static easeInOutQuart(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
        // Accelerating from zero velocity
        static easeInQuint(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t * t * t * t + b;
        }
        // Decelerating to zero velocity
        static easeOutQuint(t: number, b: number, c: number, d: number) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        }
        // Acceleration until halfway, then deceleration
        static easeInOutQuint(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
        // Accelerating from zero velocity
        static easeInSine(t: number, b: any, c: number, d: number) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        }
        // Decelerating to zero velocity
        static easeOutSine(t: number, b: number, c: number, d: number) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        }
        // Acceleration until halfway, then deceleration
        static easeInOutSine(t: number, b: number, c: number, d: number) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
        // Exponential accelerating from zero velocity
        static easeInExpo(t: number, b: number, c: number, d: number) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        }
        // Exponential decelerating from zero velocity
        static easeOutExpo(t: number, b: number, c: number, d: number) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        }
        // Exponential accelerating until halfway, then decelerating
        static easeInOutExpo(t: number, b: number, c: number, d: number) {
            if (t == 0)
                return b;
            if (t == d)
                return b + c;
            if ((t /= d / 2) < 1)
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
        // Circular accelerating from zero velocity
        static easeInCirc(t: number, b: number, c: number, d: number) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        }
        // Circular decelerating to zero velocity Moves VERY fast at the beginning and
        // then quickly slows down in the middle. This tween can actually be used
        // in continuous transitions where target value changes all the time,
        // because of the very quick start, it hides the jitter between target value changes.
        static easeOutCirc(t: number, b: number, c: number, d: number) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        }
        // Circular acceleration until halfway, then deceleration
        static easeInOutCirc(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
        // Overshoots over 1 multiple times - wiggles around 1.
        static easeInElastic(t: number, b: number, c: number, d: number) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                s = p / 4;
            }
            else
                s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        static easeOutElastic(t: number, b: any, c: number, d: number) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                s = p / 4;
            }
            else
                s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        }
        static easeInOutElastic(t: number, b: number, c: number, d: number) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d / 2) == 2)
                return b + c;
            if (!p)
                p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                s = p / 4;
            }
            else
                s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
        // ????
        static easeInBack(t: number, b: number, c: number, d: number, s = 1.70158) {
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        }
        static easeOutBack(t: number, b: number, c: number, d: number, s = 1.70158) {
            if (d == 0)
                return b;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        }
        static easeInOutBack(t: number, b: number, c: number, d: number, s = 1.70158) {
            if ((t /= d / 2) < 1)
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
        // Bounce - hard bounces 3 times without overshooting
        static easeInBounce(t: number, b: number, c: number, d: number) {
            return c - this.easeOutBounce(d - t, 0, c, d) + b;
        }
        static easeOutBounce(t: number, b: number, c: number, d: number) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            }
            else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            }
            else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        }
        static easeInOutBounce(t: number, b: number, c: number, d: number) {
            if (d == 0)
                return b;
            if (t < d / 2)
                return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
            return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
}

namespace jzor.parts {
    interface HTMLElementAnimated extends HTMLElement {
        _animation: FluentAnimation
    }

    class FluentAnimation {
        elm: HTMLElementAnimated;
        target: DOMRect;
        translateTo: DOMRect;
        currentTranslate: DOMRect;
        time: number;
        duration: number;
        easing: EasingFunction;
        done: boolean = false

        constructor(elm:HTMLElementAnimated, time:number) {
            this.elm = elm;
            this.target = DOMRect.prototype.fromElement(elm);
            this.translateTo = new DOMRect();
            this.currentTranslate = new DOMRect();
            this.time = time;
            this.duration = this.getDuration(elm);
            this.easing = this.getEasing(elm);
        }

        getEasing(elm:HTMLElement):EasingFunction {
            var result = getComputedStyle(elm).getPropertyValue('--Fluent-easing');
            return Easing[result] || Easing.easeOutQuint;
        }

        getDuration(elm:HTMLElement) {
            var result = getComputedStyle(elm).getPropertyValue('--Fluent-duration-ms');
            return parseFloat(result || '500');
        }

        changeTarget(newTarget:DOMRect, deltaTime:number) {
            var layoutDif = this.target.subtract(newTarget);
            this.translateTo = this.currentTranslate.add(layoutDif);
            this.target = newTarget;
            this.time = deltaTime;
            this.duration = this.getDuration(this.elm);
        }

        animate() {
            this.done = this.time > this.duration;
            var t = Math.min(this.time, this.duration);
            var stepTranslate = this.translateTo.applyFunc(n => this.easing(t, n, -n, this.duration));
            this.currentTranslate = stepTranslate;
            this.setTransform(stepTranslate);
        }

        setTransform(rect:DOMRect) {
            this.elm.style.translate = `${rect.x}px ${rect.y}px`;
        }
    }

    class FluentLayout {
        break: boolean;
        lastTime: number = 0;

        constructor() {
            this.break = false;
            this.lastTime;
        }

        dispose() {
            this.stop();
        }

        getAnimation(elm:HTMLElementAnimated) {
            if (!elm._animation) elm._animation = new FluentAnimation(elm, 0);
            return elm._animation;
        }

        animateElement(elm:HTMLElement, deltaTime:number) {
            var animation = this.getAnimation(elm as unknown as HTMLElementAnimated);
            var newTarget = DOMRect.prototype.fromElement(elm);

            var newPosition = !newTarget.equals(animation.target)

            if (animation.done && !this.isInViewportProximity(elm)) {
                animation.target = newTarget;
                return;
            }

            if (newPosition) animation.changeTarget(newTarget, deltaTime);
            animation.animate();
            animation.time += deltaTime;
        }

        //TODO: Try using built in Intersection Observer to handle on/off screen items
        isInViewportProximity(elm:HTMLElement) {
            //TODO: Move to FluentAnimation - check if both current position or target is in viewport. Make this a function on DOMRect with delta args
            var delta = 100;
            var bounding = elm.getBoundingClientRect();
            return !(bounding.top > window.innerHeight
                || bounding.bottom < 0
                || bounding.left > window.innerWidth
                || bounding.right < 0);
        }

        stop() {
            this.break = true;
        }

        start() {
            this.break = false;
            this.lastTime = performance.now();
            this.animateLoop(performance.now());
        }

        animateLoop = (time:number) => {
            var timeDelta = time - this.lastTime;
            this.lastTime = time;
            var elements = document.querySelectorAll('.Fluent');
            elements.forEach(elm => this.animateElement(elm as HTMLElement, timeDelta));
            if (!this.break) requestAnimationFrame(this.animateLoop);
        }

        isInViewport(elm:HTMLElement) {
            var rect = elm.getBoundingClientRect();
            return rect.isInViewport();
        }
    }

    var fl:FluentLayout|undefined;

    jzor.loader.scripts.start("Fluent Layout", () => {
        if (fl != undefined) fl.dispose();
        else {
            fl = new FluentLayout()
            fl.start();
        }
    })
}
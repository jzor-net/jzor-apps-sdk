interface DOMRect {
    equals(other: DOMRect): boolean
    isInViewport(): boolean
    fromElement(elm: HTMLElement): DOMRect
    add(other: DOMRect): DOMRect
    assignToElement(elm: HTMLElement): void
    applyFunc(func: (n: number) => number): DOMRect
    blend(other: DOMRect, amount: number): DOMRect
    multiply(amount: number): DOMRect
    subtract(other: DOMRect): DOMRect
    all(func: (n: number) => boolean): boolean
}

DOMRect.prototype.equals = function (other) {
    return this.x == other.x
        && this.y == other.y
        && this.width == other.width
        && this.height == other.height
}

DOMRect.prototype.isInViewport = function () {
    return this.top >= 0
        && this.left >= 0
        && this.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && this.right <= (window.innerWidth || document.documentElement.clientWidth);
}

DOMRect.prototype.fromElement = function (elm) {
    var x = elm.offsetLeft;
    var y = elm.offsetTop;
    var w = elm.offsetWidth;
    var h = elm.offsetHeight;
    return new DOMRect(x, y, w, h);
}

DOMRect.prototype.add = function (other) {
    return new DOMRect(this.x + other.x, this.y + other.y, this.width + other.width, this.height + other.height);
}

DOMRect.prototype.assignToElement = function (elm) {
    var rounded = this.applyFunc(n => Math.round(n as number));
    elm.style.left = rounded.x + 'px';
    elm.style.top = rounded.y + 'px';
    elm.style.width = rounded.width + 'px';
    elm.style.height = rounded.height + 'px';
}

DOMRect.prototype.applyFunc = function (func) {
    return new DOMRect(
        func(this.x),
        func(this.y),
        func(this.width),
        func(this.height)
    );
}

DOMRect.prototype.blend = function (other, amount) {
    return new DOMRect(
        (this.x * amount) + (other.x * (1 - amount)),
        (this.y * amount) + (other.y * (1 - amount)),
        (this.width * amount) + (other.width * (1 - amount)),
        (this.height * amount) + (other.height * (1 - amount))
    )
}

DOMRect.prototype.multiply = function (amount) {
    return new DOMRect(this.x * amount, this.y * amount, this.width * amount, this.height * amount)
}

DOMRect.prototype.subtract = function (other) {
    return new DOMRect(this.x - other.x, this.y - other.y, this.width - other.width, this.height - other.height);
}

DOMRect.prototype.all = function (func) {
    return func(this.x)
        && func(this.y)
        && func(this.width)
        && func(this.height);
}

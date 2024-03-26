interface HTMLElement {
    getElementRect(): DOMRect
    isInViewport(): boolean
    isInViewportProximity(delta: number): boolean
}

HTMLElement.prototype.getElementRect = function () {
    var elmRect = this.getBoundingClientRect();
    var scrollRect = new DOMRect(window.scrollX, window.scrollY, 0, 0);
    return elmRect.add(scrollRect);
}

HTMLElement.prototype.isInViewport = function () {
    var bounding = this.getBoundingClientRect();
    return bounding.isInViewport();
};

HTMLElement.prototype.isInViewportProximity = function (delta) {
    //TODO: Move to FluentAnimation - check if both current position or target is in viewport. Make this a function on DOMRect with delta args
    var bounding = this.getBoundingClientRect();
    var parent = this.parentElement;
    return !(bounding.top > window.innerHeight - delta
        || bounding.bottom < delta
        || bounding.left > window.innerWidth - delta
        || bounding.right < 0);
}
interface MouseEvent {
    getRelativePosition(elm: HTMLElement): { x: number, y: number }
    getAbsolutePosition(elm: HTMLElement): { x: number, y: number }
}

/* ----- Prototype Extensions ----- */
MouseEvent.prototype.getRelativePosition = function (elm: HTMLElement) {
    let rect = elm.getBoundingClientRect();
    let x = this.clientX - rect.left; //x position within the element.
    let y = this.clientY - rect.top;  //y position within the element.
    return { x, y };
}
MouseEvent.prototype.getAbsolutePosition = function (elm: HTMLElement) {
    return { x: -1, y: -1 };
    // //TODO: Not tested
    // let rect = elm.getBoundingClientRect();
    // let x = this.clientX - rect.offsetLeft;
    // let y = this.clientY - rect.offsetTop;
    // return { x, y };
}

namespace jzor.ui {
    export class VSplitClient extends ProxyClient implements IVSplitProxies {
        private _resizer: HTMLElement | null = null;
        private _parent: HTMLElement | null = null;
        private _top: HTMLElement | null = null;
        host_onAfterResize(position: number) { }

        override async oninit(uid:string) {
            this._resizer = document.getElementById(uid) as HTMLElement;
            this._parent = this._resizer.parentElement as HTMLElement
            this._top = this._resizer.previousElementSibling as HTMLElement
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
            window.addEventListener('mousedown', this.onMouseDown);
        }

        override ondispose(): void {
            window.removeEventListener('mousedown', this.onMouseDown);
        }

        onMouseDown(e: MouseEvent) {
            if (e.target != this._resizer) return;
            window.addEventListener('mousemove', this.onMouseMove)
            window.addEventListener('mouseup', this.onMouseUp)
        }

        onMouseMove(e: MouseEvent) {
            var pos = this.getElementPosition(this._parent!)
            var y = e.pageY - pos.y - (this._resizer!.offsetHeight / 2);
            this._top!.style.flexBasis = y + 'px';
            window.dispatchEvent(new Event('resize'));
        }

        onMouseUp(e: MouseEvent) {
            var percentY = this.getResizerPosition();
            this._top!.style.flexBasis = percentY + '%';

            this.host_onAfterResize(percentY);
            window.removeEventListener('mouseup', this.onMouseUp);
            window.removeEventListener('mousemove', this.onMouseMove);
            window.dispatchEvent(new Event('resize'));
        }

        getElementPosition(element: HTMLElement) {
            var rect = element.getBoundingClientRect();
            return {
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY
            };
        }

        getResizerPosition(): number {
            var offsetY = this._resizer!.offsetTop - this._parent!.offsetTop;
            var heightY = this._parent!.offsetHeight;
            var percentY = (offsetY / heightY) * 100;
            return percentY;
        }
    }
}

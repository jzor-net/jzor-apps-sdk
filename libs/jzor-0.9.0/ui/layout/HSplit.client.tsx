namespace jzor.ui {
    export class HSplitClient extends ProxyClient implements IHSplitProxies {
        private _resizer: HTMLElement | null = null;
        private _parent: HTMLElement | null = null;
        private _left: HTMLElement | null = null;
        host_onAfterResize(position: number) { }

        override async oninit(uid:string) {
            this._resizer = document.getElementById(uid) as HTMLElement;
            this._parent = this._resizer.parentElement as HTMLElement
            this._left = this._resizer.previousElementSibling as HTMLElement
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
            var x = e.pageX - pos.x - (this._resizer!.offsetWidth / 2);
            this._left!.style.flexBasis = x + 'px';
            window.dispatchEvent(new Event('resize'));
        }

        onMouseUp(e: MouseEvent) {
            var percentX = this.getResizerPosition();
            this._left!.style.flexBasis = percentX + '%';

            this.host_onAfterResize(percentX);
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
            var offsetX = this._resizer!.offsetLeft - this._parent!.offsetLeft;
            var heightX = this._parent!.offsetWidth;
            var percentX = (offsetX / heightX) * 100;
            return percentX;
        }
    }
}

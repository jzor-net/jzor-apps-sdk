// Adds ripple effect to any element using the Ripple class
// See color modifiers Ripple-black Ripple-white below, or create a designated Ripple effect combining the Ripple class with another class like. .Button.Ripple

/*
    TODO: 
    The ripple color (black/white) should be set automatically by measuring the bg color. 
    Lookups in the path should select the first Ripple and the last of the consecutive Ripple's, unless it finds input fields and similar?
    We could use the Ripple-blue Ripple-black classes as the class lookups, and just add/remove the Ripple itself (so you don't have to specify both on the elements)
*/

namespace jzor.parts {
    export class Ripple {
        static killme:number = 42

        root: any;

        constructor() {
            window.addEventListener('click', this.onclick);
            this.root = document.querySelector(':root');
        }

        dispose() {
            window.removeEventListener('click', this.onclick);
        }

        ripple(e:MouseEvent) {
            var elm = this.findRippleElement(e);
            if (elm == null) return;
            var rp = e.getRelativePosition(elm);
            var aspect = elm.clientWidth / elm.clientHeight;
            var left = ((-elm.clientWidth) / 2) + rp.x;
            var top = ((-elm.clientHeight * aspect) / 2) + rp.y;
            elm.style.setProperty('--Ripple-left', `${left}px`);
            elm.style.setProperty('--Ripple-top', `${top}px`);
            this.root.style.setProperty('--Ripple-animation', '500ms ease-in');

            elm.classList.remove('Ripple');
            void elm.clientWidth;   //NOTE: Triggers reflow, and restarts ripple animation
            elm.classList.add('Ripple');
        }

        findRippleElement(e:MouseEvent):HTMLElement|undefined {
            // Goes down the event path for as long as the Ripple class is found and returns the last consecutive found
            var result: HTMLElement | undefined = undefined;
            for (var et of e.composedPath()) {
                var elm = <HTMLElement>et;
                result = elm.classList.contains('Ripple') ? elm : result;
                if (result != elm) break;
            }
            return result;
        }

        onclick = (event:MouseEvent) => {
            this.ripple(event);
        }
    }

    jzor.loader.scripts.start("Ripple", () => {
        new jzor.parts.Ripple()
    })
}

namespace jzor.app {
    export type KeyEvent = {
        key: string
        code: string
        shiftKey: boolean
        ctrlKey: boolean
        altKey: boolean
        metaKey: boolean
    }

    export class BrowserClient extends ProxyClient implements IBrowserProxies {
        private _busyTimeOut: any;

        host_keyEvent(keyEvent: KeyEvent):any {}
        host_throttled_resizeEvent(width: number, height: number) { }

        constructor(host: HostReference) {
            super(host);
            window.addEventListener('resize', this.onResize);
            window.addEventListener('keydown', this.onKeyDown);
            window.addEventListener('keyup', this.onKeyUp);
            window.addEventListener('keypress', this.onKeyPress);
        }

        override async oninit(uid:string) {
            this.onResize(undefined);
        }

        override ondispose(): void {
            window.removeEventListener('resize', this.onResize);
            window.removeEventListener('keydown', this.onKeyDown);
            window.removeEventListener('keyup', this.onKeyUp);
            window.removeEventListener('keypress', this.onKeyPress);
        }

        client_showBrowserBusy(timeout: number | undefined) {
            // This will show the browser busy cursor, unless it's reset before the timeout
            if (this._busyTimeOut) window.clearTimeout(this._busyTimeOut);
            this._busyTimeOut = window.setTimeout(() => document.body.classList.add('Browser-busy'), timeout);
            document.body.classList.remove('Browser-busy');
        }

        client_openWindow(url: string | URL | undefined, windowName: string | undefined, windowFeatures: any) {
            window.open(url, windowName, windowFeatures || 'toolbar=yes, location=1, status=yes, menubar=yes, scrollbars=yes');
        }

        client_closeWindow() {
            window.close();
        }

        client_openUrl(url: string | URL | undefined) {
            window.open(url, '_blank', 'toolbar=yes, location=1, status=yes, menubar=yes, scrollbars=yes');
        }

        client_setDocumentTitle(title: string) {
            document.title = title;
        }

        client_setFocus(uid: string) {
            document.getElementById(uid)?.focus();
        }

        client_setLocation(url: Location | (string & Location)) {
            window.location = url;
        }

        // Do not use blocking functions - only for demonstration
        client_alert(message: any) {
            alert(message);
        }
        // Do not use blocking functions - only for demonstration
        async client_prompt(message: string | undefined) {
            return prompt(message);
        }
        // Do not use blocking functions - only for demonstration
        client_confirm(message: string | undefined) {
            return confirm(message);
        }

        client_windowResize() {
            window.dispatchEvent(new Event('resize'));
        }

        client_scrollIntoView(selector: any, options: any) {
            var elm = document.querySelector(selector);
            if (elm && !this.isVisibleInViewport(elm)) elm.scrollIntoView(options ?? true);
        }

        client_setLink(href: string, rel: any) {
            let head = document.querySelector('head') as any;
            let link = document.createElement('link');
            link.setAttribute('rel', rel ?? 'icon');
            link.setAttribute('href', href);
            head.appendChild(link);
        }

        async client_getCookieValue(key:string) {
            var result = this.getDocumentCookies()[key];
            return result;
        }

        async client_setCookieValue(key:string, value:string, maxAge:string) {
            document.cookie = `${key}=${value};max-age=${maxAge}`;// max-age=${5*60}`;
        }

        async client_getLocalValue(key:string) {
            var result = window.localStorage.getItem(key);
            return result;
        }

        async client_setLocalValue(key:string, value:string) {
            window.localStorage.setItem(key, value);
        }

        async client_getSessionValue(key:string) {
            var result = window.sessionStorage.getItem(key);
            return result;
        }

        async client_setSessionValue(key:string, value:string) {
            window.sessionStorage.setItem(key, value);
        }

        async client_getWindowName() {
            var result = window.name;
            return result;
        }

        async client_setWindowName(value:string) {
            window.name = value;
        }        

        private getDocumentCookies():any {
            var cookies = document.cookie.split(';');
            var result = {} as any;
            for (var cookie of cookies) {
                var keyValue = cookie.split('=');
                result[keyValue[0].trim()] = keyValue[1];
            }
            return result;
        }
        
        private isVisibleInViewport(elm: { parentElement: any; offsetTop: number; clientHeight: number; }) {
            var parent = elm.parentElement;
            var itemTop = elm.offsetTop - parent.scrollTop - parent.clientTop - parent.offsetTop;
            var itemBottom = elm.offsetTop - parent.scrollTop - parent.clientTop - parent.offsetTop + elm.clientHeight;
            var isVisible = itemTop >= 0 && itemBottom <= parent.clientHeight;
            return isVisible;
        }

        private onKeyDown = (e: KeyboardEvent) => {
            this.host_keyEvent({altKey: e.altKey, code: e.code, ctrlKey: e.ctrlKey, key: e.key, metaKey: e.metaKey, shiftKey: e.shiftKey} as KeyEvent);
        }

        private onKeyUp = (e: KeyboardEvent) => {
        }

        private onKeyPress = (e: KeyboardEvent) => {
        }

        private onResize = (e: any) => {
            this.host_throttled_resizeEvent(window.innerWidth, window.innerHeight);
        }
    }
}
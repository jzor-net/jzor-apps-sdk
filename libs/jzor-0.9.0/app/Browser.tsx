namespace jzor.app {
    export interface IMsgBrowser {
        sender: Part | null
        type: any
    }

    export class msgKeyEvent {
        constructor(public keyEvent?:KeyEvent) {}
    }

    export class msgBrowserResize {
        constructor(public windowSize?:{width: number, height: number}) {}
    }

    export interface IBrowserProxies {
        client_showBrowserBusy(timeout: number): any
        client_setDocumentTitle(title: any): any
        client_setLocation(url: any): any
        client_openWindow(url: any, windowName: any, windowFeatures: any): any
        client_closeWindow(): any
        client_openUrl(url: any): any
        client_alert(message: any): any
        client_prompt(message: any): Promise<string | null>
        client_confirm(message: any): any
        client_setFocus(uid: any): any
        client_scrollIntoView(selector: any, options: any): any
        client_windowResize(): any
        client_setLink(href: any, rel: any): any

        client_getCookieValue(key:string):Promise<any>
        client_setCookieValue(key:string, value:string, maxAge:string):Promise<any>
        client_getLocalValue(key:string):Promise<any>
        client_setLocalValue(key:string, value:string):Promise<any>
        client_getSessionValue(key:string):Promise<any>
        client_setSessionValue(key:string, value:string):Promise<any>
        client_getWindowName():Promise<any>
        client_setWindowName(value:string):Promise<any>

        host_keyEvent(keyEvent: KeyEvent): any
        host_throttled_resizeEvent(width: any, height: any): any
    }

    export class Browser extends ProxyHost implements IBrowserProxies {
        ping?: number = 0
        width?: number = 0
        height?: number = 0

        // Placeholder methods
        async client_showBrowserBusy(timeout: number) { }
        async client_setDocumentTitle(title: any) { }
        async client_setLocation(url: any) { }
        async client_openWindow(url: any, windowName: any, windowFeatures: any) { }
        async client_closeWindow() { }
        async client_openUrl(url: any) { }
        async client_alert(message: any) { }
        async client_confirm(message: any) { }
        async client_prompt(message: any): Promise<string | null> { throw new Error("Method not implemented.") }
        async client_setFocus(uid: any) { }
        async client_scrollIntoView(selector: any, options: any) { }
        async client_windowResize() { }
        async client_setLink(href: any, rel: any) { }
        async client_getCookieValue(key:string) {}
        async client_setCookieValue(key:string, value:string, maxAge:string) {}
        async client_getLocalValue(key:string): Promise<string> { throw new Error("Method not implemented.") }
        async client_setLocalValue(key:string, value:string) {}
        async client_getSessionValue(key:string) {}
        async client_setSessionValue(key:string, value:string) {}
        async client_getWindowName() {}
        async client_setWindowName(value:string) {}

        override render(): void {
            // This is not rendering anything
        }

        override ontick(tick: number) {
            this.sendPing();
            return 500;
        }

        async sendPing() {
            var pingStart = new Date().getTime();
            await this.client_showBrowserBusy(750);
            this.ping = new Date().getTime() - pingStart;
        }

        host_keyEvent(hotKeyEvent: KeyEvent) {
            this.dispatchMessage(new msgKeyEvent(hotKeyEvent))
        }

        host_throttled_resizeEvent(width: any, height: any) {
            this.width = width;
            this.height = height;
            this.dispatchMessage(new msgBrowserResize({width, height}));
        }
    }
}

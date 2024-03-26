namespace jzor.app {
    export var utils = new class {
        getBlankImage() {
            var img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
            return img;
        }

        createId() {
            return Math.random().toString(36).substr(2, 9);
        }

        isScriptLoaded(url: any) {
            return this.findScript(url) != null;
        }

        findScript(url: string) {
            return Array
                .from(document.querySelectorAll('script'))
                .find(e => e.src.includes(url));
        }

        loadScript(url: string) {
            var script = this.findScript(url);

            if (script == null) {
                script = document.createElement('script');
                script.async = false;
                script.src = url;
                document.body.append(script);
            }

            return script;
        }

        async loadScriptAsync(url: string) {
            var script = this.findScript(url);

            if (script == null) {
                script = document.createElement('script');
                script.async = true;
                script.src = url;
                document.body.append(script);
            }

            return new Promise((resolve, reject) => {
                script?.addEventListener("load", resolve, false);
            });
        }

        findStylesheet(url: string) {
            return Array
                .from(document.querySelectorAll('link'))
                .find(e => e.href.includes(url));
        }

        loadStylesheet(url: string) {
            var link = this.findStylesheet(url);

            if (link == null) {
                link = document.createElement('link');
                //link.async = false;
                link.type = 'text/css';
                link.href = url;
                link.rel = 'stylesheet';
                document.head.append(link);
            }

            return link;
        }

        async loadStylesheetAsync(url: string) {
            var link = this.findStylesheet(url);

            if (link == null) {
                link = document.createElement('link');
                //link.async = true;
                link.type = 'text/css';
                link.href = url;
                link.rel = 'stylesheet';
                document.head.append(link);
            }

            return new Promise((resolve, reject) => {
                link?.addEventListener("load", resolve, false);
            });
        }

        async sleep(ms: number | undefined) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async waitFor(condition: () => any, timeOut: number) {
            timeOut = timeOut || 10000;
            while (true) {
                if (condition()) return true;
                await this.sleep(1);
                timeOut--;
                if (timeOut == 0) {
                    console.warn('Timeout while waiting for:', condition);
                    return false;
                }
            }
        }

        /**
         * Sample() is throttle and debounce combined. It ensures that we also handle the last callback submitted.
         */
        sample(callback:Function, interval:number) {
            var timeout:any;
            let isThrottled = false;

            return function (this:Function, ...args:any) {
                // Debounce
                clearTimeout(timeout);
                timeout = setTimeout(() => callback.apply(this, args), interval);

                // Throttle
                if (isThrottled) return;
                isThrottled = true;

                callback.apply(this, args);
                setTimeout(() => isThrottled = false, interval);
            }
        }

        throttle(callback: { apply: (arg0: any, arg1: any[]) => void; }, interval: number | undefined) {
            let isThrottled = false;

            return  (...args: any) => {
                if (isThrottled) return;
                isThrottled = true;

                callback.apply(this, args);
                setTimeout(() => isThrottled = false, interval);
            }
        }

        debounce(callback: { apply: (arg0: any, arg1: any[]) => any; }, interval: number | undefined) {
            var timeout: any;
            return  (...args: any) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => callback.apply(this, args), interval);
            };
        }

        reloadPage() {
            var url = new URL(window.location.href);
            window.location.href = url.href;
        }
    }
}
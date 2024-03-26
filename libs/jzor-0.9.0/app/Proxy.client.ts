namespace jzor.app {
    // Do not rename members (CLR interface)
    export interface HostReference {
        _id: number;
        _fullName: string;
        invokeMethodAsync(methodName: string, name: string, args: any[]): Promise<any>;
    }

    const nameof_ProxyManager: string = 'ProxyManager';
    /**
     * ProxyManager that handles client instantiation and forwarding from the corresponding host proxies
     */
    export var ProxyManager = class {
        private static _instances: any[] = [];

        static createInstance(reference: HostReference, fullName: string, args: any[]) {
            this.throwIfReferenceExists(reference);
            var instance = this.newInstance(reference, fullName, args) as ProxyClient;
            this._instances[reference._id] = instance;
            reference._fullName = fullName;
            if (instance?.oninit) instance.oninit(args[0]);
        }

        static disposeInstance(reference: HostReference) {
            if (this._instances.length == 0) return;
            this.throwIfReferenceDoesNotExist(reference);
            var instance = this.getInstance(reference);
            if (instance?.ondispose) instance.ondispose();
            this.removeInstance(reference);
        }

        // Forward calls from the host
        static invokeInstance(reference: HostReference, methodName: string, ...args: any) {
            var instance = this.getInstance(reference);
            return this.getInstanceMethod(instance, methodName)(...args);
        }

        // Forward calls from the host
        static async invokeInstanceAsync(reference: HostReference, methodName: string, ...args: any) {
            var instance = this.getInstance(reference);
            var method = this.getInstanceMethod(instance, methodName);
            var result = await method.call(instance, ...args);
            return result;
        }

        private static throwIfReferenceExists(reference: HostReference) {
            if (this._instances[reference._id] != undefined)
                throw `${nameof_ProxyManager} - instance ${reference._id} already exists`
        }

        private static throwIfReferenceDoesNotExist(reference: HostReference) {
            if (this._instances[reference._id] == undefined) {
                console.log('ProxyManager._instances', this._instances)
                throw `${nameof_ProxyManager} - instance ${reference._id} does not exist`
            }
        }

        private static removeInstance(reference: HostReference) {
            // Keep entry for tracking
            delete this._instances[reference._id];

            // Cleanup if more than 5000 instances
            if (this._instances.length > 5000) {
                this._instances = this._instances.filter(item => item != undefined);
            }
        }

        private static newInstance(reference: HostReference, fullName: string, args: any[]): object {
            var ctor = eval(fullName);
            if (typeof ctor != "function")
                throw `${nameof_ProxyManager} - cannot create an instance of type '${fullName}', the type is unknown`;

            var instance = new ctor(reference, ...args);
            if (typeof instance != "object")
                throw `${nameof_ProxyManager} - cannot create an instance of type '${fullName}', the instance could not be constructed`;

            return instance;
        }

        private static getInstance(reference: HostReference) {
            var instance = this._instances[reference._id];
            if (typeof instance != 'object') throw `${nameof_ProxyManager} - cannot find instance with name '${reference._id}'`;
            return instance;
        }

        private static getInstanceMethod(instance: any, methodName: string): Function {
            var method = instance[methodName];
            if (typeof method !== 'function') throw `${nameof_ProxyManager} - cannot find function with name '${methodName}' on '${instance}'`;
            return method;
        }
    }

    /** 
     * ProxyClient base class that enables a client class to receive and call methods on the corresponding host class
     * The relationship between the client and host class must follow these implementation rules:
     * 1. The client class should have the name of the host class with 'Client' appended: ie. Browser and BrowserClient
     * 2. The client should be in a separate file using the ".client.ts" name standard, meaning the script will only be executed on the client
     * 
     * NOTE: The client cannot use any instances running on the host, as host scripts are not loaded on the client
     */
    export abstract class ProxyClient {
        constructor(protected _hostRef: HostReference) {
            this.setupProxyMethods();
        }

        async oninit(uid:string): Promise<void> {}
        ondispose(): void {}

        /** Throttled (sampled) version of the hostInvokeAsync method */
        private throttledInvokeHostAsync: any = jzor.app.utils.sample(this.invokeHostAsync, 100);

        /** Invokes a method on the host - methodName must start with a leading "host_" to ensure only specific methods can be called */
        private async invokeHostAsync(methodName: string, ...args: any) {
            return await this._hostRef.invokeMethodAsync('InvokeHostMethod', methodName, args);
        }

        /** Rewrites host_ methods to proxies, with optional throttled (sampled) versions */
        private setupProxyMethods() {
            var properties = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
            for (var key of properties.filter(m => m.startsWith('host_'))) {
                let isThrottled = key.startsWith("host_throttled_");
                let methodName = key; //NB: capture
                let that = this; //NB: capture

                (this as any)[methodName] = isThrottled
                    ? async function (...args:any) { return await that.throttledInvokeHostAsync(methodName, ...args); }
                    : async function (...args:any) { return await that.invokeHostAsync(methodName, ...args) }
            }
        }
    }
}

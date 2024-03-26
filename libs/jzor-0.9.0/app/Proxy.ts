namespace jzor.app {
    import client = CLR.Jzor.Client

    const ProxyManager = 'jzor.app.ProxyManager'

    //NOTE: We cannot refer to the any imported Part references here, as the import file also imports ProxyHost, which causes a circular reference
    export abstract class ProxyHost<T = any> extends Part<T> {
        private get _hostRef() { return this.HostReference }
        private get _fullName() { return this.PartName+'Client' }

        abstract render(): any

        oninit() {
            this.setupProxyMethods();
        }

        override async onclientinit() {
            await client.InvokeAsync(`${ProxyManager}.createInstance`, [this._hostRef, this._fullName, [this.UID]])
        }

        override async onclientdispose() {
            await client.InvokeAsync(`${ProxyManager}.disposeInstance`, [this._hostRef, []])
        }

        async invokeProxyInstance(methodName:string, ...args:any) {
            return await client.InvokeAsync(`${ProxyManager}.invokeInstanceAsync`, this._hostRef, methodName, ...args)
        }

        setupProxyMethods() {
            let properties = getAllProperties(this)
                .filter(key => key.startsWith('client_'));

            for (var key in properties) {
                let methodName = properties[key]; //NB: variable capture
                (this as any)[methodName] = async (...args:any[]) => {
                    await this.WaitUntilClientIsReady(); // Ensure the called instance is ready
                    return await this.invokeProxyInstance(methodName, ...args)
                }
            }
        }
    }    
}
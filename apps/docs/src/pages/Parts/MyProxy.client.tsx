namespace jzor.docs.pages.parts {

    //2. MyProxy example (client declaration)
    export class MyProxyClient extends ProxyClient implements IMyProxy {
        elm!: HTMLElement | null;
        // This is just a placeholder method, which is replaced by a call to the actual host instance
        async host_helloWorld(name: string): Promise<string> { throw new Error("Method not implemented."); }

        async client_getTime(message: string): Promise<Date> {
            console.log(message)
            return new Date();
        }

        async sayHelloHost(e:MouseEvent) {
            var hostHello = await this.host_helloWorld('Foobar')
            this.elm!.innerHTML += '<div>' + '<hr>' + hostHello + '</div>'
        }

        override async oninit(uid: string): Promise<void> {
            this.elm = document.getElementById(uid);
            this.elm!.innerHTML += '<button>Call Host</button>';
            this.elm!.onclick = e => this.sayHelloHost(e);
        }

        override ondispose(): void {
            console.log('MyProxyClient was disposed')
        }
    }
    //2.
}
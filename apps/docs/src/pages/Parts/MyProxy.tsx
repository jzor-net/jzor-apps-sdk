namespace jzor.docs.pages.parts {

    //1. MyProxy example (host declaration)

    // This interface is shared between the host and client
    // Methods should return a Promise and called async to return a value
    export interface IMyProxy {
        client_getTime(message: string): Promise<Date>;
        host_helloWorld(name: string): Promise<string>;
    }

    export class MyProxy extends ProxyHost implements IMyProxy {
        clientTime?: Date;

        // This is just a placeholder method, which is replaced by a call to the actual client instance
        client_getTime(message: string): Promise<Date> { throw new Error("Method not implemented."); }

        async host_helloWorld(name: string): Promise<string> {
            return `Hello ${name} from the host world`
        }

        async sayHelloToTheClient() {
            // Call and get the value
            this.clientTime = await this.client_getTime('MyProxy asking for the time')
            // Refresh to display the time
            this.Refresh()
        }

        render() {
            return <div>
                The clients time is {this.clientTime}
                <hr/>
                <button on:click={this.sayHelloToTheClient}>Get the time from the Client</button>
                <hr/>
                <div id={this.UID} style="border:5px solid deeppink">
                    We select this div element by id on the client
                    <hr/>
                    and add a button here --&gt;
                </div>
            </div>
        }
    }
    //1.
}
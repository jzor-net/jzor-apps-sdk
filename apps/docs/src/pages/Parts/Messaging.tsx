namespace jzor.docs.pages.parts {
    export function messaging() {
        return <ExamplePage>
            {markdocs`
## Messaging

Messages are send by using the inherited methods on the Part, or by using an API method
The inherited methods are using the class name as the message name, where as the API method takes the message name as the first argument

Messages are received by adding a method starting with "msg" and the message name appended - like "msgMyMessage"
All Parts that are currently active and have a matching handler will receive the message

Centralized and global handling can be achieved by ensuring the part is always active, by placing it in the top of the rendering hierachy (for example inside the Main part)

**Dispatch** message sends a message to all methods named by the convention. 
Dispatch messages are not serialized, and may contain references to complex object instances

**Distribute** message sends messages to all applications, and accross processes/hosts if NetMQ is enabled. 
Distributed messages are JSON serialized and may fail on non-serializable complex objects

> **NOTE**: The dispatch and distribute methods work with class-based messages, using the class name to identify the message type. Additionally, the CLR messaging API includes methods for handling named messages.


${<debug.SourceView source="/src/pages/Parts/Messaging.tsx" x-style="rounded" example="1" lang="tsx" run={<Messaging/>} />}

`}
        </ExamplePage>
    }

    //1. Messaging example
    export class msgMessage1 {
        timestamp = new Date()
        constructor(public data?: {
            name?: string
            age?: number
            married?: boolean
        }) { }
    }

    export class Messaging extends Part {
        receivedMessage: any
        dump?: debug.Dump

        getReceivedMessage(): any { return this.receivedMessage }

        render() {
            return <VBox>
                {markdocs`
Dispatch sends the message to the application itself only.
Distribute sends the message to all applications.
`}
                <div>
                    <p>Typed Message</p>
                    <button on:click={this.dispatchTypedMessage}>Dispatch Message 1</button>
                    &nbsp;
                    <button on:click={this.distributeTypedMessage}>Distribute Message 1</button>
                </div>
                <hr />
                <div>
                    <p>Named Message</p>
                    <button on:click={this.dispatchCustomMessage}>Dispatch Custom Message</button>
                    &nbsp;
                    <button on:click={this.distributeCustomMessage}>Distribute Custom Message</button>
                </div>
                <hr />
                <debug.Dump REF={bind(this.dump)} valueGetter={d => this.receivedMessage} title="Received Message"  expanded/>
                <TempLogger/>
            </VBox>
        }

        dispatchTypedMessage() {
            this.dispatchMessage(new msgMessage1({ name: 'Jane', age: 24, married: false }))
        }

        distributeTypedMessage() {
            this.distributeMessage(new msgMessage1({ name: 'John', age: 42, married: true }))
        }

        dispatchCustomMessage() {
            CLR.Jzor.Messaging.DispatchMessage("msg" + "CustomName", [{ timestamp: new Date(), name: 'Charlie', age: 33 }]);
        }

        distributeCustomMessage() {
            CLR.Jzor.Messaging.DistributeMessage("msg" + "CustomName", { timestamp: new Date(), name: 'Cindy', age: 55 });
        }

        // Handlers for receiving typed messages, these can be set on any part interested in the message
        [onMsg(msgMessage1)](msg: msgMessage1) {
            log(msg.timestamp, msg.data?.name, msg.data?.age, msg.data?.married)
            this.receivedMessage = msg
            this.dump!.value = msg;
            this.Refresh();
        }

        // To receive a custom message, start the method name with "msg" followed by the message name
        msgCustomName(msg: any) {
            log('Received a custom message', this.dump)
            dump(msg)
            this.receivedMessage = msg
            this.dump!.value = msg;
            this.dump!.Refresh()
        }
    }
    //1.
}
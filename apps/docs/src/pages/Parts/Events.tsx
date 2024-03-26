namespace jzor.docs.pages.parts {
    // Render the example
    export function events() {
        return <ExamplePage>
            {markdocs`
## Events

Jzor supports the dispatch of UI events to the host as well as the handling of standard client-side events. 
It also allows client-side code to interact with the host using the <code>HostReference</code> of a <code>Part</code>. 
To observe these interactions, one can monitor the browser console where all host-sent log entries are displayed in color.

#### Client Events
In Jzor, client-side events are declared using conventional HTML event strings. The browser's native functionality parses and processes these events.
${<debug.SourceView source="/src/pages/Parts/Events.tsx" x-style="rounded" example="1" lang="tsx" run={demo(<EventsClient/>)} />}

#### Host Events
To create host events, HTML elements are annotated with the <code>on:</code> prefix. This prefix facilitates the forwarding of browser events to the host, albeit only a subset of the event data is transmitted.
${<debug.SourceView source="/src/pages/Parts/Events.tsx" x-style="rounded" example="2" lang="tsx" run={demo(<EventsHost/>)} />}

#### Event Bubbling in Host Events
Event bubbling occurs in scenarios where nested clickable elements are involved. For instance, clicking on an inner element triggers events on both the inner and outer handlers.
${<debug.SourceView source="/src/pages/Parts/Events.tsx" x-style="rounded" example="3" lang="tsx" run={demo(<HostEventBubbling/>)} />}

To avoid events bubbling down from the source, you can set the <code>stoppropagation</code> attribute to true.
${<debug.SourceView source="/src/pages/Parts/Events.tsx" x-style="rounded" example="4" lang="tsx" run={demo(<HostEventBubblingFixed/>)} />}

#### Preventing Default Actions in Host Events
To prevent default actions, such as following a link in an anchor tag, the syntax 'preventdefault:click' is used. While this prevents the default action (e.g., following the link), the event itself is still logged.
${<debug.SourceView source="/src/pages/Parts/Events.tsx" x-style="rounded" example="5" lang="tsx" run={demo(<HostEventPreventDefault/>)} />}

#### Handling High-Rate Host Events
Some browser events can occur at a high rate, potentially leading to excessive processing.
Jzor utilizes a Proxy class to manage these high-rate events.
This class employs a sampled/throttled callback mechanism, effectively reducing the event rate to a more manageable level, like 100ms, irrespective of the browser's event firing rate.

${<debug.SourceView source="/src/pages/Parts/Events.tsx" x-style="rounded" example="6" lang="tsx" run={<HighRateHostEvents/>} />}

`}
        </ExamplePage>
    }

    function demo(f:Fragment) {
        return <>
            {f}
            <TempLogger/>
        </>
    }
}

namespace jzor.docs {

    //1. Client events example
    export class EventsClient extends Part {
        render() {
            return <>
                <p>Nothing is logged on the host, see browser console.log</p>            
                <button onclick="console.log('Client Click', event)">Client Click</button>
            </>
        }
    }
    //1.

    //2. Host events example
    export class EventsHost extends Part {
        render() {
            return <button on:click={e => log('Host Click')}>Host Click</button>
        }
    }
    //2.

    //3. Host event bubling
    export class HostEventBubbling extends Part {
        render() {
            return <><button on:click={e => log('Host Click Outer')}>
                Host Click Outer
                <button style="border:1px solid white" on:click={e => log('Host Click Inner')}>Host Click Inner</button>
            </button>
            </>
        }
    }
    //3.

    //4. Host event bubling fixed
    export class HostEventBubblingFixed extends Part {
        // The stoppropagation:click will make the event stop from bubling down
        render() {
            return <button on:click={e => log('Host Click Outer')}>
                Host Click Outer
                <button style="border:1px solid white" on:click={e => log('Host Click Inner')} stoppropagation:click>Host Click Inner</button>
            </button>
        }
    }
    //4.

    //5. Host events prevent default
    export class HostEventPreventDefault extends Part {
        // The preventdefault:click will make the event stop from executing it's default browser action, like following a href link
        render() {
            return <a href="github.com" on:click={e => log('Prevented Anchor Click')} preventdefault:click>Prevent Default on Anchor Click</a>
        }
    }
    //5.


    //6. High Rate Host Events
    export class HighRateHostEvents extends Part {
        X = 0
        Y = 0
        render() {
            return <VBox>
{markdocs`Moving the mouse into the pink frame below will server-render a small counter box next to the cursor, showing the mouse X and Y position, as well as the total render count of the counter box itself.
> **NOTE**: Jzor protects itself against high rate rendering, and will cut off Part's with a refresh rate of more than 100 times per second.`}

                <div on:mousemove={e => this.onMouseMove(e)} style="border:2px solid deeppink; padding:5px;position:relative;">
                    <RenderCounter absolute style={`left:${this.X}px; top:${this.Y}px;pointer-events: none;`} title={`X:${this.X}px, Y:${this.Y}px, `} />
                    <div style="pointer-events: none">
                        <p>Move the mouse inside this box, but be carefull using events directly that fire at a high rate. Server side rendering requires more resources and should not be wasted on fast client updates.</p>
                        <p>For tight integration with fast client events, the Proxy class can be used, which has a throttle function to keep the rate down.</p>
                    </div>
                </div>

{markdocs`Depending on your latency, you should see the box lagging more or less behind the cursor, as it takes time before the event is reaching the server, get rendered, and then send back to the client which has to update the DOM.`}
            </VBox>
        }

        onMouseMove(e: CLR.Microsoft.AspNetCore.Components.Web.MouseEventArgs): any {
            this.X = e.OffsetX + 20;
            this.Y = e.OffsetY + 20;
            this.Refresh();
        }
    }
    //6.
}
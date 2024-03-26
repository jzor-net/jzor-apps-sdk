namespace jzor.docs.pages.parts {
    // Render the example
    export function lifecycle() {
        return <ExamplePage>
            {markdocs`
## Life Cycle Events

The <code>LifeCycle</code> class below serves as an example to illustrate the various stages and events in a component's lifecycle. Here's an overview of these lifecycle stages and their significance:

### Initialization and State Management
- **<code>oninit</code>**: This method is called right after the part (component) is created. It's the initial stage where setup and initial state configurations are done.
- **<code>onloadstate</code>**: Invoked for loading the previous state of the part. This method is crucial for state persistence across sessions or renderings.
- **<code>onsavestate</code>**: Handles saving the current state of the part, ensuring that important state data can be preserved when needed.

### Property Handling
- **<code>onprops</code>**: Triggered when the part receives new properties from its owner. This stage is key for updating the component based on external changes.

### Pre-Rendering Checks
- **<code>onbeforerender</code>**: Executes before the rendering process starts. It can be used to perform any last-minute checks or to abort the rendering process by returning <code>false</code>.
- **<code>onrender</code>**: Runs during the rendering process but synchronously, allowing for any necessary preparations before the actual render happens.

### Post-Rendering Actions
- **<code>onready</code>**: This method is called after the part's first successful render. It signals that the component is now fully operational.
- **<code>onafterrender</code>**: Executes after the part has completed its rendering. It's used for any actions that need to happen after the component is rendered.

### Periodic Execution
- **<code>ontick</code>**: Called at regular intervals (e.g., every 100ms). This method is useful for performing actions that need to happen repeatedly over time.

### Cleanup and Disposal
- **<code>ondispose</code>**: This method is invoked when the part is being disposed of, which is crucial for cleanup and releasing resources.

### Client (Proxy Call) Methods
- **<code>onclientinit</code>** and **<code>onclientdispose</code>**: These methods are used for setting up and tearing down client methods on the proxy. They are typically used for internal purposes and play a role in managing the Proxy lifecycle.

### Render Method
- **<code>render</code>**: The core function for defining the UI representation of the component. This method returns the JSX layout of the part.

In summary, the <code>LifeCycle</code> class demonstrates how components in Jzor undergo various stages from initialization, rendering, updating, and finally to disposal. 
Each lifecycle method offers specific opportunities to interact with and control the component's behavior, state, and presentation.

${<debug.SourceView source="/src/pages/Parts/LifeCycle.tsx" x-style="rounded" example="1" lang="tsx" run={<LifeCycle.demo />} />}

Lifecycle methods in Jzor can be asynchronous if you add the **async** keyword to them. However, it's important to note that the <code>render</code> method is inherently synchronous, and the **async** keyword should not be used with it.

${<debug.SourceView source="/src/pages/Parts/LifeCycle.tsx" x-style="rounded" example="2" lang="tsx" run={<LifeCycleAsync.demo />} />}

    `}
        </ExamplePage>
    }

    //1. Part which logs all life cycle events
    export class LifeCycle extends Part {
        count = 0
        // Executes whenever the part receives props from its owner
        onprops(props: object) {
            log('LifeCycle', 'onprops')
        }

        // Called immediately after the part is instantiated
        oninit() {
            log('LifeCycle', 'oninit')
        }

        // Invoked for loading the part's previous state (alter the state argument or return a new state)
        onloadstate(state: object) {
            log('LifeCycle', 'onloadstate')
        }

        // Triggered before the part is queued for rendering - return false to cancel the queue
        onbeforerender(): boolean {
            log('LifeCycle', 'onbeforerender')
            return true;
        }

        // Invoked before the rendering process (synchronous operation)
        onrender() {
            log('LifeCycle', 'onrender')
        }

        // Called at the initialization of client methods
        onclientinit() {
            log('LifeCycle', 'onclientinit')
        }

        // Called at the initialization of client methods are ready
        onclientready() {
            log('LifeCycle', 'onclientready')
        }

        // Triggered once the part completes its initial rendering, excluding children
        onready() {
            log('LifeCycle', 'onready')
        }

        // Invoked after the part completes its rendering, exclusive of its children
        onafterrender(firstRender: boolean) {
            log('LifeCycle', 'onafterrender', firstRender)
        }

        // Periodically called, defaulting to 100ms intervals (return a millisecond value to set the next call delay)
        // ontick(tick: number, elapsedMs: number) {
        //     log('LifeCycle', 'ontick')
        //     this.Refresh(); // Initiates re-render to exhibit subsequent events like afterrender
        //     return 1000;
        // }

        // Executes during the disposal of client methods
        onclientdispose() {
            log('LifeCycle', 'onclientdispose')
        }

        // Executes when the part is being disposed of
        ondispose() {
            log('LifeCycle', 'dispose')
        }

        // Invoked for saving the part's current state (modify the state argument or return a new state)
        onsavestate(currentState: object) {
            log('LifeCycle', 'onsavestate')
        }

        render() {
            return <>
                <h2>LifeCycle events {this.count++}</h2>
                <p>Check the log for events - also shown in the browser console</p>
                <p>Try refreshing the Part to observe life-cycle changes</p>
                <button on:click={_ => this.Refresh()}>Refresh</button>
            </>
        }

        static demo() {
            return <>
                <TempLogger/>
                <LifeCycle/>
            </>
        }
    }
    //1.

    //2. All life cycle methods except onrender can be asynchroneous, by adding the async keyword to the method
    export class LifeCycleAsync extends Part {
        state: any

        async oninit() {
            this.state = "Waiting for data..."
            //Call Refresh to render the current state
            this.Refresh()
            //Pretend we are getting data ...
            await CLR.Jzor.ITimers.Delay(1500)
            this.state = "Done"
        }

        async onclientready() {
            log('LifeCycleAsync', 'onclientready')
            await CLR.Jzor.ITimers.Delay(500)
            this.state = "Client is ready..."
            this.Refresh()
        }

        // All methods can be declared async too, except for the onrender method
        async onafterrender(firstRender: boolean) {
            log('LifeCycleAsync', 'onafterrender start', firstRender)
            await CLR.Jzor.ITimers.Delay(500)
            log('LifeCycleAsync', 'onafterrender end', firstRender)
        }

        async click() {
            this.state = "Refreshing"
            this.Refresh()
            await CLR.Jzor.ITimers.Delay(500)
            this.state = "Done"
            this.Refresh();
        }

        render() {
            return <>
                <h2>LifeCycleAsync events</h2>
                <p>Open console and check the log for events</p>
                <p>Try refreshing the Part to observe life-cycle changes</p>
                <p>{this.state}</p>
                <button on:click={_ => this.click()}>Refresh</button>
            </>
        }

        static demo() {
            return <>
                <TempLogger/>
                <LifeCycleAsync/>
            </>
        }
    }
    //2.
}
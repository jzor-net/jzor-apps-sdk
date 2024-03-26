namespace jzor.docs.pages.parts {
    // Render the example
    export function state() {
        return <ExamplePage>
            {markdocs`
## State Management in Jzor

In Jzor, every part has the capability to load and save its own state. The lifecycle events <code>onloadstate</code> and <code>onsavestate</code> allow a part to manage its state post-initialization and pre-disposal.

State storage can be either temporary or persistant. While Jzor readily provides support for temporary state, managing persistant state requires custom implementation.

For persistant state, it is advisable to use in-memory key/value storage. This approach facilitates loading and saving state data at application startup or shutdown. Additionally, it allows for revisiting and potentially upgrading previously saved states when the application reloads. persistant state can encompass a wide range of data, from UI element positions to entire documents, and its usage is entirely flexible.

Temporary state, on the other hand, is confined to the application's lifespan. It proves useful in scenarios where a user navigates away from a page (or Part) and later returns to find it in the same state as left. For instance, maintaining the scroll position of a box across page visits enhances user experience.

> **NOTE**: The keys for temporary state in Jzor are derived from the Part's position in the source code, as indicated by <code>Info.SourceKey</code>. Modifying the source code while live updates are active may lead to changes in these keys, potentially invalidating the temporary state. This situation typically arises during the development phase when the source code is frequently adjusted and not yet stabilized.

Bear in mind that storing temporary state in Jzor requires memory, which adds to the application's total memory footprint. Additionally, when Parts are iteratively used within loops, they can produce significant quantities of state data. However, tracking simple states like open, closed, or selected statuses in these scenarios typically doesn't result in critical memory usage.

> **NOTE**: You can store cyclic object graphs in temporary state, as these state objects don't require serialization.

${<debug.SourceView source="/src/pages/Parts/State.tsx" x-style="rounded" example="1" lang="tsx" run={<StateCounter.demo/>} />}

${<debug.SourceView source="/src/pages/Parts/State.tsx" x-style="rounded" example="2" lang="tsx" run={<StateCounterPersistent.demo/>} />}
`}
        </ExamplePage>
    }

    //1. Using the state property
    export class StateCounter extends Part<{
        initialCount?:number
    }> {
        state = {
            count: this.props.initialCount ?? 0
        }

        increment() {
            this.state.count++
            //this.Refresh()
        }

        render() {
            return <>
                <div>Current Count Is: {this.state.count}</div>
                <button on:click={this.increment}>Increase Count</button>
            </>
        }

        static demo() {
            return <>
                {[0, 1, 2, 3, 4].map(i => <StateCounter/>)}
                {markdocs`Try set the state, navigate to another page, and come back`}
            </>
        }
    }
    //1.


    //2. Implementation of a persistent state counter
    export class StateCounterPersistent extends Part<{
        name: string
        initialCount?:number
    }> {
        state = {
            count: this.props.initialCount ?? 42
        }

        // The storedState argument is the first available of the following (in order):
        // 1. temporary state fetched from memory (if it exists)
        // 2. initialized state from this.state property (if it exists)
        // 3. undefined
        // On return, this.state will be set to the storedState object, or the returned state object
        async onloadstate(storedState: Record<string, any>) {
            // The storedState can be modified, or this method can return a completely new state object
            // For simplicity, this example loads the count directly from the browser
            // It's more effective to use a StateManager to handle this, which can be loaded and saved on application start/end
            var browser = getPartById<jzor.app.Browser>("Browser")
            var browserState = await browser.client_getLocalValue(`StateCounterPersistent${this.props.name}`)
            var state = JSON.parse(browserState)
            return state ?? storedState
        }

        // The currentState argument is the first available of the following (in order):
        // 1. this.state (if it exist)
        // 2. new empty object
        async onsavestate(currentState: Record<string, any>): Promise<void | Record<string, any>> {
            // For simplicity, this example saves the count directly to the browser
            // It's more effective to use a StateManager to handle this, which can be loaded and saved on application start/end
            var browser = getPartById<jzor.app.Browser>("Browser")
            var state = JSON.stringify(currentState)
            await browser.client_setLocalValue(`StateCounterPersistent${this.props.name}`, state)
            return currentState
        }

        increment() {
            this.state.count++
            this.Refresh()
        }

        render() {
            return <>
                <div>Current Count Is: {this.state.count}</div>
                <button on:click={this.increment}>Increase Count</button>
            </>
        }

        static demo() {
            return <>
                {[0, 1, 2, 3, 4].map(i => <StateCounterPersistent name={i.toString()} initialCount={i%2 ? i : undefined}/>)}
                {markdocs`Try set the state, navigate to another page, and come back`}
            </>
        }
    }
    //2.
}
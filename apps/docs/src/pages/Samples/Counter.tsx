namespace jzor.docs.pages.samples {

    // Render the example
    export function counter() {
        return <ExamplePage>
{markdocs`
## Counter

This example showcases a simple counter that persist its state.
${<Counter/>}
`}

        <hr/>
        <debug.SourceView source="/src/pages/Samples/Counter.tsx" example="1" lang="tsx" x-style="rounded" />
        </ExamplePage>
    }

    //1. Simple counter
    class Counter extends Part {
        state = {
            count: 0
        }
        render() {
            return <div>
                <p>Current count: <strong>{this.state.count}</strong></p>
                <button on:click={_ => this.state.count++}>Increment</button>
            </div>
        }
    }
    //1.
}
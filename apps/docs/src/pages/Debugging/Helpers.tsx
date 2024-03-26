namespace jzor.docs.pages.debugging {
    export function debughelpers() {
        return <>
            <ExamplePage>
{markdocs`
## Debug Helpers

#### Exception Logging with Stack Traces
Detailed exception logging, including stack traces, is available for debugging.
${<debug.SourceView source="/src/pages/Debugging/Helpers.tsx" example="1" x-style="rounded" lang="tsx" run={<ExceptionTest />} />}

#### Dump
Jzor has a Dump Part which can display data structures while working on your application - it also has limited editing capablites, when the type is known.
${<debug.SourceView source="/src/pages/Debugging/Helpers.tsx" example="2" x-style="rounded" lang="tsx" run={<DumpTest />} />}

#### RenderCounter
The RenderCounter Part will show a small counter indicating how many times it has been rendered
${<debug.SourceView source="/src/pages/Debugging/Helpers.tsx" example="3" x-style="rounded" lang="tsx" run={<RenderCounterTest />} />}
`}
            </ExamplePage>
        </>
    }

    //1. Exception test with stack
    export class ExceptionTest extends Part {
        throw() {
            throw new Error("Method not implemented.");
        }

        click() {
            this.throw()
        }

        render() {
            return <button on:click={this.click}>Throw</button>
        }
    }
    //1.

    //2. Dump can be used to dump any value
    export class DumpTest extends Part {
        render() {
            return <debug.Dump value={getPartById("Main")} expanded />
        }
    }
    //2.

    //3. RenderCounter showing the total number of renders
    export class RenderCounterTest extends Part {
        render() {
            return <>
                <RenderCounter />
                <button on:click={_ => this.Refresh()}>Refresh</button>
            </>
        }
    }
    //3.
}
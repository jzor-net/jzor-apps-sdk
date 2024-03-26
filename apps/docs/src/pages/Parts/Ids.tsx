namespace jzor.docs.pages.parts {
    // Render the example
    export function ids() {
        return <ExamplePage>
            {markdocs`
## Global ID's

Similar to <code>REF</code>, Parts in Jzor can be referenced using a global ID by setting a unique value to the <code>ID</code> attribute. It's crucial to ensure this ID is unique because if multiple Parts use the same ID, the most recently initialized one will take precedence.

Additionally, the global function <code>setPartById(id:string, instance:Part)</code> can be employed for a similar purpose, effectively associating a Part instance with a given ID. This is mainly used for setting up a fixed ID value.

To retrieve a Part instance, the global function <code>getPartById<T>(id:string)</code> is used. However, it's important to note that Parts are not statically registered with their IDs. Therefore, a Part will only be accessible through its ID after it has been initialized.

Adding and Removing the Part from the global ID cache, is done automatically when using the <code>ID</code> attribute, and happens when the Part is initialized and disposed.

${<debug.SourceView source="/src/pages/Parts/Ids.tsx" x-style="rounded" example="1" lang="tsx" run={demo(<Ids/>)} />}
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
    //1. Example initializing and using ID's
    //ID's can help getting the instance of other Parts, to be able to call functions or query these from another Part
    export class MyIdPart extends Part<{title?:string}> {
        title = this.props.title ?? 'Noname'

        render() {
            return <div>MyIdPart has the title: {this.title}</div>
        }
    }

    export class Ids extends Part {
        render() {
            return <>
                <h2>ID's</h2>
                <p></p>

                <MyIdPart ID="A" title="Part A"/>
                <MyIdPart ID="B" title="Part B"/>
                <MyIdPart ID="C" title="Part C"/>

                <button on:click={e => log(getPartById<MyIdPart>('A').title)}>Who has ID A</button>
                <button on:click={e => log(getPartById<MyIdPart>('B').title)}>Who has ID B</button>
                <button on:click={e => log(getPartById<MyIdPart>('C').title)}>Who has ID C</button>

                <hr/>
            </>
        }
    }
    //1.
}
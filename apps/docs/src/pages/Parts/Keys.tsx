namespace jzor.docs.pages.parts {
    // Render the example
    export function keys() {
        return <ExamplePage>
            {markdocs`
## KEY's

Keys are important when rendering the same type of Parts inside loops. The Blazor rendering mecanism tries to reuse Parts that are already of the specified type.
To avoid this Jzor automatically creates a unique key bases on the source code position and the number of instances originating from this position.
However, to improve speed when rerendering the list, it's faster to use a key based on the data that is rendered, otherwise complex objects might not be reused
This example is very simple, and just demonstrates the concept. when the rendering is simple, it does not have effect.

> **TODO**: Make an example where the effects of not using Keys are shown

${<debug.SourceView source="/src/pages/Parts/Keys.tsx" x-style="rounded" example="1" lang="tsx" run={<Keys/>} />}
`}
        </ExamplePage>
    }
}

namespace jzor.docs {

    //1. Example showing the use of keys
    export class ComplexPart extends Part {
        render() {
            return <div>This is an imaginary complex part {this.props.content}</div>
        }
    }

    export class Keys extends Part {
        items = [1,2,3,4,5]

        click() {
            log('delete')
            this.items.splice(2,1)
            this.Refresh()
        }

        render() {
            return <>
                {this.items.map( n => <ComplexPart KEY={n}>{n}</ComplexPart>)}

                <button on:click={this.click}>Delete 3rd</button>
            </>
        }
    }
    //1.
}
namespace jzor.docs.pages.parts {
    // Render the example
    export function refs() {
        return <ExamplePage>
            {markdocs`
## Local REF's

References to Part's can be captured by writing a function or binding expression in the REF attribute. 
At the time the Part is initialized, the Part itself will be forwarded to the REF, as eiter the first function argument, or setting the bound value.
Keep in mind that the REF is not being statically initialized, and is late bound.

Nesting of parts can sometimes be useful, in order to "late initialize" a Part that is depending on a REF intialized by another Part within the same Owner. 
As the parent level of a Part is normally fully rendered before their child levels, nesting the Part needing the REF could work in some scenarios

> **Note**: Allthough REF's are in many cases a good choice, be careful how you use them. 
To many REF's can lead to undesired coupling of Part's, which should strive for beeing independant and self-contained.

${<debug.SourceView source="/src/pages/Parts/Refs.tsx" x-style="rounded" example="1" lang="tsx" run={demo(<Refs/>)} />}
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
    //1. Example initializing and using REF's
    //REF's can help getting the instance of other Parts, to be able to call functions or query these from another Part
    export class MyRefPart extends Part<{title?:string}> {
        title = this.props.title ?? 'Noname'

        render() {
            return <div>MyRefPart has the title: {this.title}</div>
        }
    }

    export class Refs extends Part {
        refA!: MyRefPart
        refB!: MyRefPart
        refC!: MyRefPart

        render() {
            return <>
                <h2>REF's</h2>

                <MyRefPart REF={bind(this.refA)} title="Part A" />
                <MyRefPart REF={bind(this.refB)} title="Part B"/>
                <MyRefPart REF={(p:MyRefPart) => this.refC = p} title="Part C"/>

                <button on:click={e => log(this.refA.title)}>Who has REF A</button>
                <button on:click={e => log(this.refB.title)}>Who has REF B</button>
                <button on:click={e => log(this.refC.title)}>Who has REF C</button>

                <hr/>
            </>
        }
    }
    //1.
}
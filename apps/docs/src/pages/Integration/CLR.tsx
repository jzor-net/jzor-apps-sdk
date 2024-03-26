// This sample shows the different ways you can declare a part
// All Jzor parts have to extend the abstract Part class

namespace jzor.docs.pages.integration {

    // Render the example
    export function clr() {
        return <ExamplePage>
{markdocs`
## CLR.d.ts

The <code>CLR.d.ts</code> file serves as the type definition file for all exposed .NET Types.
${<debug.SourceView source="/.jzor/CLR.d.ts" x-style="rounded" lang="tsx" />}
`}
        </ExamplePage>
}

}

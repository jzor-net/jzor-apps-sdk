namespace jzor.docs.debugging {
    export namespace dump {
        export function show() {
            return <>
                <VBox height="100%" scroll>
                    <div>
                        <ExamplePage>
{markdocs`## Dump
Jzor features a <code>Dump</code> Part designed to visualize data structures during application development. This utility Part not only displays data but also offers limited editing capabilities, provided the data type is recognized.
`}
                        </ExamplePage>
                    </div>
                    <div style="padding:0 3rem 3rem 3rem">
                        <debug.Dump value={getPartById("Main")} expanded />
                    </div>
                </VBox>
            </>
        }
    }
}
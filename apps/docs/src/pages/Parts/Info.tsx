namespace jzor.docs.pages.parts {
    // Render the example
    export function info() {
        return <ExamplePage>
            {markdocs`
## Part Info

The <code>CLR.Jzor.Part</code> class forms the foundation for all Parts in Jzor, offering insights into a Part's CLR attributes. Properties beginning with uppercase letters are built-in, originating from the .NET base class.

- <code>Children</code>: Holds references to the children of the Part.
- <code>HostReference</code>: Keeps a reference to the CLR Part, enabling callbacks from client scripts to the host (see Proxy class implementations for details).
- <code>ID</code>: The global identifier for the Part.
- <code>KEY</code>: The specified or auto-generated key (from <code>SourceKey</code>) for the Part.
- <code>NestedLevel</code>: Indicates the Part's depth based on its ownership hierarchy.
- <code>Owner</code>: References the owner of the Part.
- <code>PartName</code>: The Part's name, including its namespace.
- <code>Path</code>: A unique identifier used for managing the Part's temporary state.
- <code>Source</code>: The origin source file of the Part.
- <code>SourceKey</code>: A unique key derived from the Part's source code location and instance count.
- <code>UID</code>: A unique ID for each Part instance.

> **NOTE**: Given Jzor's dynamic development, these properties may undergo changes or be deprecated in future releases, particularly to eliminate redundancy.
${<debug.SourceView source="/src/pages/Parts/Info.tsx" x-style="rounded" example="1" lang="tsx" run={<PartInfo/>} />}

`}
        </ExamplePage>
    }

    //1. Dump of a Part
    export class PartInfo extends Part {
        render() {
            return <>
            {markdocs`
The dump below show what members are available on all Part's inheriting from the CLR.Jzor.Part class.
Names starting with uppercase (green) are direct CLR methods and properties.
The Info property holds extra information about the Part.
`}
                <debug.Dump value={this} readonly expanded />
            </>
        }
    }
    //1.
}

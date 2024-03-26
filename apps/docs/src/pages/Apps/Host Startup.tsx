namespace jzor.docs.pages.apps {
    export function hoststartup() {
            return <ExamplePage>{markdocs`
## Host Startup

When a new application is instantiated, Jzor has two methods that the application can hook into - <code>onstart</code> and <code>onexit</code>
* <code>onstart</code> can be used to read custom settings and configure the application
* <code>onexit</code> can be used to store application state or similar

${<debug.SourceView source="/src/pages/Apps/host-startup._tsx" x-style="rounded" lang="tsx" />}

> **NOTE**: The browser may not be available at this point, as the user may simply close it without logging off, or connection may be lost
`}
        </ExamplePage>
    }
}

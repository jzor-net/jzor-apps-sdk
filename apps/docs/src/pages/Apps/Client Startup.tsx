namespace jzor.docs.pages.apps {
    export function clientstartup() {
            return <ExamplePage>{markdocs`
## Client Startup

When Client scripts are unified, they have the same load order as the Host scripts. All other Client scripts, do not have a particular load order, which may cause issues if they only initialize on load.
In some cases Client scripts needs to initialize when all scripts are loaded. Usually Client scripts wait for the browsers onready event or similar, but this may not always be reliable in Jzor.

In Jzor you can therefore hook into the Client startup process, by adding your initalization method which will be executed before the application starts.

${<debug.SourceView title="Client side start handler" source="/src/pages/Apps/client-startup.client._tsx" x-style="rounded" lang="tsx" />}

> **NOTE**: Compiled client scripts in Jzor are designed to support Parts running on the host and are not intended for use with additional front-end rendering frameworks that require tight integration with Jzor.

`}
        </ExamplePage>
    }
}


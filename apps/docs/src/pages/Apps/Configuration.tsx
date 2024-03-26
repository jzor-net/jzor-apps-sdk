namespace jzor.docs.pages.apps {

    export function configuration() {
        return <ExamplePage>
{markdocs`
## Host Configuration

The Jzor Host is configured with the <code>app.yml</code> YAML file. The configuration file is listed below with comments explaning each setting.

The host can be started with an open argument setting the \<mode\> of the application, which in turn loads an additional <code>app.\<mode\>.yml</code> file.

This additional file just needs to specify which settings that needs to be overriden.

> **NOTE**: The MainPart can also be changed by an override, which could tailor your application for a specific environment or function (like special customer or a built-in monitoring/dashboard function)

${<debug.SourceView source="/app.yml" x-style="rounded" lang="yml" />}
`}
        </ExamplePage>
    }
}
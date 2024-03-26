namespace jzor.docs.pages.integration {
    // Render the example
    export function hosted() {
        return <ExamplePage>
{markdocs`
## Hosting Jzor Apps

Jzor provides flexible hosting options, catering to different project requirements. Applications developed with Jzor can either leverage the dedicated <code>Jzor Host</code> or be integrated within a custom .NET Core application environment.

### Custom Hosting Solutions

For those looking to embed Jzor within a .NET Core application, the <code>Jzor.Server</code> project offers guidance on incorporating the Jzor <code>AppView</code> component seamlessly. This approach is particularly beneficial for projects requiring sophisticated package management and debugging tools. By hosting Jzor within a .NET Core application, developers gain enhanced control over the application's hosting environment, allowing for a more tailored development and deployment process.

### Utilizing Jzor Host

On the other hand, the <code>Jzor Host</code> serves as a straightforward hosting solution for applications that do not necessitate advanced debugging features provided by the host. It is an ideal choice for projects predominantly utilizing prebuilt plugins and where the data access layer is already implemented in C#, such as with an MSSQL plugin. These applications typically build their backend libraries in TypeScript, relying on pre-existing plugin assemblies for database connectivity or other binary API functionalities.

In summary, the choice between custom hosting and using the <code>Jzor Host</code> hinges on the specific requirements of your project, especially in terms of debugging capabilities and the use of prebuilt plugins.

`}
</ExamplePage>
    }
}

namespace jzor.docs.pages.debugging {
        export function visualstudio() {
            return <ExamplePage>
{markdocs`
## Visual Studio Debugging

In Visual Studio, there are two approaches to debugging Jzor applications. One option is to integrate Jzor within your custom .NET host and debug it as you would any .NET Core application. 
Alternatively, you can attach the debugger directly to the Jzor host to debug your plugins.

The Jzor runtime code is not available for debugging because the source code is obfuscated. As a result, exceptions thrown by Jzor will have obfuscated stack traces. 
However, stack traces from your source code will remain readable and accessible for debugging.

> **NOTE**: Initiating a breakpoint in Visual Studio pauses all execution threads, which includes all running Jzor TypeScript applications.
            
`}
        </ExamplePage>
    }
}
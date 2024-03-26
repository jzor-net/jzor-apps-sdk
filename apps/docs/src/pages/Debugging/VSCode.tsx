namespace jzor.docs.pages.debugging {
    export function vscode() {
            return <ExamplePage>{markdocs`
## VS Code Debugger

Debugging Jzor TypeScript applications is seamless with VS Code, thanks to its support for debugging multiple applications simultaneously. 
This is facilitated by leveraging VS Code's thread support, which aligns well with the single-threaded nature of Jzor TypeScript applications.

Each Jzor application's thread id corresponds to its application id, a straightforward incrementing number. 
To initiate debugging, start the VS Code debugger using (F5). To break into a specific application, use (F6), which pauses the application at its current execution point. 
This pause state is reflected in the browser, indicating that the application is now in debug mode. 
If you wish to debug an application right from its startup, press F5 within the browser window. 
This action restarts the application with the Jzor debugger attached, allowing for early-stage debugging.

<img src="/images/vscode-threads.png"/>

> **NOTE**: When there's only a single application running on the Jzor host, thread support in VS Code remains dormant.

##### VS Code Debugger Configuration

To enable the Jzor debugger in VS Code, include the following configuration section:
${<debug.SourceView title="VS Code Debugger Configuration" lang="js">
{`{
    "name": "Jzor Debugger",
    "type": "node",
    "request": "attach",
    "debugServer": 4224
'}\n`}</debug.SourceView> }

> **NOTE**: The Jzor debugger also has to be enabled in the app.yml configuration file.

`}
        </ExamplePage>
    }
}
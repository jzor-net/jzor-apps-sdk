namespace jzor.docs.pages {

    function Indent(content: Fragment) {
        return <div style='margin-left:2rem'>{content}</div>
    }

    export function quickstart() {
        return <ExamplePage>
{markdocs`
## Quick Start

1. **Download Jzor Host**: Obtain the most recent version of the Jzor Host for your operating system.
    - Download the latest binaries, extract them to a preferred location, and include this location in your system's PATH environment variable.
    - The framework-dependent version of the application necessitates having both .NET Core and ASP.NET Core installed on your local machine. Conversely, the self-contained version operates independently of any .NET installations.

    ${Indent(<HostDownloads />)}

2. **Download Jzor Apps SDK**: Clone the jzor-apps-sdk from GitHub into a new work folder.
    - GitHub repository: <https://github.com/jzor-net/jzor-apps-sdk.git>
    - Clone as **admin** user, and verify that both docs and starter apps folders have the symbolic linked <code>libs</code> folder within them
        - apps/docs/libs => ../../libs
        - apps/starter/libs => ../../libs
    
        <img src="/images/Symbolic Links.png">
        
      > NOTE: A local copy of the libs folder into the apps/docs and apps/starter folders will also work

3. **Launch Host**: Start the Jzor Host to run your applications locally.
    - Change directory to the apps folder i.e., <jzor-apps-sdk>/apps/starter
    - Launch jzor as <code>jzor .</code> denoting the current directory as the starting folder

4. **Open VSCode**: Open your project in Visual Studio Code for editing and debugging.
    - Change directory to your Jzor application folder i.e., <jzor-apps-sdk>/apps/starter
    - Open or Launch VS code with <code>code .</code>
    - Build the code with VS Code to check it's configured correctly (CTRL+SHIFT+B)
        > NOTE: the default <code>tsconfig.json</code> file is configured to not emit any output, this is by design.

    ##### VS Code Settings

    To enable file nesting in VS Code, include the following settings:
    ${Indent(<debug.SourceView title="VS Code Settings" lang="js">
{`"explorer.fileNesting.enabled": true,
"explorer.fileNesting.patterns": {
    "*.ts": "$\{capture\}.css, $\{capture\}.client.ts, $\{capture\}.client.tsx",
    "*.tsx": "$\{capture\}.css, $\{capture\}.client.ts, $\{capture\}.client.tsx"
}`}</debug.SourceView>)}

5. **View Application**: Access the application via the host address in a browser to ensure it's running.
    - Launch your browser at localhost:5000
    - Open the browser console to see log messages for the application

6. **Debugger Setup**:
    - Add debugger configuration to your launch configuration
    ${Indent(<debug.SourceView title="VS Code Debugger Configuration" lang="js">
{`{
    "name": "Jzor Debugger",
    "type": "node",
    "request": "attach",
    "debugServer": 4224
}`}</debug.SourceView>)}

7. **Debugging**:
    - Initiate a debug session in VSCode - press F5 to attach the debugger, and F6 to break into the application
    - Set breakpoints in your TypeScript files; when hit, the debugger will break into the application
    - To debug from the application start, attach the debugger to the application, and refresh it from the browser (F5)
    - Attach the Visual Studio debugger to the Jzor Host process if Plugin debugging is required.

    ##### VS Code Debugger Configuration

    To enable the Jzor debugger in VS Code, include the following in the launch configuration section:

8. **Iterate**: Make changes and see them reflected immediately due to Jzor Host's auto-refresh.
    - Change the source code and press save. The application should update immediately.

9. **Utilize Jzor Tools**: Use Jzor's development tools for efficient debugging and performance monitoring.
    - Try using logging, dump, and add Parts to the existing project, like a <code>RenderCounter</code> to get familiar with the development experience.

`}
        </ExamplePage>
    }
}

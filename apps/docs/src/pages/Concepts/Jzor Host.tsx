namespace jzor.docs.pages.concepts {
        export function jzorhost() {
            return <ExamplePage>
{markdocs`
## Jzor Host

The Jzor Host is the application server, which also features an embedded TypeScript compiler. The Jzor Host compiles the application at startup, and if the Incremental Compilation feature is enabled, it also recompiles the application in response to any file changes.

The Jzor Host takes two optional open parameters, the working directory and the application mode.

Example: ./bin/Jzor \<working directory\> \<mode\>

* The <code>working directory</code> is the folder root of the Jzor application
* The application <code>mode</code> is normally "debug", "test" or "prod" but it can be anything.

The application mode is used to load an application configuration override in addition to the base configuration file.
If the application mode is "devtest", you can add a configuration file named <code>app.devtest.yml</code> which has overrides needed in a specific scenario.

> **NOTE**: If the working directory is not specified, the Jzor host will assume the current directory. Adding the Jzor Host to the path, can therefore launch Jzor in any directory.

When using VSCode for frontend development, the compiler typically remains active to perform incremental compilations as files are updated. Yet, keeping everything consistently updated can be challenging, and occasionally, VSCode might struggle, especially when handling file additions, movements, or deletions.

<img src="/images/overview2.png"/>

### Live Update

Beyond Incremental Compilation, Jzor offers a Live Update option. Unless this feature is active, the effects of incremental compilations are only reflected when launching a new instance of the application. 
New aplication instances are created when you start a new browser session, and with Live Update disabled, the already running applications are not affected.

> **NOTE**: Continuous Live Updates don't remove old code from memory; they can either add new code or update existing code. There are situations where restarting the application (F5) or the host might be necessary to clear out redundant code.

The built-in nature of the Host Compiler affects both the size and the startup time of the Jzor Host. Aiming to address more complex scenarios, there are plans to introduce a separate Compiler and Host in the future, providing more flexibility for advanced usages.

### Virtual File System

Jzor employs a virtual file system (Zio), rooted at the application's root directory. Access to files outside this root is restricted; however, external folders can be mounted on demand through the <code>app.yml</code> configuration file.
`}
        </ExamplePage>
    }
}
namespace jzor.docs.pages.apps {
    export function main() {
        return <ExamplePage>
{markdocs`
## Main

The Main Part is the applications entry point, though some library code may run before the Main Part is activated. The name doesn't have to be Main, the name of the root Part is determined by the configuration files <code>MainPart</code> setting.

${<debug.SourceView source="/src/pages/Apps/Main.tsx" example="1" x-style="rounded" lang="tsx" />}
`}
        </ExamplePage>
    }
}

namespace mycompany.myapp {
    //1. Simple Main Part
    // NOTE: that we mainly use explicit namespaces here, and don't rely on any import files to pre-configure the mycompany.myapp namespace
    import Center = jzor.ui.layout.Center

    export class Main extends jzor.Part {
        oninit() {
            // Sets the global ID "MainTest" to point to this Part, which makes other Part's able to reach it
            // This could be triggering a Refresh() or get access to other global instances which we could also define and expose here
            setPartById("MainTest", this)
        }
        
        render() {
            // Main is using the AppView class from Jzor, which implementes the basic support for the application
            return <jzor.app.AppView ID="AppViewTest">
                <h1>This is the Main component</h1>
                {/* Using the Center Part by directly referencing its namespace and type */}
                <jzor.ui.layout.Center>0 to 4 is {[0,1,2,3,4].map( i => i )}</jzor.ui.layout.Center>
                {/* Using the same Center Part by referencing the imported type (see import statement above) */}
                <Center>5 to 9 is {[5,6,7,8,9].map( i => i )}</Center>
            </jzor.app.AppView>
        }
    }
    //1.
}


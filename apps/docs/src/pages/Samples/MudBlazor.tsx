namespace jzor.docs.pages.samples {
    import MudAlert = CLR.MudBlazor.MudAlert
    import MudBaseInput = CLR.MudBlazor.MudBaseInput
    import MudInput = CLR.MudBlazor.MudInput
    import MudDialog = CLR.MudBlazor.MudDialog
    import MudDialogProvider = CLR.MudBlazor.MudDialogProvider
    import MudSnackbarProvider = CLR.MudBlazor.MudSnackbarProvider
    import Severity = CLR.MudBlazor.Severity
    import MudThemeProvider = CLR.MudBlazor.MudThemeProvider

    // Render the example
    export function mudblazor() {
        return <ExamplePage>
{markdocs`
> **NOTE**: In this demonstration, the MudBlazor stylesheet is applied, superseding the default Jzor stylesheet.

## MudBlazor

Jzor includes experimental support for integrating Blazor components. 
This demonstration incorporates several MudBlazor components via the MudBlazor plugin, illustrating Jzor's potential for compatibility with Blazor ecosystems. 
While this feature is in the experimental stage to showcase possibilities, its inclusion in future Jzor releases remains undecided.

${<MudBlazorDemo />}
`}

            <hr />
            <debug.SourceView source="/src/pages/Samples/MudBlazor.tsx" example="1" lang="tsx" x-style="rounded" />
        </ExamplePage>
    }

    //1. MudBlazor components
    class MudBlazorDemo extends Part {
        dialog!: MudDialog

        textChanged(e: string) {
            log(e)
        }

        showSnack() {
            var s = CLR.MudBlazor.ISnackbar
            s.Add("Hello World", Severity.Error)
            s.AddNew(Severity.Warning, "The AddNew", o => o.IconColor = CLR.MudBlazor.Color.Secondary)
        }

        showDialog() {
            //this.dialog.Show()
            var result = CLR.MudBlazor.IDialogService.ShowMessageBox("My Title", "The message goes here...", "Yes", "No", "Cancel")
            log('Dialog Result', result)
        }

        render() {
            return <>
                <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' rel='stylesheet' />
                <link href='_content/MudBlazor/MudBlazor.min.css' rel='stylesheet' />
                <script type='text/javascript' src='_content/MudBlazor/MudBlazor.min.js'></script>
                <MudThemeProvider />
                <MudDialogProvider />
                <MudSnackbarProvider />
                <MudDialog REF={bind(this.dialog)} show={true}>
                    The dialog content
                </MudDialog>
                <div>
                    <div>MudInput: <MudInput OnKeyPress={(e: any) => log(e)} /></div>
                    <div><button on:click={this.showDialog}>Show Dialog</button></div>
                    <div><button on:click={this.showSnack}>Show Snack</button></div>
                </div>
            </>
        }
    }
    //1.
}
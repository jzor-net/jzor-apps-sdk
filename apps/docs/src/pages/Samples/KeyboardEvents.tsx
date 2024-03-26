namespace jzor.docs.pages.samples {

    // Render the example
    export function keyboardevents() {
        return <>
            <ExamplePage>
{markdocs`
## Keyboard Events

This example showcases key down events.
`}
                <hr />
                <debug.SourceView source="/src/pages/Samples/KeyboardEvents.tsx" example="1" lang="tsx" x-style="rounded" run={<KeyboardEvents/>} />
            </ExamplePage>
        </>
    }

    //1. Simple counter
    class KeyboardEvents extends Part {
        msgKeyEvent?: app.msgKeyEvent
        msgWindowResizeSize?: app.msgBrowserResize;
        render() {
            return <div>
                KeyEvent Message
                <debug.Dump value={this.msgKeyEvent?.keyEvent} expanded />
                Window Resize Message
                <debug.Dump value={this.msgWindowResizeSize?.windowSize} expanded />
            </div>
        }

        [onMsg(jzor.app.msgBrowserResize)](msg: jzor.app.msgBrowserResize) {
            this.msgWindowResizeSize = msg;
            this.Refresh();
        }

        [onMsg(jzor.app.msgKeyEvent)](msg: jzor.app.msgKeyEvent) {
            this.msgKeyEvent = msg;
            this.Refresh();
        }
    }
    //1.
}
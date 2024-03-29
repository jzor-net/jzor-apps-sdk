namespace jzor {
    export function onstart() {
        log('jzor.onstart', 'Add application start logic here')
    }
    export function onexit() {
        log('jzor.onexit', 'Add application exit logic here')
    }
}

namespace jzor.docs {
    export class Main extends Part {
        get browser() { return getPartById<app.Browser>('Browser') }

        oninit() {
            log('AppName', CLR.Jzor.App);
            debug.SourceViewRunner = (f: Fragment) => this.runSample(f)
            setPartById("Main", this)
        }

        runSample(f: Fragment) {
            dialog?.open(f);
        }

        render() {
            return <>
                <ui.Dialog REF={bind(dialog)}>My Dialog</ui.Dialog>
                <app.AppView ID="AppView">
                    <debug.SourceViewSupport />
                    <debug.MarkdownSupport />
                    <VBox height="100%">
                        <Box height="50px" align-items="center" x:look="gradient-blue">
                            <HBox height="50px" align-items="center">
                                <img src="jzor.svg" height="100%" style="float:left; padding: 5px 10px 5px 10px" />
                                <debug.SystemInfo />
                                <button on:click={_ => _}>Refresh</button>
                                <RenderCounter title="Main" />
                            </HBox>
                        </Box>
                        <ui.HSplit position={15} style="height:calc(100% - 100px)"
                            left={
                                <Box height="100%" x:look="gradient-blue">
                                    <AppMenu routes={routes} />
                                </Box>
                            }
                            right={
                                <Router routes={routes} notFound={<><h2>404 - Ooops!!!</h2><p>This is not what your'e looking for...</p></>} />
                            }
                        />
                        <Box height="50px" x:look="gradient-blue">
                            <ui.layout.Center>
                                © 2024 jzor.net - Alpha-version showcase for demonstration purposes.
                            </ui.layout.Center>
                        </Box>
                    </VBox>
                </app.AppView>
            </>
        }
    }
}
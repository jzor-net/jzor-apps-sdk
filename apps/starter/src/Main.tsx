namespace mycompany.myapp {
    import navigation = CLR.Jzor.Navigation;

    import AppView = jzor.app.AppView
    import SystemInfo = jzor.debug.SystemInfo

    // This standard dialog is exported, and can be used in all of mycompany.myapp.*
    export var dialog: Dialog

    export class Main extends Part {
        render() {
            return <>
                <Dialog REF={bind(dialog)}>My Dialog</Dialog>
                <AppView ID="AppView">
                    <VBox height="100%">
                        <Box height="50px" align-items="center" x:look="gradient-blue">
                            <HBox height="50px" align-items="center">
                                <img src="jzor.svg" height="100%" style="float:left; padding: 5px 10px 5px 10px" />
                                <SystemInfo />
                                <button on:click={_ => _}>Refresh</button>
                                <button on:click={_ => dialog.open(<>Hello World <hr /><pages.Counter /></>)}>Hello World</button>
                                <RenderCounter title="Main" />
                            </HBox>
                        </Box>
                        <HSplit position={15} style="height:calc(100% - 100px)"
                            left={
                                <Box height="100%" x:look="gradient-blue">
                                    <AppMenu routes={routes} />
                                </Box>
                            }
                            right={
                                <Box style={{ 'margin': '20px' }}>
                                    <Router routes={routes} notFound={<><h2>404 - Ooops!!!</h2><p>This is not what your'e looking for...</p></>} />
                                </Box>
                            }
                        />
                        <Box height="50px" x:look="gradient-blue">
                            <Center>
                                © 2024 jzor.net - Alpha-version showcase for demonstration purposes.
                            </Center>
                        </Box>
                    </VBox>
                </AppView>
            </>
        }
    }
}
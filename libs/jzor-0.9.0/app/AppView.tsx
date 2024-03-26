namespace jzor.app {
    import app = CLR.Jzor.App

    export class AppView extends Part {
        oninit(): void {
            logger.log(` AppView initializing App (${app.AppId})`);
        }

        ondispose(): void {
            logger.log(` AppView disposing App (${app.AppId})`);
        }

        render() {
            return <>
                <Browser ID="Browser" />
                <div class="AppView">
                    {this.props.content}
                </div>
            </>
        }

        ontick() {
            // Reset's the watch dog periodically, otherwise the application is terminated
            CLR.Jzor.App.WatchdogReset();
            return 1000;
        }
    }
}

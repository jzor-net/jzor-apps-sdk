namespace jzor.debug {
    import host = CLR.Jzor.Host

    /** Displays System Info Tags, like cpu and memory usage, and ping time to the client */
    export class SystemInfo extends Part {
        private get Browser():app.Browser { return getPartById<app.Browser>('Browser') }

        override ontick(tick:number) {
            this.Refresh();
            return 1000;
        }

        render() {
            return <div style='display:flex; flex-wrap: wrap;'>
                <div class='Fluent SystemInfo-pill'>CPU: {host.CpuUsage.toFixed(1)} %</div>
                <div class='Fluent SystemInfo-pill'>Memory: {host.ManagedMemory.toFixed(1)} / {host.TotalMemory.toFixed(1)} MB</div>
                <div class='Fluent SystemInfo-pill'>Apps: {host.TotalAppCount}</div>
                <div class='Fluent SystemInfo-pill'>Ping: {this.Browser?.ping!.toFixed(0)} ms</div>
                <div class='Fluent SystemInfo-pill'>AppId: {CLR.Jzor.App.AppId}</div>
                <div class='Fluent SystemInfo-pill'>W:{this.Browser?.width} x H:{this.Browser?.height}</div>
            </div>
        }
    }
}

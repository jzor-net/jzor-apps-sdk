namespace jzor.docs {
    type HostZip = {
        path: string
        platform: string
        singleFile: boolean
        selfContained: boolean
        version: string
    }

    export class HostDownloads extends Part {
        files: HostZip[] = [];
        grouped!: Record<string, HostZip[]>
        showAll = false

        parseFilenameToHostZip(filename: string): HostZip {
            const regexPattern = /\/host\/([a-z]+-x64)(-sf)?(-sc)?-(\d+\.\d+\.\d+\.\d+)\.zip$/;
            const match = filename.match(regexPattern);
            if (!match) {
                throw new Error('Filename does not match expected format');
            }

            // Extract parts from the filename
            const [, platform, sfIndicator, scIndicator, version] = match;

            return {
                path: filename,
                platform,
                singleFile: sfIndicator === '-sf',
                selfContained: scIndicator === '-sc',
                version
            };
        }

        groupByVersion(hostZips: HostZip[]): Record<string, HostZip[]> {
            return hostZips.reduce((acc, hostZip) => {
                const { version } = hostZip;
                if (!acc[version]) {
                    acc[version] = [];
                }
                acc[version].push(hostZip);
                return acc;
            }, {} as Record<string, HostZip[]>);
        }

        download(url) {
            CLR.Jzor.Navigation.NavigateTo(url, true);
        }

        oninit() {
            var files = CLR.Jzor.FileSystem.EnumeratePaths('/dist/@download/host', '*.*', CLR.System.IO.SearchOption.TopDirectoryOnly, CLR.Zio.SearchTarget.Both)
            this.files = files.map(this.parseFilenameToHostZip)
            this.files.sort((a, b) => b.version.localeCompare(a.version))
            this.grouped = this.groupByVersion(this.files)
        }

        render() {
            var versions = this.showAll ? Object.keys(this.grouped) : [Object.keys(this.grouped)[0]]
            return <>
                <ui.Input type="checkbox" value={bind(this.showAll)} /> Show all
                <table style="width:100%;">
                    <tr>
                        <th>Version</th>
                        <th width="50%">Framework Dependent</th>
                        <th>Self Contained</th>
                    </tr>
                    {versions.map(v =>
                        <tr>
                            <td>{v}</td>
                            <td>{this.grouped[v].filter(i => !i.selfContained).map(i => <button style='margin-right:10px' on:click={_ => this.download(i.path.replace('/dist/@', '/'))}>{i.platform}</button>)}</td>
                            <td>{this.grouped[v].filter(i => i.selfContained).map(i => <button style='margin-right:10px' on:click={_ => this.download(i.path.replace('/dist/@', '/'))}>{i.platform}</button>)}</td>
                        </tr>
                    )}
                </table>
            </>
        }
    }
}
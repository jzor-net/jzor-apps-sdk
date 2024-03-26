namespace jzor.docs {
    export class TempLogger extends Part<{
        maxLines?: number
    }> {
        maxLines = this.props.maxLines ?? 10
        lines:string[] = []
        lineNo = 1

        msgLogEvent(...args) {
            this.log(args)
            this.Refresh()
        }

        log(...args:any[]) {
            this.lines.push(this.lineNo++ + ': ' + args.join(', '))
            if (this.lines.length>this.maxLines) this.lines = this.lines.slice(1)
        }

        render() {
            return <>
                <hr/>
                <div style="background-color:#AAA;color:#EEE;padding:5px;font-size:0.8rem">Host Log Output</div>
                <textarea style="width:100%;padding:5px;" rows={this.maxLines}>{this.lines.join('\n')}</textarea>
            </>
        }
    }
}
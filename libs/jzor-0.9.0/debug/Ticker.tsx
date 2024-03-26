namespace jzor.debug {
    import timers = CLR.Jzor.ITimers

    export class Ticker extends Part<{
        rate?: number
    }> {
        tick: number = 0

        override async ontick(tick: number, elapsedMs: number) {
            this.tick!++
            this.Refresh();
            return this.props.rate ?? 100
        }

        render() {
            return <span class="PercentPie Fluent" style={`--percent:${this.tick % 101}`}>
                {this.tick.toFixed(0)}
            </span>
        }
    }
}


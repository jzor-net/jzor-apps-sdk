namespace jzor.docs.samples.tickers2 {
    // Render the example
    export function show() {
        return <ExamplePage>
            {markdocs`
## Tickers

This example showcases how Parts in Jzor can self-update at regular intervals. 
Consider a scenario with 100 tickers, where each ticker refreshes itself 10 times every second. 
This results in a total of 1000 updates occurring across all tickers each second, demonstrating the efficiency and responsiveness of asynchroneous Parts in handling dynamic content updates.

${<Tickers/>}

`}</ExamplePage>
    }

    export class TickerPie extends Part<{
        tick: number
    }> {
        render() {
            return <span class="PercentPie Fluent" style={`--percent:${this.props.tick % 101}`}>
                {this.props.tick.toFixed(0)}
            </span>
        }
    }

    export class Tickers extends Part {
        tick = 0;

        range(start: number, count: number): number[] {
            return Array.from({ length: count }, (_, i) => start + i);
        }

        ontick() {
            this.tick++
            this.Refresh();
        }
          
        render() {
            return <>{this.range(0, 99).map( i => <TickerPie tick={this.tick}/> )}</>
        }
    }
}

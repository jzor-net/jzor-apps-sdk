namespace jzor.docs.pages.samples {
    // Render the example
    export function tickerscombined() {
        return <ExamplePage>
            {markdocs`
## Tickers Combined

The Tickers Combined example illustrates the integration of multiple tickers into a single Part and rendering loop, optimizing performance. 
Unlike the individual Ticker examples, which update each of the 100 tickers 10 times per second, this approach consolidates all ticker updates into a single batch that executes only 10 times per second. 

This method highlights the critical impact of update strategies on performance, showing that efficient batching of updates can significantly reduce the rendering workload. 
By combining updates, we can minimize the number of re-renders and improve the overall efficiency of the application, demonstrating a practical approach to optimizing dynamic content updates in Jzor.

${<Tickers/>}
`}
        </ExamplePage>
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
            return <>{this.range(0, 99).map( i => 
                <span class="PercentPie Fluent" style={`--percent:${this.tick % 101}`}>{this.tick.toFixed(0)}</span>
            )}</>
        }
    }
}

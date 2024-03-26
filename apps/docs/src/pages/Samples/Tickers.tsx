namespace jzor.docs.pages.samples {
    // Render the example
    export function tickers() {
        return <ExamplePage>
            {markdocs`
## Tickers

This example showcases how Parts in Jzor can self-update at regular intervals. 
Consider a scenario with 100 tickers, where each ticker refreshes itself 10 times every second. 
This results in a total of 1000 updates occurring across all tickers each second, demonstrating the efficiency and responsiveness of asynchroneous Parts in handling dynamic content updates.

${<>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
            <Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/><Ticker/>
</>}

`}</ExamplePage>
    }
}
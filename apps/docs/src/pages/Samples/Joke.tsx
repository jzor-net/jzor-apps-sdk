namespace jzor.docs.pages.samples {
    export function joke() {
        return <ExamplePage>
{markdocs`
## Random Joke

This example showcases an external API call. Note that we do not call getJoke until the onready event. This ensures the Part will render something to the browser, as it would otherwise await the oninit call.
<hr/>
${<Joke />}
`}
            <hr />
            <debug.SourceView source="/src/pages/Samples/Joke.tsx" example="1" lang="tsx" x-style="rounded" />
        </ExamplePage>
    }

    //1. Random Joke
    export class Joke extends Part {
        joke?: IJoke;
        latency = 0;

        async onready() {
            await this.getJoke();
        }

        async getJoke() {
            this.joke = undefined
            this.Refresh()
            var now = new Date().getTime()
            await CLR.Jzor.ITimers.Delay(1000) // Simulate a slow api call
            var result = await CLR.Jzor.HttpClient.SendAsync('GET', 'https://v2.jokeapi.dev/joke/Any?safe-mode')
            this.latency = new Date().getTime() - now;
            this.joke = JSON.parse(result.Content) as IJoke;
            this.Refresh()
        }

        render() {
            return this.joke?.error
                ? <p>Error: {this.joke.message}</p>
                : <div>
                    {this.joke ? '' : 'Requesting a joke...'}
                    <h4>{this.joke?.setup ?? ''}</h4>
                    <p>{this.joke?.delivery ?? ''}</p>
                    <h4>{this.joke?.joke ?? ''}</h4>
                    <button on:click={_ => this.getJoke()}>Refresh</button>
                    <p>{this.latency} ms</p>
                </div>
        }
    }

    interface IJoke {
        error: false,
        category: string,
        type: string,
        setup: string,
        delivery: string,
        joke: string,
        message: string,
        flags: {
            nsfw: boolean,
            religious: boolean,
            political: boolean,
            racist: boolean,
            sexist: boolean,
            explicit: boolean
        },
        safe: boolean,
        id: number,
        lang: string
    }
    //1.
}
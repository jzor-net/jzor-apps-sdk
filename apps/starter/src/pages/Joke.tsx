namespace mycompany.myapp.pages {

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
                    <h1>Random Joke</h1>
                    {this.joke ? '' : 'Requesting a joke...'}
                    <h4>{this.joke?.setup ?? ''}</h4>
                    <p>{this.joke?.delivery ?? ''}</p>
                    <h4>{this.joke?.joke ?? ''}</h4>
                    <button on:click={_ => this.getJoke()}>Refresh</button>
                    <p>{this.latency} ms</p>
                </div>
        }
    }
}
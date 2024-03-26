namespace mycompany.myapp.pages {

    export class Counter extends Part {
        state = {
            count: 0
        }
        render() {
            return <div>
                <p>Current count: <strong>{this.state.count}</strong></p>
                <button on:click={_ => this.state.count++}>Increment</button>
            </div>
        }
    }
}
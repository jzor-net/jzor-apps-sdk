namespace jzor.docs.pages.samples {

    export function todolist() {
        return <ExamplePage>
            {markdocs`
## Todo List

Creating an in-memory todo list in Jzor involves leveraging the framework's capabilities for state management and data binding. 
Below is a concise example illustrating how to construct a simple todo list application with input binding.

${<TodoList />}
<hr/>
${<debug.SourceView source="/src/pages/Samples/TODO.tsx" x-style="rounded" example="1" lang="tsx" />}

`}
        </ExamplePage>
    }

    //1. Todo list example
    type Todo = {
        description: string
        done: boolean
    }

    export class TodoList extends Part {
        nextTodo = 1

        state = {
            todos: [
                this.makeTodo(),
                this.makeTodo(),
            ],
            todo: this.makeTodo(),
        }

        render() {
            return <div>
                <ui.Input type="text" value={bind(this.state.todo.description)} />
                <button on:click={_ => this.add()}>Add</button>
                <hr />
                {this.state.todos.map((todo) =>
                    <div>
                        <ui.Input type="checkbox" value={bind(todo.done)} />
                        <span style={`text-decoration:${todo.done ? 'line-through' : 'none'}`}> {todo.description} </span>
                        <button on:click={_ => this.delete(todo)}>Delete</button>
                    </div>)}
            </div>
        }

        add(): any {
            this.state.todos.push({ description: this.state.todo.description, done: false });
            this.state.todo = this.makeTodo()
        }

        delete(todo: Todo) {
            this.state.todos.splice(this.state.todos.indexOf(todo), 1)
        }

        private makeTodo() {
            return { description: `New Todo ${this.nextTodo++}`, done: false }
        }
    }
    //1.
}
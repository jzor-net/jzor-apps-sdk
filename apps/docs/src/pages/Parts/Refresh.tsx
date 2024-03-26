namespace jzor.docs.pages.parts {
    // Render the example
    export function refresh() {
        return <ExamplePage>
            {markdocs`
## Refresh

The refresh mechanism is designed to re-render active Parts in response to external changes, such as data modifications. 
Invoking a refresh on a Part results in the re-rendering of both the Part itself and all its children.

HTML element events prefixed with <code>on:</code> that are connected to host scripts automatically trigger a refresh of the entire application. 
However, this behavior can be circumvented by employing the <code>PreventRefresh</code> method on the Part receiving the event, or by selectively refreshing certain Parts using the <code>Refresh</code> method.

It's important to consider whether a full page diff is necessary or if refreshing a parent Part that encompasses the affected Parts is more efficient.

Below is an example of how invoking Refresh on a Part also re-renders its children. Refreshing a container Part, therefore, results in the rendering of its child Parts as well.

#### Refresh Methods
${<debug.SourceView source="/src/pages/Parts/Refresh.tsx" example="1" x-style="rounded" lang="tsx" run={<TestRefreshMethods/>} />}

#### Refreshing Children
${<debug.SourceView source="/src/pages/Parts/Refresh.tsx" example="2" x-style="rounded" lang="tsx" run={<DemoTestRefresh/>} />}

#### Refreshing inside functions
${<debug.SourceView source="/src/pages/Parts/Refresh.tsx" example="3" x-style="rounded" lang="tsx" run={<DemoTestFunc/>} />}

`}
        </ExamplePage>
    }

    function DemoTestRefresh() {
        return <TestRefresh title="A">
            <TestRefresh title="B">
                <TestRefresh title="D"></TestRefresh>
                <TestRefresh title="E"></TestRefresh>
            </TestRefresh>
            <TestRefresh title="C">
                <TestRefresh title="F"></TestRefresh>
                <TestRefresh title="G"></TestRefresh>
            </TestRefresh>
        </TestRefresh>
    }

    function DemoTestFunc() {
        return <TestFunc title="Outer Func 1">
            <TestFunc title="Inner Func 1" />
            <TestFunc title="Inner Func 2" />
        </TestFunc>
    }

    //1. Refresh methods
    export class TestRefreshMethods extends Part {
        myCounter=0

        click1() {
            log('click1', ++this.myCounter)
            // This auto refreshes everything, which is the default (note that the counter at the top app bar also increases)
        }

        click2() {
            log('click2', ++this.myCounter)
            // This refreshes this Part, as no ID argument is provided to the Refresh method
            this.Refresh()
        }

        click3() {
            log('click3', ++this.myCounter)
            // This refreshes the Main part, by it's ID (which is also "Main") 
            this.Refresh('Main')
        }

        click4() {
            log('click4', ++this.myCounter)
            // This prevents the auto refresh, while increasing the internal counter
            this.PreventRefresh();
        }

        render() {
            return <>
                <button on:click={this.click1}>Automatic Refresh</button>
                <button on:click={this.click2}>Explicit Refresh</button>
                <button on:click={this.click3}>Explicit Refresh By Name</button>
                <button on:click={this.click4}>Prevent Refresh</button>
                <hr/>
                <RenderCounter title="Refresh Counter"/>
                <div>MyCounter = {this.myCounter}</div>
                <TempLogger/>
            </>
        }
    }
    //1.

    //2. Refreshing individual parts, causes children to refresh as well
    export class TestRefresh extends Part<{
        title: string,

    }> {
        render() {
            return <div class="TestRefresh" on:click={_ => this.Refresh()} stoppropagation:click>
                <RenderCounter /> {this.props.title} <button on:click={_ => this.Refresh()} stoppropagation:click>Refresh</button>
                {this.props.content ?? ''}
            </div>
        }
    }
    //2.

    //3. Refreshing using the owner argument, inside a function
    export function TestFunc(
        // 1st argument on functions is the props passed to the function
        props: {
            title: string,
            content?: Fragment
        },
        // 2nd argument on functions is the owner (the part using the function)
        owner: Part
    ) {
        return <div style="border:2px solid deeppink;padding:5px;margin:5px;background-color: #EEE">
            <div>
                <RenderCounter />
                {/* Refreshing the owner will in turn refresh all parts owned by the owner (including this) */}
                <button on:click={e => owner.Refresh()}>Refresh</button>
                {props.title} - Owner:{owner}
            </div>
            <div style="border:2px solid gray;padding:10px;background-color: #FFF">
                {props.content}
            </div>
        </div>
    }
    //3.
}

namespace jzor.docs {

}
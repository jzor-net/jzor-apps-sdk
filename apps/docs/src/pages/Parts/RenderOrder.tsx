namespace jzor.docs.pages.parts {
    // Render the example
    export function renderorder() {
        return <ExamplePage>
            {markdocs`
## Render Order

In Jzor, the rendering of parts does not follow the sequential order as listed in the <code>render</code> method. 
Instead, rendering operates on a level-by-level basis, where each <code>Part</code> is responsible for rendering itself and its content. 
The process initiates at the root level, where all parts are queued to render themselves. Subsequently, each of these parts begins its own rendering process, including the content they encompass.


${<debug.SourceView source="/src/pages/Parts/RenderOrder.tsx" x-style="rounded" example="1" lang="tsx" run={<RenderOrder />} />}
`}
        </ExamplePage>
    }

    //1. Example showing the render order of Part's
    var renderOrder: number = 0;

    class RenderPart extends Part<{
        name:string
        seqOrder:number
    }> {
        render() {
            return <div class="RenderPart">
                Name: {this.props.name}, Sequential Order: {this.props.seqOrder}, Render Order: <b>{renderOrder++}</b>
                {this.props.content ?? ''}
            </div>
        }
    }

    class RenderOrder extends Part {
        seqOrder: number = 0;
        render() {
            renderOrder = 0
            return <>
                <RenderPart seqOrder={this.seqOrder++} name="A">
                    <RenderPart seqOrder={this.seqOrder++} name="B">
                        <RenderPart seqOrder={this.seqOrder++} name="C"/>
                        <RenderPart seqOrder={this.seqOrder++} name="D"/>
                    </RenderPart>
                    <RenderPart seqOrder={this.seqOrder++} name="E">
                        <RenderPart seqOrder={this.seqOrder++} name="F"/>
                        <RenderPart seqOrder={this.seqOrder++} name="G"/>
                    </RenderPart>
                </RenderPart>
            </>
        }
    }
    //1.
}

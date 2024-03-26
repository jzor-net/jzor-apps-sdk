namespace jzor.docs {
    export class ExampleSplit extends Part<{
        filename:string
        title?:string
    }> {
        render() {
            return <ui.VSplit
                top={
                    <VBox height="100%" style={({'padding':'20px'})} scroll>
                        {/* <h2>{this.props.title}</h2> */}
                        {this.props.content}
                    </VBox>
                } 
                bottom={
                    <VBox height="100%">
                        <debug.SourceView lang="tsx" source={this.props.filename} title={this.props.title ?? this.props.filename ?? 'Example'} inline={false}/>
                    </VBox>
                }/>
        }
    }
}
namespace jzor.docs {
    export class ExamplePage extends Part {
        render() {
            return <Box class="markdown-body" style={{ 'padding': '3rem' }} height="100%" scroll="vertical" x:look="shadow-inset">
                {this.props.content}
            </Box>
        }
    }
}
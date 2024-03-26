namespace jzor.ui.layout {
    export class Center extends Part {
        render() {
            return <Box width="100%" height="100%" style={({'display':'flex', 'justify-content':'center', 'align-items':'center'})} >
                {this.props.content}
            </Box>
        }
    }
}
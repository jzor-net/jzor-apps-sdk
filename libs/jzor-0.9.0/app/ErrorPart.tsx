namespace jzor.app {

    /** ErrorPart is rendered in place of parts that fails to render */
    export class ErrorPart extends Part<{
            /** The source file */
            source?:string, 
            /** The error message */
            message?:string
    }> {
        render() {
            return <div class='ErrorPart'>
                <div class='ErrorPart-source'>❌ Error: {this.props.source}</div>
                <div class='ErrorPart-message'>{this.props.message}</div>
            </div>
        }
    }
}

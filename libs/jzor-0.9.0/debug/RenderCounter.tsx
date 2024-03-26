namespace jzor.parts {
    export class RenderCounter extends Part<{
        title?:string
        absolute?:boolean
        style?:string
    }> {
        count = 1

        get title() { return this.props.title ?? ''}
        get style() { return this.props.absolute ? 'position:absolute' : false}

        render() {
            var content = this.props.content ?? (<>{this.title} {this.count++}</>)
            return <div style="position:relative"><span class='RenderCounter' style={this.style + '; ' + (this.props.style ?? '')}>{content}</span></div>
        }
    }    
}

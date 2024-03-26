namespace jzor.ui {

    export interface IVSplitProxies {
        host_onAfterResize(position: number): any
    }

    export class VSplit extends ProxyHost<{
        style?: string
        position?: number
        handleWidth?: number
        /** Minimum top position in percent */
        minTop?: number
        /** Minimum bottom position in percent */
        minBottom?: number
        top: Fragment
        bottom: Fragment
    }> implements IVSplitProxies {
        style = this.props.style ?? false
        handleWidth = this.props.handleWidth ?? 10
        minTop = this.props.minTop ?? 10
        minBottom = this.props.minBottom ?? 90

        state = {
            position: this.props.position ?? 50
        }

        render() {
            return <div class='VSplit-container' style={this.style}>
                <div class='VSplit-top' style={`flex-basis: ${this.state.position}%; min-height:${this.minTop}%; max-height:${this.minBottom}%;`}>
                    {this.props.top}
                </div>
                <div id={this.UID} class='VSplit-resize' style={`height:${this.handleWidth}px`}/>
                <div class='VSplit-bottom'>
                    {this.props.bottom}
                </div>
            </div>
        }

        host_onAfterResize(position: number) {
            this.state.position = position;
            log(position)
        }
    }
}
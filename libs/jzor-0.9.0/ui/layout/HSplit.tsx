namespace jzor.ui {

    export interface IHSplitProxies {
        host_onAfterResize(position: number): any
    }

    export class HSplit extends ProxyHost<{
        style?: string
        position?: number
        handleWidth?: number
        /** Minimum left position in percent */
        minLeft?: number
        /** Minimum right position in percent */
        minRight?: number
        left: Fragment
        right: Fragment
    }> implements IVSplitProxies {
        style = this.props.style ?? false
        handleWidth = this.props.handleWidth ?? 10
        minLeft = this.props.minLeft ?? 10
        minRight = this.props.minRight ?? 90

        state = {
            position: this.props.position ?? 50
        }

        render() {
            return <div class='HSplit-container' style={this.style}>
                <div class='HSplit-left' style={`flex-basis: ${this.state.position}%; min-width:${this.minLeft}%; max-width:${this.minRight}%;`}>
                    {this.props.left}
                </div>
                <div id={this.UID} class='HSplit-resize' style={`left:${this.handleWidth}px`}/>
                <div class='HSplit-right'>
                    {this.props.right}
                </div>
            </div>
        }

        host_onAfterResize(position: number) {
            this.state.position = position;
            log(position)
        }
    }
}
namespace jzor.ui {

    //TODO: This needs a focus trap (to restrict TAB key navigation to the dialog area)
    export class Dialog extends Part<{
        title?: string
        height?: string;
        width?: string;
    }> {
        get browser() { return getPartById<jzor.app.Browser>("Browser") }
        height = this.props.height ?? '75%'
        width = this.props.width ?? '75%'
        title? = this.props.title 
        show = false
        content?: Fragment

        close() {
            this.show = false;
            this.Refresh();
            //NB: Dispose Parts
            this.content = undefined;
        }

        open(content?: Fragment) {
            this.content = content
            this.show = true;
            this.Refresh();
        }

        async [onMsg(jzor.app.msgKeyEvent)](msg: jzor.app.msgKeyEvent) {
            if (msg.keyEvent!.key == 'Escape') this.close()
        }

        render() {
            return this.show
                ? <div class='Dialog' on:click={this.close}>
                    <div class='Dialog-container' style={`width:${this.width};height:${this.height}`} stoppropagation:click>
                        <span class='Dialog-close' on:click={this.close}>&times;</span>
                        {this.title ?? ''}
                        {this.content ?? this.props.content}
                    </div>
                </div>
                : undefined
        }
    }
}

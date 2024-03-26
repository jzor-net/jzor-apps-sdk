namespace jzor.ui {
    export type InputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email"
        | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range"
        | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"

    export class Input extends Part<{
        type: InputType
        clickToActivate?: boolean
        disabled?: boolean
        style?: string
        value?: IBinding<any>
        onChanged?: (value: any) => void
        refresh?: Part
        min?: number
        max?: number
    }> {
        _active = false;
        get isActive() { 
            return this.props.clickToActivate 
                ? this._active 
                : true
        }

        get value() { return this.props.value?.getValue() }
        set value(value: any) { this.props.value?.setValue(value) }

        activateClick(): void {
            this._active = true;
            //this.Refresh()
        }
         
        blur() {
            if (this.props.clickToActivate) this._active = false
            //this.Refresh()
        }

        changed(e: any) {
            var value = this.toTypedValue(e.value)
            this.value = value
            this.props.onChanged?.(value);
        }

        toTypedValue(value: any) {
            switch (this.props.type) {
                case 'checkbox': 
                    return value == true
                case 'date': 
                    return new Date(value)
                case 'number': 
                    return Number.parseFloat(value)
                default: return value
            }
        }

        toStringValue(value:any) {
            switch (this.props.type) {
                case 'date':
                    return (value as Date)?.toISOString().substring(0,10)
                default:
                    return value?.toString()
            }
        }

        get style() {
            switch (this.props.type) {
                case 'checkbox':
                case 'radio':
                    return "width:100%;_height:1.5rem;_scale:0.7;" + this.props.style;
                default:
                    return "width:100%;_height:1.5rem;" + this.props.style;
            }
        }

        async onafterrender(firstRender: boolean) {
            // Focus the input element when activated
            if (this.props.clickToActivate && this.isActive) 
                await CLR.Jzor.Client.Evaluate(`document.getElementById('${this.UID}').focus()`)
        }

        render() {
            return !this.isActive
                ? <div class="Input-activator" on:mousedown={this.activateClick}>{this.value}</div>
                : <input class="Input" id={this.UID} on:change={this.changed}
                    on:blur={this.blur}
                    checked={this.value}
                    value={this.toStringValue(this.value)}
                    {...{ disabled: this.props.disabled ?? false }}
                    type={this.props.type}
                    min={this.props.min ?? false}
                    max={this.props.max ?? false}
                    //style={this.style}
                    
                    // class="Fluent"
                    />
        }
    }
}
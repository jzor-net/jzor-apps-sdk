namespace jzor.debug {
    type PropValue = {
        instance: any
        name: string
        type: string
        value: any
        mode: string
    }

    export class Dump extends Part<{
        edit?: boolean,
        expanded?: boolean
        title?: string,
        value?: any,
        readonly?: boolean
        valueGetter?: (sender:Dump) => any
    }> {
        edit = this.props.edit ?? false
        title = this.props.title
        readonly = this.props.readonly ?? false;
        get value() { return this.props.value }
        set value(value:any) { this.props.value = value }

        state = {
            expanded: this.props.expanded ?? false
        }

        isArray(type: any) { return typeOf(type) == 'array' }
        isClrType(type: any) { return typeOf(type).includes('.') }
        isEnumerable(type: any) { return typeOf(type) == 'enumerable' }
        isFunction(type: any) { return typeof (type) == 'function' }
        isObject(type: any) { return typeOf(type) == 'object' }
        isComplex(type: any) { return this.isArray(type) || this.isObject(type) || this.isClrType(type) || this.isEnumerable(type) }

        getInputType(value: any): ui.InputType {
            var type = typeOf(value);
            switch (type) {
                case 'string': return 'text'
                case 'number': return 'number'
                case 'boolean': return 'checkbox'
                case 'date': return 'date'
                default: return 'hidden'
            }
        }

        getPropValues(obj: any): PropValue[] {
            var values = this.isEnumerable(obj) ? Array.from(obj) : obj;
            var isArray = this.isArray(values)

            var keys = isArray
                ? Object.keys(values)
                : Object.getOwnPropertyNames(values)

            keys.sort((a, b) => CLR.Jzor.String.AlphaNumericComparer(a, b))

            return keys.map<PropValue>(e => {
                var mode = isArray ? 'index' : e.charCodeAt(0)<=90 ? 'clr' : 'js'
                var result = ({ name: e, instance: values, type: typeOf(values[e]), value: values[e], mode } as PropValue)
                return result;
            });
        }

        isFragment(value:any):boolean {
            return typeOf(value) == 'Jzor.Runtime.Rendering.FragmentResult'
        }

        toggleEdit(): void {
            this.edit = !this.edit
        }

        toggleExpanded(e: MouseEventArgs) {
            this.state.expanded = !this.state.expanded
        }

        render(value = this.props.valueGetter?.(this) ?? this.props.value) {
            return <div class="Dump">
                <table width='100%'>
                    <tr>{this.renderHeader(value)}</tr>
                    <tr>{this.renderInfo(value)}</tr>
                    {this.renderValue(value)}
                </table>
            </div>
        }

        renderInfo(value: any) {
            return <td class="Dump-info" colspan="2">{this.renderInfoValue(value)}</td>
        }

        renderComplex(value:any) {
            return <>
                {this.getPropValues(value).map((pv, i) => <tr>
                    <td width='50' class='Dump-attr-name' title={pv.type} x-mode={pv.mode}>{pv.name}</td>
                    <td>{this.renderPropValue(pv)}</td>
                </tr>)}
            </>
        }

        renderHeader(value: any) {
            var arrayLength = this.isArray(value) || this.isEnumerable(value) ? ` (${value.length})` : ''
            //var arrayLength = this.isArray(value) || this.isEnumerable(value) ? `(${value.length})` : ''
            //if (this.isObject(value)) arrayLength = Object.keys(value).length
            return <th colspan="2" class="Dump-header" on:click={this.toggleExpanded}>
                <div style="display: flex; justify-content: space-between; align-items: center">
                    {/* <parts.RenderCounter/> */}
                    <span class="Dump-header-arrow" x-expanded={this.state.expanded}>▲</span>
                    <span class="Dump-header-title">{this.title ?? ''}</span>
                    <span class="Dump-header-type" style="flex-grow:1">{typeOf(value)}{arrayLength}</span>
                    <input title="Edit" stoppropagation:click={true} class="Dump-edit" type="checkbox" value={bind(this.edit)} on:change={_ => this.toggleEdit()} />
                </div>
            </th>
        }

        renderInfoValue(value: any): string | undefined {
            if (this.isFragment(value) && !this.state.expanded) return 'Fragment'
            return (this.isArray(value) ? 'array' : value)
        }

        renderValue(value: any) {
            if (!this.state.expanded) return <></>
            return this.isComplex(value)
                ? this.renderComplex(value)
                : this.renderSimple(value)
        }

        renderPropValue(pv: PropValue) {
            if (!this.state.expanded) return ''
            if (this.isFunction(pv.value)) return pv.value.toString()
            return this.isComplex(pv.value)
                ? <Dump value={pv.value} expanded={false} readonly={this.readonly} />
                :  this.renderSimple(pv)
        }

        renderSimple(pv: PropValue) {
            return typeOf(pv) == 'undefined' || this.readonly
                ? pv?.value ?? 'undefined'
                : <ui.Input type={this.getInputType(pv.value)} value={bind(pv.instance[pv.name])} clickToActivate={!this.edit} style="width:100%; max-width:350px"/>
        }
    }
}

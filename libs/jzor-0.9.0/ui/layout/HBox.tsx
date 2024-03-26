namespace jzor.ui.layout {
    export class HBox extends Part<{
        width?:string
        height?:string
        class?:string
        style?:{}
        scroll?: boolean
        'align-items'?: alignItems
        'justify-content'?: justifyContent
        'align-content'?: alignContent
        wrap?: boolean
        gap?: string
    }>
    {
        get style() {
            var p = this.props
            var hasSize = p.width || p.height;
            var scroll = p.scroll ?? false;
            var overflow = (scroll) ? 'overlay' : 'hidden'
            return {
                'align-content': p["align-content"] ?? false,
                'align-items': p["align-items"] ?? false,
                'justify-content': p["justify-content"] ?? false,
                'flex-wrap': p.wrap ? 'wrap' : 'nowrap',
                'flex-shrink': hasSize || scroll ? '1' : '0',
                'flex-grow': hasSize && !scroll ? '1' : '0',
                gap: p.gap ?? '',
                width: p.width,
                height: p.height,
                overflow,
                ...p.style
            }
        }

        render(p = this.props) {
            return <div class={`HBox Fluent ${this.props.class ?? ''}`} style={this.style}>
                {p.content}
            </div>
        }
    }
}
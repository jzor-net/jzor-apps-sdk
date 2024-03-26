namespace jzor.ui.layout {
    export class VBox extends Part<{
        'align-items'?: alignItems
        'justify-content'?: justifyContent
        'align-content'?: alignContent
        wrap?: boolean
        gap?: string
        scroll?: boolean
        width?:string
        height?:string
        style?:{}
        class?:string
    }>
    {
        get style() {
            var p = this.props;
            var hasSize = p.width || p.height;
            var scroll = p.scroll ?? false;
            var overflow = (scroll) ? 'overlay' : 'hidden'
            return {
                'align-content': p["align-content"] ?? 'initial',
                'align-items': p["align-items"] ?? 'initial',
                'justify-content': p["justify-content"] ?? 'initial',
                'flex-wrap': p.wrap ? 'wrap' : 'nowrap',
                'flex-shrink': hasSize || scroll ? '1' : '0',
                'flex-grow': hasSize || scroll ? '0' : '1',
                gap: p.gap ?? '',
                width: p.width,
                height: p.height,
                overflow,
                ...p.style
            }
        }

        render(p = this.props) {
            return <div class={`VBox Fluent ${this.props.class ?? ''}`} style={this.style} x-style={this.props['x-style']}>
                {p.content}
            </div>
        }
    }
}
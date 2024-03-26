namespace jzor.ui.layout {

    export class Box extends Part<{
        width?: string
        height?: string
        class?: string
        style?: object
        scroll?: 'none' | 'horizontal' | 'vertical' | 'both'
        hidden?:boolean
        shrink?:number
        grow?:number
        'x:look'?: 'gradient-blue' | 'gradient-black' | 'shadow-inset'
    }>
    {
        get class() { return `Box Fluent ${this.props.class ?? ''}` }
        get style() {
            var p = this.props;

            var hasSize = p.width || p.height;
            var scroll = p.scroll ?? 'none';
            var hasScroll = scroll != 'none'
            var overflow = hasScroll ? 'overlay' : 'hidden'

            var hasSize = p.width || p.height
            var scrollX = ['horizontal', 'both'].includes(scroll)
            var scrollY = ['vertical', 'both'].includes(scroll)
            var overflow = (scrollX ? 'overlay' : 'hidden') + ' ' + (scrollY ? 'overlay' : 'hidden')

            var width = p.width
            var height = p.height

            var shrink = p.shrink ?? (hasSize && hasScroll ? '1' : '0')
            var grow = p.grow ?? (hasSize ? '0' : '1')

            var display = p.hidden ? 'none' : false

            return {
                'flex-grow': grow,
                'flex-shrink': shrink,
                width,
                height,
                overflow,
                display,
                ...p.style,
            }
        }

        render($ = this.props) {
            return <div class={this.class} style={this.style} x-look={this.props['x:look'] || false}>
                {$.content}
            </div>
        }
    }
}
namespace jzor.debug {
    export class WhoAmi extends Part {
        render() {
            return <div>
                {this.SourceKey} - {this.Path} - {this.SourceKey}
            </div>
        }
    }

    export class SourceViewSupport extends Part {
        render() {
            return <>
                <link href="/scripts/prism/prism-vsc-dark-plus.css" rel="stylesheet" />
                <script src="/scripts/prism/prism.js"></script>
                <style>{raw(`
                    pre[class*=language-] {
                        margin:0px; 
                        padding:20px;
                    }
                    code[class*=language-], pre[class*=language-] {
                        line-height:1.1em;
                        text-wrap: wrap;
                    }
                `)}</style>
            </>
       }
    }

    //TODO: static's are currently readonly in Jint 3.0.0-2046, so this has to go outside
    // Runs an example defined by the SourceView run property
    export let SourceViewRunner: (f:Fragment) => void

    export class SourceView extends Part<{
        /** The prism.js language to use */
        lang?: string
        /** The source file on the local file system */
        source?:string
        /** A title for the source view header */
        title?:string
        /** A string in number format that selects a sample in the source file */
        example?:string
        /** If true, the source view is rendered as an inline box with rounder corners */
        inline?:boolean
        /** Represents a Part to Run in a sample dialog */
        run?:Fragment
    }> {
        title?:string = this.props.title ?? this.props.source ?? 'inline'
        inline = this.props.inline ?? true
        get Main() { return getPartById("Main") }

        get content() {
            //TODO: Should be async
            var result = this.load(this.props.source) ?? this.props.content
            if (!this.props.example) return result
            var extract = this.extractSectionWithTitleAndContent(result, this.props.example);
            this.title = extract?.title
            return extract?.content
        }
        set content(value:any) {
        }

        extractSectionWithTitleAndContent(str: string, marker: string): { title: string, content: string } | null {
            // Construct the full marker text (e.g., "//1.")
            const fullMarker = `//${marker}.`;
        
            // Regular expression to find the title
            const titleRegex = new RegExp(`${fullMarker}([^\\n]*)`, 'gm');
            const titleMatch = titleRegex.exec(str);
            const title = titleMatch ? `${marker}. ${titleMatch[1].trim()}` : null;
        
            // Regular expression to find the content
            const contentRegex = new RegExp(`${fullMarker}.*?\\n([\\s\\S]*?)(?=${fullMarker})`, 'gm');
            const contentMatch = contentRegex.exec(str);
            const content = contentMatch ? contentMatch[1].trimEnd() : null;
        
            return { title: title ?? '', content: content ?? '' };
        }

        load(filename?:string) : string | undefined {
            if (filename === undefined) return
            return CLR.Jzor.FileSystem.ReadAllText(filename!)
        }

        onafterrender() {
            CLR.Jzor.Client.Evaluate("window.Prism.highlightAll()")
        }

        runSampleButton() {
            return this.props.run
                ? <span style="float:right;"><button style="border:1px solid white" on:click={this.runSample}>RUN</button></span>
                : ''
        }

        runSample() {
            this.PreventRefresh()
            SourceViewRunner(<><div class="SourceView-title">{this.title}</div>{this.props.run}</>)
        }

        render() {
            var content = this.content
            return <ui.layout.VBox class="SourceView" height="auto" style={{'margin-bottom':this.inline ? '10px' : '0px'}} x-style={this.props['x-style']}>
                <div style="background-color:#468; color:#EEE; padding:5px; font-size:small;">{this.title} {this.runSampleButton()}</div>
                <pre class={`language-${this.props.lang}`} style="background-color:#333;"><code key={content} class={`language-${this.props.lang}`}>{this.content}</code></pre>
            </ui.layout.VBox>
        }
    }
}
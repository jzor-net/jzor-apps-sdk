namespace jzor.docs.pages.parts {
    // Render the example
    export function content() {
        return <ExamplePage>
            {markdocs`
## Content

Content encompasses all elements located between the opening and closing tags of a Part. This content is accessible within the Part via the default content property, <code>this.props.content</code>. Content is classified as a type of Fragment, functioning similarly to a method that returns an array of renderable items. These items can include strings, Parts, and additional Fragments.

Beyond the standard content, a Part has the flexibility to define multiple content properties as needed, including arrays or functions of content.

${<debug.SourceView source="/src/pages/Parts/Content.tsx" x-style="rounded" example="1" lang="tsx" run={<DefaultContentPart.demo/>} />}

${<debug.SourceView source="/src/pages/Parts/Content.tsx" x-style="rounded" example="2" lang="tsx" run={<MultiContentPart.demo/>} />}

${<debug.SourceView source="/src/pages/Parts/Content.tsx" x-style="rounded" example="3" lang="tsx" run={<ArrayContentPart.demo/>} />}

${<debug.SourceView source="/src/pages/Parts/Content.tsx" x-style="rounded" example="4" lang="tsx" run={<FunctionContentPart.demo/>} />}

`}
        </ExamplePage>
    }

    // This class just draws a box around the content with a heading describing what it is
    export class ShowContent extends Part<{
        title: string
    }> {
        render() {
            return <div style="border:5px solid #EEE">
                <div style="background-color: #CCE">{this.props.title}</div>
                <div style="margin:10px;">{this.props.content}</div>
            </div>
        }
    }
    
    
    //1. Default content properties
    export class DefaultContentPart extends Part {
        render() {
            return <div>{this.props.content}</div>
        }

        static demo() {
            return <>
                <DefaultContentPart />
                <hr />
                <DefaultContentPart>This is a text</DefaultContentPart>
            </>
        }
    }
    //1.

    //2. Multi content properties
    export class MultiContentPart extends Part<{
        title: Fragment
        footer?: Fragment
    }> {
        render() {
            return <>
                <div>{this.props.title}</div>
                <div>{this.props.content}</div>
                <div>{this.props.footer ?? ''}</div>
            </>
        }

        static demo() {
            return <>
                <MultiContentPart title={<h4>MultiContent without Footer</h4>}>This is a text</MultiContentPart>
                <hr/>
                <MultiContentPart title={<h4>MultiContent with Footer</h4>} footer={<span style="font-size:0.7rem">Small Footer</span>}>This is a text</MultiContentPart>
            </>
        }
    }
    //2.

    //3. Array content property
    export class ArrayContentPart extends Part<{
        arrayContent: Fragment[]
    }> {
        render() {
            return <>
                {this.props.arrayContent}
                {this.props.content}
            </>
        }

        static demo() {
            return <ArrayContentPart arrayContent={[<h4>Array Content Title</h4>, <b>Bold</b>, <i>Italic</i>, <u>Underline</u>]}>This is a text</ArrayContentPart>
        }
    }
    //3.

    //4. Function content property
    export class FunctionContentPart extends Part<{
        functionContent: () => Fragment
    }> {
        render() {
            return <>
                <button on:click={_ => _}>Refresh</button>
                <hr/>
                {this.props.functionContent()}
                {this.props.content}
            </>
        }

        static demo() {
            const randomArray = (): number[] => {
                const length = Math.floor(Math.random() * 10) + 1; // Random length from 1 to 10
                return Array.from({ length }, () => Math.floor(Math.random() * 100)); // Replace 100 with any other range if needed
            };
            return <FunctionContentPart functionContent={() => <>{randomArray().map(x => <div>{x}</div>)}</>}>This is a text</FunctionContentPart>
        }
    }
    //4.
}


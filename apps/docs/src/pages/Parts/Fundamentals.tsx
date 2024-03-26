// This sample shows the different ways you can declare a part
// All Jzor parts have to extend the abstract Part class

namespace jzor.docs.pages.parts {
    
    //1. Minimal Part without properties
    // New Parts should inherit from the jzor.Part to include basic life-cycle methods and triggers
    export class MinimalWithoutProps extends Part {
        // All parts needs to define a render method as a minimum
        render() {
            // The render method should always return a single element (or fragment <>Hello World</>)
            return <div>Hello World</div>
        }
    }
    //1.

    //2. Minimal Part with properties
    // Properties are typically declared as an inline generic type on the Part<T> type
    export class MinimalWithProps extends Part<{
        name: string
        optional?: number
    }> {
        render() {
            // this.props.optional is optional and might be undefined, so we use 100 as the default
            return <>Hello World - {this.props.name} {this.props.optional ?? 100}%</>
        }
    }
    //2.

    //3. React-like function with a single property
    // Properties for react-like functions are declared as an object type in the first parameter
    export function ReactLike(props: { first: string, last: string }) {
        return <>{props.first} {props.last}</>
    }
    //3.

    //4. Simple function that just renders a fragment based on some arguments
    // Normal functions with any kind of parameters can be used as helpers
    export function renderFullName(first: string, last: string, isDeleted: boolean) {
        return <span style={isDeleted ? 'color:red' : 'color:black'}>{first} {last}</span>
    }
    //4.

    // Render the example
    export function fundamentals() {
        return <ExamplePage>
{markdocs`
## Fundamentals

In Jzor, a <code>Part</code> is analogous to a Component in various frameworks. 
Parts are mainly utilized for UI rendering but are also versatile enough to serve as data providers or to support other Parts. 
Even backend functionalities, which do not require rendering, can be efficiently managed as Parts, thanks to their integrated design.

### Instances
Parts are structured as classes, inheriting essential functionality from the <code>jzor.Part</code> abstract base class. 
This, in turn, is a subclass of the .NET class <code>CLR.Jzor.Part</code>. The CLR Part oversees the entire lifecycle, event handling, and other critical aspects of a Part.

> **NOTE**: In Jzor's TypeScript context, .NET types are accessible under the CLR namespace. <code>CLR.Jzor.Part</code> refers to a .NET type in the Jzor.Part namespace.

### Ownership
Parts come into existence when they are used in the rendering methods of other Parts. 
The Part that incorporates them assumes ownership. Each Part can interact with and manage its owner and the Parts it owns.

### Rendering
The rendering process for Parts is asynchronous, allowing for individual and timely rendering. 
When a Part is rendered, it automatically triggers the rendering of its child Parts, cascading down the hierarchy.

Since rendering at higher levels in the hierarchy affects more child Parts, it can be more demanding on resources. To optimize, it’s advisable to initiate rendering as close to the dynamically changing Parts as possible. This approach is particularly beneficial for frequent updates but is less critical for slower-paced user interactions.

> **NOTE**: Although Parts in Jzor are rendered asynchronously, the render method itself operates synchronously. Therefore, invoking asynchronous methods directly within the render process is not supported. If attempted, a runtime error will be triggered to highlight this misuse.

### Lifetime
The lifecycle of Parts is determined by their role and duration of use in the application. 
The Main Part, acting as the root, is always active throughout the application's lifetime. 
It decides which Parts are rendered and for how long. 
While some Parts may remain active for the application's entire duration, others, like those used on different pages, may have a more temporary role.

### Class Declaration
The Part is declared as a class, and below is the minimal declaration, including the required render method.
${<debug.SourceView source="/src/pages/Parts/Fundamentals.tsx" example="1" x-style="rounded" lang="tsx" />}

To add properties, you provide an object type in the generic type parameter of Part<T>
${<debug.SourceView source="/src/pages/Parts/Fundamentals.tsx" example="2" x-style="rounded" lang="tsx" />}

### Rendering without Part's

You can also render Part's, element's and text without a Part. Jzor can use React-like functions, with the difference that Jzor does not have a <code>UseXxxx</code> function, which can enrich the rendering function.
If the function defines an object type as the first parameter, this will become the property declaration.

${<debug.SourceView source="/src/pages/Parts/Fundamentals.tsx" example="3" x-style="rounded" lang="tsx" />}

It also possible to use a normal functions as a helpers, which just returns a rendering fragment. These can be used inside other render methods to break down complicated rendering.
${<debug.SourceView source="/src/pages/Parts/Fundamentals.tsx" example="4" x-style="rounded" lang="tsx" />}

> **NOTE**: All examples given above use the export statement, this is not necessary if the Part or function is only used internally in the current namespace scope.
`}
</ExamplePage>
    }
}

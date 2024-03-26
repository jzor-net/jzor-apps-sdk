namespace jzor.docs.pages.parts {
    // Render the example
    export function properties() {
        return <ExamplePage>
            {markdocs`
## Properties

Properties can be declared and initialized in many ways in Jzor. They are exposed on the Part instance as the "this.props" property, and will be updated whenever the Part's ***Owner*** renders itself.
On the Part instance, the passed properties will usually be accessible by <code>this.props.someproperty</code>. However, the property name can be changed by using custom constructor, but it not encouraged.

> **NOTE**: If you just render the Part instance itself, the properties are not passed from the Owner, and the Part will render with the same property values it had the last time they were passed.


#### Declarations
Jzor properties are typically declared inline in the Part's generic type parameter, but can also be declared in its own type or interface.

${<debug.SourceView source="/src/pages/Parts/Properties.tsx" example="1" x-style="rounded" lang="tsx" />}

${<debug.SourceView source="/src/pages/Parts/Properties.tsx" example="2" x-style="rounded" lang="tsx" />}

${<debug.SourceView source="/src/pages/Parts/Properties.tsx" example="3" x-style="rounded" lang="tsx" />}

Properties can also be declared in the constructor
${<debug.SourceView source="/src/pages/Parts/Properties.tsx" example="4" x-style="rounded" lang="tsx" />}

#### Management

Managing properties effectively requires various strategies to ensure they function as intended. 
While directly accessing them via <code>this.props</code> is straightforward, handling numerous optional properties, including guards for undefined, can become cumbersome.

Below are three ways to make local copies of the properties with comments on what each solution does.

${<debug.SourceView source="/src/pages/Parts/Properties.tsx" example="5" x-style="rounded" lang="tsx" run={<MyOwnerPart/>} />}

`}
        </ExamplePage>
    }

    //1. Properties declared inline
    export class PropertiesInline extends Part<{
        name: string
        color?: 'red' | 'green' | 'blue'
    }>  {
        render() { /* left out */ }
    }
    //1.

    //2. Properties declared by type
    type MyProperties = {
        name: string
        color?: 'red' | 'green' | 'blue'
    }

    export class PropertiesByType extends Part<MyProperties>  {
        render() { /* left out */ }
    }
    //2.

    //3. Properties declared by an interface
    interface IMyProperties {
        name: string
        color?: 'red' | 'green' | 'blue'
    }

    export class PropertiesByInterface extends Part<IMyProperties>  {
        render() { /* left out */ }
    }
    //3.


    //4. Properties can also be specified in the constructor
    export class PropertiesInlineConstructor extends Part {
        constructor(protected props: {
            name: string
            color?: 'red' | 'green' | 'blue'
        }) {
            super(props)
        }
        render() { /* left out */ }
    }
    //4.

    //5. Property management and life time
    // Properties are supplied by the owning Part (Owner), and passed only when the owning Part is rendered.
    export class MyPart extends Part<{
        name: string
        optional?: number
    }> {
         // By using a local property the initial property value can be captured during the initialization phase, and any future changes can be ignored
        // This can be used for reading an initial value for a slider, which would otherwise be overwritten by the next passed property value
        initialValue = this.props.optional ?? 100

        // You can also use a getter method, which makes sure you always use the latest property value supplied to the Part
        // This way we read the value of the property in case it has changed on the next render request, while also ensuring it will have a default value
        get computedValue() { return this.props.optional ?? 100 }

        render() {
            return <>
                <h4>{this.props.name}</h4>
                <div>this.props.optional: {this.props.optional}</div>
                <div>this.initalValue: {this.initialValue}</div>
                <div>this.computedValue: {this.computedValue}</div>
            </>
        }
    }

    export class MyOwnerPart extends Part {
        ownerValue = 10
        render() {
            return <>
                <MyPart name="Optional is undefined"/>
                <MyPart name="Optional is 42" optional={42}/>
                <MyPart name={`Optional is ${this.ownerValue}`} optional={this.ownerValue++}/>
                <hr/>
                <button on:click={_ => this.Refresh("Main")}>Owner Refresh</button>
            </> 
        }
    }    
    //5.
}
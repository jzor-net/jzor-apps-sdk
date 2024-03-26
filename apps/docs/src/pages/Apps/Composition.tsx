namespace jzor.docs.pages.apps {

    export function composition() {
            return <ExamplePage>{markdocs`
## Composition

An application in Jzor is structured around a composition hierarchy with varying lifespans for its components, from long-lived main components to ephemeral page elements. 
At the core, the "Main Part" serves as the foundational element that remains in memory throughout the application's lifetime, ensuring persistent functionality and state management.

Nested within this persistent layer, "Pages" represent medium-lived entities that are dynamically loaded and unloaded as the user navigates through the application. 
This design allows for efficient resource management and quick adaptability to user interactions, with pages being swapped in and out based on the current context.

At the most transient level, individual "Parts" on each page have the shortest lifespan, being created and destroyed in response to page changes or user actions. 
These parts are highly ephemeral, designed to render specific UI elements or functionalities while the page is active. 
Once the page or the part is no longer needed, they are promptly cleared from memory to make way for new components, ensuring the application remains responsive and resource-efficient.

<img src="/images/overview3.png"/>

This hierarchical composition effectively balances performance and flexibility, allowing Jzor applications to maintain a responsive and dynamic user interface while managing system resources judiciously.
`}
        </ExamplePage>
    }
}            
namespace jzor.docs.pages.apps {
    export function filestructure() {
        return <ExamplePage>
{markdocs`
## File Structure

${<img src="/images/file-structure.png" style="margin-left: 2rem; float: right" />}
In Jzor, TypeScript files for both Host and Client are integrated within a single project, facilitating tighter coupling between server-side and client-side scripting. This setup allows for shared type definitions and consistent organization, with CSS files also being part of this unified codebase.

Files ending in <code>.ts</code> or <code>.tsx</code> are treated as TypeScript files executed on the Host.

Client-side TypeScript files, intended for execution in the browser, bear the extensions <code>.client.ts</code> or <code>.client.tsx</code>.

<code>.css</code> files, when sharing the base name with TypeScript files, are also incorporated into this consolidated structure.

Nevertheless, this unified project structure can create some complexities. 
Both Host and Client scripts might inadvertently attempt to use code beyond their intended scope. 
For instance, while Client scripts can utilize standard libraries like lib.dom.d.ts, such resources are not accessible to the Host, which operates on a scripting engine separate from the browser. 
It's important to note that the host cannot execute client code directly, nor can the client execute host code, as they run in different runtime environments.
They can, however, share interfaces and types which are statically checked by the compiler at compile time.

To mitigate these issues, the Jzor compiler includes checks to prevent cross-boundary usage and will issue errors upon detecting such instances.

Since types from both the Host and Client side coexist within the same project, there's also a potential for naming conflicts. 
To avoid this, adopting a custom naming convention for Client-side types can be beneficial. 
For example, appending "Client" to class names or similar practices could be implemented. 
Given that Client-side scripts are typically less frequent compared to Host-side scripts, using a consistent naming strategy should help maintain clarity and prevent confusion.

> **NOTE**: The compiler checks are still under development, and the approach may be revised in the future, considering its advantages and disadvantages.
`}
        </ExamplePage>
    }
}

namespace jzor.docs.pages.apps {

    export function namespaces() {
        return <ExamplePage>
            {markdocs`
## Namespaces

Jzor's utilization of namespaces sets it apart from most other front-end frameworks. 
This design choice originated from the unavailability of JS modules in Jint at the onset of Jzor's development. 
However, the namespace approach resonated well with .NET developers, leading to its retention, given .NET is the primary platform for Jzor.

In typical scenarios, the loading order of JS files is dictated by the module includes. 
But with namespaces, Jzor eliminates the need for includes in every file. 
The Jzor TypeScript compiler is responsible for determining the load order, organizing files based on their interrelations.

> **NOTE**: Circular dependencies are not supported in Jzor. The compiler will throw an error during compilation if it detects any.

Despite being distinct from modules, namespaces effectively facilitate modularization within an application. 
Namespaces have demonstrated their utility across various programming languages, possessing both advantages and disadvantages like many other coding concepts.
They are equally suitable for libraries, provided each library defines a distinct root namespace.
Adopting namespaces also aids in maintaining a cohesive integration between the C# .NET and Jzor TypeScript environments.

### Namespaces in TypeScript

For C# developers accustomed to .NET's use of namespaces, the concept in TypeScript is quite similar. Within a namespace, all public declarations are accessible throughout its scope, including in child namespaces.

> A namespace scope refers to the code encompassed by a namespace declaration, as in <code>namespace foo.bar \{ ...scope... \}</code>.  
> The namespace identifier <code>foo.bar</code> can be used in multiple namespace declarations, effectively adding code to the same namespace.

However, there's a notable difference in TypeScript compared to C# regarding scope accessibility. In C#, any public declarations within a namespace are available across other scopes of the same namespace. In TypeScript, to make a declaration accessible outside its immediate scope, it must be explicitly marked with the <code>export</code> keyword.

### Namespace examples
${<debug.SourceView source="/src/pages/Apps/Namespaces.tsx" example="1" x-style="rounded" lang="tsx" />}
${<debug.SourceView source="/src/pages/Apps/Namespaces.tsx" example="2" x-style="rounded" lang="tsx" />}
${<debug.SourceView source="/src/pages/Apps/Namespaces.tsx" example="3" x-style="rounded" lang="tsx" />}
`}
        </ExamplePage>
    }
}

//1. Namespace Scopes
// Demonstrates basic usage of namespaces and visibility of exported vs. local members.
namespace myapp {
    const local = 10; // Local to myapp, not visible outside.
    export const exported = 20; // Exported, accessible within and outside myapp.
}

// Accessing members in a subsequent scope of the same namespace.
namespace myapp {
    // local is not accessible here since it wasn't exported.
    exported == 20; // true, exported is accessible across myapp.
}
//1.

//2. Importing and Exporting Across Namespaces
// This segment shows how to organize code across multiple namespaces, focusing on imports and exports for accessibility.

// Assuming declarations in separate files for real-world structuring.
namespace some.other.thing {
    export function helloWorld() { return 'Hello World'; }
}

namespace database.drivers.sqlServer {
    export function testConnection() { return 'Connected to server'; }
    export type ResultRows = { rows: [] };
}

// Utilizing imported namespaces within myapp.
namespace myapp {
    import things = some.other.thing; // Local scope access.
    export import sql = database.drivers.sqlServer; // Accessible in all myapp scopes.

    // Demonstrates calling functions from imported namespaces.
    things.helloWorld();
    sql.testConnection();
}

// Testing accessibility in the same and nested namespaces.
namespace myapp {
    // things.helloWorld() is not accessible; not exported from its original namespace.
    sql.testConnection(); // Accessible due to export import in parent namespace.
}

namespace myapp.nested {
    sql.testConnection(); // Also accessible in nested namespaces.
}
//2.

//3. Library Example
// Illustrates a complex library structure using namespaces for exporting types, interfaces, and nested namespaces.
namespace mylibrary.foo {
    // Exporting types, interfaces, variables, and functions for global accessibility.
    export import sqlDriver = database.drivers.sqlServer;
    export import ResultRows = database.drivers.sqlServer.ResultRows;
    export type MyType = { myNumber: number };
    export interface MyInterface { };
    export let myVar = 10;
    export namespace config {
        export function readConfig() { }
    }
}

// Accessing exported library components in different scopes.
namespace mylibrary {
    var x: foo.MyType = { myNumber: 10 };
    var cfg = foo.config.readConfig();
}

namespace mylibrary.foo {
    var x: MyType = { myNumber: 10 };
    var cfg = config.readConfig();
}

namespace mylibrary.foo.bar {
    var x: MyType = { myNumber: 10 };
    var cfg = config.readConfig();
}

// Application namespace showcasing various ways to import and use library components.
namespace myapp {
    import ml = mylibrary;
    var x: ml.foo.MyType = { myNumber: 20 };
}

namespace myapp {
    import foo = mylibrary.foo;
    var x: foo.MyType = { myNumber: 20 };
}

namespace myapp {
    export import MyType = mylibrary.foo.MyType;
    var x: MyType = { myNumber: 20 };
}

namespace myapp.foo {
    var x: MyType = { myNumber: 20 };
}

namespace myapp {
    var x: mylibrary.foo.MyType = { myNumber: 10 };
}
//3.

namespace jzor.docs.concepts {
    export namespace ecosystem {
        export function show() {
            return <ExamplePage>{markdocs`
## Developer Ecosystem

Jzor positions itself as a versatile platform akin to Node.js for the .NET ecosystem, enriched with extensive customization options. Central to its offering is an integrated TypeScript compiler and a React-like framework, underscoring its commitment to streamlining full-stack development. This unique blend facilitates a highly adaptable development environment where front-end developers can thrive using general plugins or delve deeper through close collaboration with C# backend specialists.

### Key Highlights of Jzor

- **Node.js Parallel for .NET**: Jzor brings the event-driven, non-blocking I/O model familiar to Node.js users into the .NET world, complemented by the robustness of .NET's ecosystem.

- **Built-in TypeScript Compiler**: The inclusion of a TypeScript compiler directly within Jzor eliminates the need for external tools, simplifying the development process and enhancing productivity.

- **React-like Development Experience**: By offering a React-like framework, Jzor ensures a familiar and efficient development experience for building dynamic user interfaces, making it appealing for developers accustomed to modern JavaScript frameworks.

- **Customizable and Extensible**: Jzor's architecture promotes customization and extensibility, allowing developers to tailor the platform to their specific project needs. Whether it's tweaking the core functionality or extending it with plugins, Jzor provides the flexibility needed for a wide range of applications.

- **Front-end Development with Plugins**: Front-end developers can rapidly prototype and build applications using pre-made plugins, reducing the time to market and lowering the entry barrier to starting new projects.

- **Seamless Backend Integration**: For applications requiring more complex backend logic, developers can leverage the tight integration with C# to extend their applications. This dual approach ensures that teams can balance the ease of plugin use with the power of custom backend development as needed.

Jzor's architecture not only promotes a seamless development experience across the stack but also fosters a collaborative environment where front-end and backend developers can work together more effectively. By bridging the gap between TypeScript and .NET, Jzor aims to empower developers to build sophisticated, scalable, and high-performance applications with greater ease and flexibility.

<img src="/images/overview2.png"/>
`}</ExamplePage>
        }
    }
}
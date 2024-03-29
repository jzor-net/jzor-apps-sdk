namespace jzor.docs.pages {
    function lighthouse() {
        return <>
            <div style="text-align: center;">The "Introduction" page in server rendered mode, tested on a 1Gbit connection with an average latency of 24ms</div>
            <div style="text-align: center;"><img src="/images/lighthouse.png"/></div>
            <div style="text-align: center;"><img src="/images/lighthouse2.png" /></div>
        </>
    }

    export function introduction() {
        return <ExamplePage>
{markdocs`
> DISCLAIMER: The information and demonstrations provided here are subject to change. Jzor is actively evolving towards a beta release, and during this process, we may alter concepts, engage in refactoring, and perform necessary cleanups. 
The content presented is a glimpse into some of the technologies and ideas fueling Jzor. Our aim is to generate interest and encourage suggestions that can enhance the TypeScript environment within Jzor.
Jzor introduces unique perspectives and isn't designed to cater to everyone. Our primary focus is on supporting small-tech initiatives, aiming to simplify the process for small teams to develop faster and more robust solutions.
While the technology is freely available for use, currently only the TypeScript aspect of Jzor is open-sourced. Plans are in place to gradually open source segments of Jzor's .NET framework, although the specifics of what and when are still being determined.
Building on the previous point, it's worth noting that you can integrate any existing .NET functionality into your Jzor solution. This can be achieved by creating Plugins or by launching Jzor within your custom .NET host environment.

## Introduction

### Meet Jzor.net: Bridging .NET Core and React-Like Efficiency

Jzor.net brings a fresh perspective to web application development, blending the stability of .NET Core with the flexibility of a React-like frontend. It's an innovative server-side framework, optimized for developers who value quick load times and seamless integration between frontend and backend technologies.

### Key Features Tailored for Developers

- **React-Inspired TypeScript & JSX**: A comfortable environment for those familiar with React, enhanced by the robustness of TypeScript.
- **Unique Functional Additions**: Explore new dimensions with features like app messaging, timers, filesystem access, and lifecycle management.
- **Extendable with .NET Plugins**: Custom plugin support allows for enhanced performance and backend integration without compromising on agility.
- **Efficient Code Compilation**: Experience the convenience of on-the-fly JSX and TypeScript compilation, complete with hot reload capabilities.
- **Swift User Experience**: Aims for a lightweight browsing experience, targeting a rapid 0.5s load time.
- **Flexible Integration Options**: Seamlessly fits into various .NET Core project structures, including independent operation or alongside Blazor.
- **Comprehensive Debugging Tools**: Integrated debugging with VSCode for frontend and Visual Studio for backend .NET Core.
- **Streamlined Backend Interaction**: Direct backend interaction removes the need for a dedicated REST API, simplifying development.
`}

<a href="#" on:click={_ => dialog.open(lighthouse())} preventdefault:click>Lighthouse report for this page</a>

{markdocs`
### Advantages for Rapid Development

- **Instant Feedback Loop**: Hot reload and instant compilation foster a rapid prototyping environment.
- **Simplified Security Model**: Minimizes security concerns typically associated with REST APIs and client-side code.
- **Server-Side Execution**: Protects intellectual property by running predominantly on the server.
- **Easy .NET and Native Library Integration**: Simplifies the incorporation of .NET and native libraries into your project.
- **Seamless Frontend-Backend Harmony**: Enhances the development process with excellent integration and faster refactoring cycles.

### Considerations for Early Adopters

- **Alpha Stage Development**: Currently in alpha, indicating it's not yet ready for production but promising for future use.
- **Evolving Features**: Focus is on stabilizing core functionalities; some features may be in the demonstration phase.
- **Gradual Open Source Transition**: Plans to become more open source are in place, adding to the community-driven development aspect.
- **Server-Side Rendering Focus**: Primarily designed with server-side rendering in mind, catering to specific application needs.

Jzor.net offers a pragmatic and evolving solution for developers looking to leverage the strengths of both .NET Core and React-like environments, all while pushing the boundaries of traditional web app development.
`}
        </ExamplePage>
    }
}

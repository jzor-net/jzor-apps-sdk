namespace jzor.docs.pages.concepts {

    export function technicaloverview() {
        return <ExamplePage>
{markdocs`
## Technical Overview

Jzor is an innovative framework that emerges from the fusion of **Jint**, a .NET JavaScript interpreter, and **Blazor**, hence its name - a blend of the two. At its core, **Jint** interprets JavaScript, converting it into an Abstract Syntax Tree (AST). This AST is then seamlessly transformed into native .NET objects such as statements and expressions.

Applications are running in their own server side script environments, and are fully isolated by default. If desired the applications can share and exchange data as well, also across process boundaries through the use of messaging, key/values stores or similar.

The performance of the interpreter is influenced by the volume of code it processes. While it's slower with extensive code, many standard functions like <code>map()</code> are efficiently implemented in C#. Jzor frontend code typically doesn't involve heavy code traversal, and given React's emphasis on expressions, which are compact and translated into nested arrays, the rendering process remains swift and efficient.

Although **Jint's** execution speed doesn't match V8's raw performance - generally being thrice slower, particularly noticeable when running extensive TypeScript compilations - its real strength lies in its .NET integration. It operates within the same context as .NET code, allowing direct access to .NET objects without costly marshalling. This direct interaction, coupled with React's concise syntax, results in commendable performance.

Jzor adopts the fully asynchronous code and rendering model from **Blazor**, tailored for handling multiple applications and UIs concurrently. JavaScript's inherent single-threaded nature, combined with asynchronous programming, minimizes locking and maximizes efficiency. The framework's performance is primarily determined by the frequency of DOM updates rather than the number of users. However, DOM diffing, necessary for these updates, does exert CPU and memory demands.

To quantify its capabilities, internal tests on an AMD 7950X3D processor provide a clearer picture. 
Managing 1000 asynchroneous real-time DOM updates per second across 100 applications (amounting to 100,000 independant updates in total) utilizes about 11% of CPU capacity, and 500MB of Gen-0 memory per second. 
It's important to note that typical applications rarely demand such intense real-time updates. 
However, in scenarios like stock broker interfaces where real-time updates are crucial, server resources are primarily allocated to maintaining client synchronicity. 
A good portion of performance overhead is attributed to garbage collection, especially as DOM diffing many individual components is memory-intensive at high update rates.

> It's important to understand that real-time updates in Jzor also bring in new data from the server, which is distinct from UI refresh rates. The mentioned figures pertain to updating the DOM with fresh data received from the server. In certain scenarios, you have the option to merely transmit data and let browser-side script code manage the updates. This method proves to be significantly more efficient by eliminating the requirement for diffing.

In essence, the frequency of real-time updates directly influences performance demands. Basic, form-based user interfaces exert minimal strain on system resources, enabling a server with multiple cores to efficiently handle thousands of such applications concurrently.
`}
        </ExamplePage>
    }
}
